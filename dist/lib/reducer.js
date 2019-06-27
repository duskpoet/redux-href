import { Types } from './actions';
var reducer = function (locationToState) { return function (state, action) {
    switch (action.type) {
        case Types.replaceUrl: {
            var href = action.payload.href;
            var url = new URL(href);
            return locationToState(url, state);
        }
        default:
            return state;
    }
}; };
export default reducer;
//# sourceMappingURL=reducer.js.map