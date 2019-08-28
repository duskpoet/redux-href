export var paramsToLocation = function (_a) {
    var params = _a.params, path = _a.path;
    var result = {};
    if (path !== undefined) {
        result.pathname = path;
    }
    if (params !== undefined) {
        result.search = Object.keys(params)
            .map(function (key) { return key + "=" + params[key]; })
            .join('&');
    }
    return result;
};
export var locationToParams = function (location) { return ({
    path: location.pathname,
    params: location.search
        .replace(/^\?/, '')
        .split('&')
        .reduce(function (acc, valParam) {
        var _a = valParam.split('='), key = _a[0], value = _a[1];
        acc[key] = value;
        return acc;
    }, {})
}); };
//# sourceMappingURL=util.js.map