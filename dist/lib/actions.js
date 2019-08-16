export var Types = {
    replaceUrl: '@@re-href/replace-url',
    dispose: '@@re-href/dispose'
};
export var replaceUrl = function (location) { return ({
    type: Types.replaceUrl,
    payload: {
        location: location
    }
}); };
export var dispose = function () { return ({
    type: Types.dispose
}); };
//# sourceMappingURL=actions.js.map