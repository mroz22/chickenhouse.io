const Chickenhouse = require("./chickenhouse");

const chickenhouse = new Chickenhouse();
const isDown = async () => {
  return new Promise((resolve, reject) => {
    chickenhouse.on("door-stop-bottom", (value) => {
      if (value === 1) {
        return resolve();
      }
    });
    chickenhouse.on("door-stop-top", (value) => {
      if (value === 1) {
        return reject();
      }
    });
  });
};

const run = async () => {
  chickenhouse.moveDown();

  await isDown();
  console.log("done");
};
