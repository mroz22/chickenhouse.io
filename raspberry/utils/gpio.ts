import { Gpio as GpioOrig } from "onoff";

// class GpioMock {
//   writeSync(value: any) {
//     console.log("virtual gpio write sync: ", value);
//   }

//   readSync(value: any) {
//     console.log("virtual gpio read sync: ", value);
//   }

//   watch() {
//     console.log("virtual gpio watch");
//   }
// }

// if (GpioOrig.accessible) {
//   console.log('Gpio.accessible, using real pins')
// } else {
//   console.log('Gpio not accessible, using mocked pins')

// }

// export const Gpio =  GpioOrig.accessible ? GpioOrig : GpioMock;

export const Gpio = GpioOrig;


