import {
  AnyAction,
  Reducer,
  DeepPartial,
  StoreEnhancerStoreCreator,
} from 'redux';

import { LocationParams, RehrefParams, LocationToState } from './typings';
import { replaceUrl, dispose, Types } from './actions';
import { paramsToLocation, locationToParams } from './util';

export const factory = <S>({
  locationToState,
  stateToLocation,
  history,
}: RehrefParams<S>) => {
  let currentUrlData: LocationParams = {};
  let updateLocationLock = 0;
  let disposed = false;
  const updateLocation = (state: S, pushHistory: boolean) => {
    const urlData = stateToLocation(state);
    if (urlData === currentUrlData) {
      return;
    }
    currentUrlData = urlData;
    updateLocationLock++;
    if (pushHistory) {
      history.push(paramsToLocation(urlData, state));
    } else {
      history.replace(paramsToLocation(urlData, state));
    }
  };

  const locationReducer = <S>(locationToState: LocationToState<S>) => (
    state: S,
    action: AnyAction
  ) => {
    switch (action.type) {
      case Types.replaceUrl: {
        const { location } = action.payload;
        return locationToState(locationToParams(location), state);
      }
      default:
        return state;
    }
  };

  return (createStore: StoreEnhancerStoreCreator) =>
    ((reducer: Reducer<S, AnyAction>, preloadedState?: DeepPartial<S>) => {
      const store = createStore(
        (state: S, action: AnyAction) =>
          locationReducer(locationToState)(reducer(state, action), action),
        preloadedState
      );
      store.dispatch(replaceUrl(history.location));

      const unsubscribe = history.listen(location => {
        if (updateLocationLock) {
          updateLocationLock--;
          return;
        }
        store.dispatch(replaceUrl(location));
      });

      const dispatch = (action: AnyAction) => {
        store.dispatch(action);
        const { meta = {} } = action;
        if (action.type === Types.dispose) {
          disposed = true;
          unsubscribe();
        }
        if (!disposed) {
          updateLocation(store.getState(), meta.pushHistory);
        }
      };

      return {
        ...store,
        dispatch,
      };
    }) as StoreEnhancerStoreCreator;
};

export { dispose };
