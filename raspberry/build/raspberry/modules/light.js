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
exports.Light = void 0;
var module_1 = require("./module");
var gpio_1 = require("../utils/gpio");
var Light = (function (_super) {
    __extends(Light, _super);
    function Light(_a) {
        var id = _a.id, dataRef = _a.dataRef, gpio = _a.gpio;
        var _this = this;
        var onStateChange = function (state) {
            var light_state = state.light_state;
            if (light_state) {
                _this.turnOn();
            }
            else {
                _this.turnOff();
            }
        };
        _this = _super.call(this, { id: id, dataRef: dataRef, onStateChange: onStateChange }) || this;
        var pin = gpio.pin;
        _this.PIN = new gpio_1.Gpio(pin, "out");
        _this.init();
        return _this;
    }
    Light.prototype.turnOn = function () {
        this.PIN.writeSync(1);
    };
    Light.prototype.turnOff = function () {
        this.PIN.writeSync(0);
    };
    Light.prototype.onInit = function () {
        this.turnOn();
    };
    return Light;
}(module_1.Module));
exports.Light = Light;
//# sourceMappingURL=light.js.map