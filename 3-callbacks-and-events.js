var events = require("events");

const ticker = (num, cb) => {
  const emitter = new events.EventEmitter();

  const tickInterval = setInterval(() => {
    if (Date.now() % 5 === 0) {
      emitter.emit("error");
    } else {
      emitter.emit("tick");
    }
  }, 50);

  const tickerTimeout = setTimeout(() => {
    clearInterval(tickInterval);
    cb();
  }, num);

  setImmediate(() => {
    emitter.emit("immediate tick");
  });

  return emitter;
};

ticker(3000, () => {
  console.log("done ticking");
})
  .on("tick", () => {
    console.log("tick");
  })
  .on("immediate tick", () => {
    console.log("immediate tick");
  })
  .on("error", () => {
    console.log("Error, date is divisible by 5.");
  });
