import { createStore, AnyAction } from 'redux';
import { createMemoryHistory, History } from 'history';
import { factory } from '.';
import { dispose } from './actions';

interface State {
  name: string;
  userId: string;
  page: number;
}

const initialState: State = {
  name: '',
  userId: '',
  page: 0,
};

const enhancerSimple = (history: History) =>
  factory<State>({
    history,
    locationToState: (location, state) => {
      return {
        ...state,
        page:
          location.params.page != null
            ? Number(location.params.page)
            : state.page,
      };
    },
    stateToLocation: state => ({
      params: {
        page: String(state.page),
      },
    }),
  });

const SET_PAGE = 'SET_PAGE';

const reducer = (state: State = initialState, action: AnyAction): State => {
  switch (action.type) {
    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
};

describe('re-href', () => {
  it('works with no specific info in location', () => {
    const history = createMemoryHistory();
    const store = createStore(reducer, enhancerSimple(history));
    const state = store.getState();
    expect(state.page).toEqual(0);
  });

  it('works with set up location', () => {
    const history = createMemoryHistory();
    history.replace('/?page=2');
    const store = createStore(reducer, enhancerSimple(history));
    const state = store.getState();
    expect(state.page).toEqual(2);
  });

  it('propagates changes to location', () => {
    const history = createMemoryHistory();
    history.push('/?page=0');
    const store = createStore(reducer, enhancerSimple(history));
    store.dispatch({ type: SET_PAGE, payload: 5, meta: { pushHistory: true } });
    expect(history.location.search).toBe('?page=5');
    history.goBack();
    expect(store.getState().page).toEqual(0);
  });

  it('does not dispatch replace url after every action', () => {
    const history = createMemoryHistory();
    const store = createStore(reducer, enhancerSimple(history));
    const spy = jasmine.createSpy('Subscribe');
    store.subscribe(spy);
    store.dispatch({ type: 'random_action' });
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("doesn't keep any subscriptions and reactions after dispose action", () => {
    const history = createMemoryHistory();
    const store = createStore(reducer, enhancerSimple(history));
    const spyStore = jasmine.createSpy('Store');
    const spyHistory = jasmine.createSpy('History');

    store.subscribe(spyStore);
    history.listen(spyHistory);
    store.dispatch({ type: 'random_action' });
    expect(spyStore).toHaveBeenCalledTimes(1);
    expect(spyHistory).toHaveBeenCalledTimes(1);
    store.dispatch(dispose());
    store.dispatch({ type: 'some_action' });
    expect(spyStore).toHaveBeenCalledTimes(3);
    expect(spyHistory).toHaveBeenCalledTimes(1);
  });
});
