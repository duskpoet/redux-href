import { createStore, AnyAction } from 'redux';
import rehrefFactory from '.';

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

const enhancerSimple = rehrefFactory<State>(
  (url, state) => ({
    ...state,
    page: Number(url.searchParams.get('page')),
  }),
  state => ({
    params: {
      page: String(state.page),
    },
  })
);

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
  beforeEach(() => {
    window.history.replaceState({}, '', '/');
    Object.defineProperty(window.history, 'pushState', {
      writable: true,
      value: jasmine.createSpy('pushState'),
    });
  });

  it('works with no specific info in location', () => {
    const store = createStore(reducer, {}, enhancerSimple);
    const state = store.getState();
    expect(state.page).toEqual(0);
  });

  it('works with set up location', () => {
    window.history.replaceState({}, '', '/?page=2');
    const store = createStore(reducer, {}, enhancerSimple);
    const state = store.getState();
    expect(state.page).toEqual(2);
  });

  it('propagates changes to location', () => {
    const store = createStore(reducer, {}, enhancerSimple);
    const prevHref = window.location.href;
    store.dispatch({ type: SET_PAGE, payload: 5 });
    expect(window.history.pushState).toHaveBeenCalled();
    window.history.replaceState({}, '', prevHref);
    window.dispatchEvent(new Event('popstate'));
    expect(store.getState().page).toEqual(0);
  });
});
