var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { createStore } from 'redux';
import { createMemoryHistory } from 'history';
import { factory } from '.';
var initialState = {
    name: '',
    userId: '',
    page: 0
};
var enhancerSimple = function (history) {
    return factory({
        history: history,
        locationToState: function (location, state) {
            return __assign({}, state, { page: location.params.page != null
                    ? Number(location.params.page)
                    : state.page });
        },
        stateToLocation: function (state) { return ({
            params: {
                page: String(state.page)
            }
        }); }
    });
};
var SET_PAGE = 'SET_PAGE';
var reducer = function (state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case SET_PAGE:
            return __assign({}, state, { page: action.payload });
        default:
            return state;
    }
};
describe('re-href', function () {
    it('works with no specific info in location', function () {
        var history = createMemoryHistory();
        var store = createStore(reducer, enhancerSimple(history));
        var state = store.getState();
        expect(state.page).toEqual(0);
    });
    it('works with set up location', function () {
        var history = createMemoryHistory();
        history.replace('/?page=2');
        var store = createStore(reducer, enhancerSimple(history));
        var state = store.getState();
        expect(state.page).toEqual(2);
    });
    it('propagates changes to location', function () {
        var history = createMemoryHistory();
        history.push('/?page=0');
        var store = createStore(reducer, enhancerSimple(history));
        store.dispatch({ type: SET_PAGE, payload: 5, meta: { pushHistory: true } });
        expect(history.location.search).toBe('?page=5');
        history.goBack();
        expect(store.getState().page).toEqual(0);
    });
    it('does not dispatch replace url after every action', function () {
        var history = createMemoryHistory();
        var store = createStore(reducer, enhancerSimple(history));
        var spy = jasmine.createSpy('Subscribe');
        store.subscribe(spy);
        store.dispatch({ type: 'random_action' });
        expect(spy).toHaveBeenCalledTimes(1);
    });
});
//# sourceMappingURL=index.spec.js.map