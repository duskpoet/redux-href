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
import { factory } from '.';
var initialState = {
    name: '',
    userId: '',
    page: 0
};
var enhancerSimple = factory({
    locationToState: function (url, state) { return (__assign({}, state, { page: Number(url.searchParams.get('page')) })); },
    stateToLocation: function (state) { return ({
        params: {
            page: String(state.page)
        }
    }); }
});
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
    beforeEach(function () {
        window.history.replaceState({}, '', '/');
        Object.defineProperty(window.history, 'pushState', {
            writable: true,
            value: jasmine.createSpy('pushState')
        });
    });
    it('works with no specific info in location', function () {
        var store = createStore(reducer, {}, enhancerSimple);
        var state = store.getState();
        expect(state.page).toEqual(0);
    });
    it('works with set up location', function () {
        window.history.replaceState({}, '', '/?page=2');
        var store = createStore(reducer, {}, enhancerSimple);
        var state = store.getState();
        expect(state.page).toEqual(2);
    });
    it('propagates changes to location', function () {
        var store = createStore(reducer, {}, enhancerSimple);
        var prevHref = window.location.href;
        store.dispatch({ type: SET_PAGE, payload: 5 });
        expect(window.history.pushState).toHaveBeenCalled();
        window.history.replaceState({}, '', prevHref);
        window.dispatchEvent(new Event('popstate'));
        expect(store.getState().page).toEqual(0);
    });
});
//# sourceMappingURL=index.spec.js.map