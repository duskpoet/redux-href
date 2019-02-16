import {
  AnyAction,
  Reducer,
  DeepPartial,
  StoreEnhancerStoreCreator
} from "redux";

import locationReducer from "./reducer";
import { LocationToState, StateToLocation, LocationParams } from "./typings";
import { replaceUrl } from "./actions";

const factory = <S>(
  locationToState: LocationToState<S>,
  stateToLocation: StateToLocation<S>
) => {
  let currentUrlData: LocationParams = {};
  const updateLocation = (state: S, replaceHistory: boolean) => {
    const urlData = stateToLocation(state);
    if (urlData === currentUrlData) {
      return;
    }
    currentUrlData = urlData;
    const currentUrl = new URL(window.location.href);
    const { params = {}, path } = urlData;
    for (let key in params) {
      currentUrl.searchParams.set(key, params[key]);
    }
    if (path !== undefined) {
      currentUrl.pathname = path;
    }
    if (replaceHistory) {
      window.history.replaceState(state, "", currentUrl.href);
    } else {
      window.history.pushState(state, "", currentUrl.href);
    }
  };

  return (createStore: StoreEnhancerStoreCreator) =>
    ((reducer: Reducer<S, AnyAction>, preloadedState?: DeepPartial<S>) => {
      const store = createStore(
        (state: S, action: AnyAction) =>
          locationReducer(locationToState, stateToLocation)(
            reducer(state, action),
            action
          ),
        preloadedState
      );

      store.dispatch(replaceUrl(window.location.href));

      const dispatch = (action: AnyAction) => {
        store.dispatch(action);
        const { meta = {} } = action;
        updateLocation(store.getState(), meta.replaceHistory);
      };

      window.addEventListener("popstate", () => {
        store.dispatch(replaceUrl(window.location.href));
      });

      return {
        ...store,
        dispatch
      };
    }) as StoreEnhancerStoreCreator;
};

export default factory;
