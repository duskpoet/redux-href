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
import { paramsToLocation, locationToParams } from './util';
export var factory = function (_a) {
    var locationToState = _a.locationToState, stateToLocation = _a.stateToLocation, history = _a.history;
    var currentUrlData = {};
    var updateLocation = function (state, pushHistory) {
        var urlData = stateToLocation(state);
        if (urlData === currentUrlData) {
            return;
        }
        currentUrlData = urlData;
        if (pushHistory) {
            history.push(paramsToLocation(urlData, state));
        }
        else {
            history.replace(paramsToLocation(urlData, state));
        }
    };
    var locationReducer = function (locationToState) { return function (state, action) {
        switch (action.type) {
            case Types.replaceUrl: {
                var location_1 = action.payload.location;
                return locationToState(locationToParams(location_1), state);
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
            store.dispatch(replaceUrl(history.location));
            var dispatch = function (action) {
                store.dispatch(action);
                var _a = action.meta, meta = _a === void 0 ? {} : _a;
                updateLocation(store.getState(), meta.pushHistory);
            };
            history.listen(function (location) {
                store.dispatch(replaceUrl(location));
            });
            return __assign({}, store, { dispatch: dispatch });
        });
    };
};
//# sourceMappingURL=index.js.map