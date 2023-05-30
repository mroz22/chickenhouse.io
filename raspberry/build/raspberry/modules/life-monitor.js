"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.LifeMonitor = void 0;
var module_1 = require("./module");
var LifeMonitor = (function (_super) {
    __extends(LifeMonitor, _super);
    function LifeMonitor(_a) {
        var id = _a.id, dataRef = _a.dataRef;
        var _this = _super.call(this, { id: id, dataRef: dataRef }) || this;
        setInterval(function () {
            _this.setState({ lifeMonitor: Date.now() });
        }, 1000 * 10);
        _this.init();
        return _this;
    }
    return LifeMonitor;
}(module_1.Module));
exports.LifeMonitor = LifeMonitor;
//# sourceMappingURL=life-monitor.js.map