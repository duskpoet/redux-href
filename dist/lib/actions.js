export var Types = {
    replaceUrl: "@@re-href/replace-url"
};
export var replaceUrl = function (href) { return ({
    type: Types.replaceUrl,
    payload: {
        href: href
    }
}); };
//# sourceMappingURL=actions.js.map