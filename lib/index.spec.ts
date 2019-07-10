import { createStore, AnyAction } from 'redux';
import { createMemoryHistory, History } from 'history';
import { factory } from '.';

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
});
