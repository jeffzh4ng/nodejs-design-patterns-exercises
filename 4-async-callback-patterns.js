const fs = require("fs");

const concatFiles = (dest, cb, ...srcFiles) => {
  const iterate = (index) => {
    if (index === srcFiles.length) return cb();
    console.log(srcFiles[index]);

    copyFile(srcFiles[index], dest, (err) => {
      if (err) return cb(err);

      iterate(index + 1);
    });
  };

  iterate(0);
};

const copyFile = (src, dest, cb) => {
  fs.readFile(src, (err, data) => {
    if (err) cb(err, null);

    console.log(data.toString());

    fs.appendFile(dest, data, (err) => {
      if (err) cb(err);
      cb(null);
    });
  });
};

concatFiles(
  "c.txt",
  () => {
    console.log("done");
  },
  "a.txt",
  "b.txt"
);
