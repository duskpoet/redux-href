export var Types = {
    replaceUrl: '@@re-href/replace-url'
};
export var replaceUrl = function (location) { return ({
    type: Types.replaceUrl,
    payload: {
        location: location
    }
}); };
//# sourceMappingURL=actions.js.map