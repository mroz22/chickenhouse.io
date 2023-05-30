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
exports.Door = void 0;
var module_1 = require("./module");
var gpio_1 = require("../utils/gpio");
var DOOR_OPEN = 1;
var DOOR_CLOSE = -1;
var DOOR_STOP = 0;
var Door = (function (_super) {
    __extends(Door, _super);
    function Door(_a) {
        var id = _a.id, dataRef = _a.dataRef, gpio = _a.gpio;
        var _this = this;
        var onStateChange = function (state) {
            var door_movement = state.door_movement, door_position = state.door_position;
            if (door_movement === DOOR_OPEN && (!door_position || door_position !== "top")) {
                _this.moveUp();
            }
            else if (door_movement === DOOR_CLOSE && (!door_position || door_position !== "bottom")) {
                _this.moveDown();
            }
            else if (door_movement === DOOR_STOP) {
                _this.stop();
            }
        };
        _this = _super.call(this, { id: id, dataRef: dataRef, onStateChange: onStateChange }) || this;
        var motorPin1 = gpio.motorPin1, motorPin2 = gpio.motorPin2, doorStopPinBottom = gpio.doorStopPinBottom, doorStopPinTop = gpio.doorStopPinTop;
        _this.moveTimeout = undefined;
        _this.PIN_DOOR_MOTOR_1 = new gpio_1.Gpio(motorPin1, "out");
        _this.PIN_DOOR_MOTOR_2 = new gpio_1.Gpio(motorPin2, "out");
        _this.PIN_DOOR_STOP_BOTTOM = new gpio_1.Gpio(doorStopPinBottom, "in", "both");
        _this.PIN_DOOR_STOP_TOP = new gpio_1.Gpio(doorStopPinTop, "in", "both");
        _this.PIN_DOOR_STOP_BOTTOM.watch(function (err, value) {
            if (err) {
                return console.log("PIN_DOOR_STOP_BOTTOM error", err.message);
            }
            _this.log("door stop bottom value: ".concat(value));
            if (value == 0) {
                _this.stop();
                _this.setState({ door_position: 'bottom', door_movement: 0 });
            }
        });
        _this.PIN_DOOR_STOP_TOP.watch(function (err, value) {
            if (err) {
                return console.log("PIN_DOOR_STOP_TOP error", err.message);
            }
            _this.log("door stop top value: ".concat(value));
            if (value == 0) {
                _this.stop();
                _this.setState({ door_position: 'top', door_movement: 0 });
            }
        });
        _this.init();
        return _this;
    }
    Door.prototype.setMovementFailsafeTimeout = function () {
        var _this = this;
        if (!this.moveTimeout) {
            this.moveTimeout = setTimeout(function () {
                console.log("".concat(_this.id, ": onInit -> failsafe stop!"));
                _this.stop();
                _this.setState({ door_position: '', door_movement: 0 });
                clearTimeout(_this.moveTimeout);
                _this.moveTimeout = undefined;
            }, 1000 * 120);
        }
    };
    Door.prototype.moveDown = function () {
        this.PIN_DOOR_MOTOR_1.writeSync(0);
        this.PIN_DOOR_MOTOR_2.writeSync(1);
        this.setMovementFailsafeTimeout();
        console.log("".concat(this.id, ": moving down"));
        this.setState({ door_position: '' });
    };
    Door.prototype.moveUp = function () {
        this.PIN_DOOR_MOTOR_1.writeSync(1);
        this.PIN_DOOR_MOTOR_2.writeSync(0);
        this.setMovementFailsafeTimeout();
        console.log("".concat(this.id, ": moving up"));
        this.setState({ door_position: '' });
    };
    Door.prototype.stop = function () {
        this.PIN_DOOR_MOTOR_1.writeSync(0);
        this.PIN_DOOR_MOTOR_2.writeSync(0);
        console.log("".concat(this.id, ": stopped"));
    };
    Door.prototype.onInit = function () {
        this.stop();
    };
    return Door;
}(module_1.Module));
exports.Door = Door;
//# sourceMappingURL=door.js.map