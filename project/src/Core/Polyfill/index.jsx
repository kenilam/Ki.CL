import * as tslib_1 from "tslib";
function loadPolyfill() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var smoothScroll, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 11, , 12]);
                    if (!(typeof window.AbortController === 'undefined')) return [3 /*break*/, 2];
                    return [4 /*yield*/, import('abortcontroller-polyfill/dist/polyfill-patch-fetch')];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (!(typeof window.IntersectionObserver === 'undefined')) return [3 /*break*/, 4];
                    return [4 /*yield*/, import('intersection-observer')];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    if (!(typeof window.Promise === 'undefined')) return [3 /*break*/, 6];
                    return [4 /*yield*/, import('promise-polyfill/src/polyfill')];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    if (!(typeof window.fetch === 'undefined')) return [3 /*break*/, 8];
                    return [4 /*yield*/, import('unfetch/polyfill')];
                case 7:
                    _a.sent();
                    _a.label = 8;
                case 8:
                    if (!!('scrollBehavior' in document.documentElement.style)) return [3 /*break*/, 10];
                    return [4 /*yield*/, import('smoothscroll-polyfill')];
                case 9:
                    smoothScroll = _a.sent();
                    smoothScroll.polyfill();
                    _a.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    });
}
export { loadPolyfill };
//# sourceMappingURL=index.jsx.map