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
import { replaceUrl, Types } from './actions';
export var factory = (function (global) {
    var URLConstructor = (global.URL || global.url.URL);
    return function (_a) {
        var locationToState = _a.locationToState, stateToLocation = _a.stateToLocation, history = _a.history;
        var currentUrlData = {};
        var getPath = function () { return history.location.pathname + history.location.search; };
        var updateLocation = function (state, pushHistory) {
            var urlData = stateToLocation(state);
            if (urlData === currentUrlData) {
                return;
            }
            currentUrlData = urlData;
            var currentUrl = new URLConstructor(getPath());
            var _a = urlData.params, params = _a === void 0 ? {} : _a, path = urlData.path;
            for (var key in params) {
                currentUrl.searchParams.set(key, params[key]);
            }
            if (path !== undefined) {
                currentUrl.pathname = path;
            }
            if (pushHistory) {
                history.push(currentUrl.href, state);
            }
            else {
                history.replace(currentUrl.href);
            }
        };
        var locationReducer = function (locationToState) { return function (state, action) {
            switch (action.type) {
                case Types.replaceUrl: {
                    var href = action.payload.href;
                    var url = new URLConstructor(href);
                    return locationToState(url, state);
                }
                default:
                    return state;
            }
        }; };
        return function (createStore) {
            return (function (reducer, preloadedState) {
                var store = createStore(function (state, action) {
                    return locationReducer(locationToState)(reducer(state, action), action);
                }, preloadedState);
                store.dispatch(replaceUrl(getPath()));
                var dispatch = function (action) {
                    store.dispatch(action);
                    var _a = action.meta, meta = _a === void 0 ? {} : _a;
                    updateLocation(store.getState(), meta.pushHistory);
                };
                history.listen(function () {
                    store.dispatch(replaceUrl(getPath()));
                });
                return __assign({}, store, { dispatch: dispatch });
            });
        };
    };
    // @ts-ignore
})(typeof window !== 'undefined' ? window : global);
//# sourceMappingURL=index.js.map