"use strict";
exports.__esModule = true;
exports.Gpio = void 0;
var onoff_1 = require("onoff");
var GpioMock = (function () {
    function GpioMock() {
    }
    GpioMock.prototype.writeSync = function (value) {
        console.log("virtual gpio write sync: ", value);
    };
    GpioMock.prototype.readSync = function (value) {
        console.log("virtual gpio read sync: ", value);
    };
    GpioMock.prototype.watch = function () {
        console.log("virtual gpio watch");
    };
    return GpioMock;
}());
if (onoff_1.Gpio.accessible) {
    console.log('Gpio.accessible, using real pins');
}
else {
    console.log('Gpio not accessible, using mocked pins');
}
exports.Gpio = onoff_1.Gpio.accessible ? onoff_1.Gpio : GpioMock;
//# sourceMappingURL=gpio.js.map