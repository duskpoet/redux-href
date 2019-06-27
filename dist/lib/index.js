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
import locationReducer from './reducer';
import { replaceUrl } from './actions';
export var factory = function (_a) {
    var locationToState = _a.locationToState, stateToLocation = _a.stateToLocation;
    var currentUrlData = {};
    var updateLocation = function (state, replaceHistory) {
        var urlData = stateToLocation(state);
        if (urlData === currentUrlData) {
            return;
        }
        currentUrlData = urlData;
        var currentUrl = new URL(window.location.href);
        var _a = urlData.params, params = _a === void 0 ? {} : _a, path = urlData.path;
        for (var key in params) {
            currentUrl.searchParams.set(key, params[key]);
        }
        if (path !== undefined) {
            currentUrl.pathname = path;
        }
        if (replaceHistory) {
            window.history.replaceState(state, '', currentUrl.href);
        }
        else {
            window.history.pushState(state, '', currentUrl.href);
        }
    };
    return function (createStore) {
        return (function (reducer, preloadedState) {
            var store = createStore(function (state, action) {
                return locationReducer(locationToState)(reducer(state, action), action);
            }, preloadedState);
            store.dispatch(replaceUrl(window.location.href));
            var dispatch = function (action) {
                store.dispatch(action);
                var _a = action.meta, meta = _a === void 0 ? {} : _a;
                updateLocation(store.getState(), meta.replaceHistory);
            };
            window.addEventListener('popstate', function () {
                store.dispatch(replaceUrl(window.location.href));
            });
            return __assign({}, store, { dispatch: dispatch });
        });
    };
};
//# sourceMappingURL=index.js.map