const fs = require("fs");
const path = require("path");

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

// concatFiles(
//   "c.txt",
//   () => {
//     console.log("done");
//   },
//   "a.txt",
//   "b.txt"
// );

const listNestedFiles = (dir = "./", cb) => {
  fs.readdir(dir, { withFileTypes: true }, (err, files) => {
    if (files === undefined) return;

    console.log(`====${dir}====`);
    const dirs = files.filter((f) => f.isDirectory);

    for (const d of dirs) {
      console.log(d.name);
      listNestedFiles(path.join("./", d.name), cb);
    }
  });
};

// listNestedFiles("./", (err) => {
//   if (err) console.log("error");
//   else console.log("done");
// });

const recursiveFind = (dir = "./", keyword, cb) => {
  fs.readdir(dir, { withFileTypes: true }, (err, dirents) => {
    if (!dirents) return;

    const files = dirents.filter((f) => f.isFile);
    const dirs = dirents.filter((f) => f.isDirectory);

    for (const f of files) {
      findKeyword(f.name, keyword);
    }

    for (const d of dirs) {
      recursiveFind(d.name, keyword, cb);
    }
  });
};

const findKeyword = (f, keyword) => {
  fs.readFile(f, (err, data) => {
    if (data) {
      const parsedData = data.toString();
      if (parsedData.includes(keyword)) console.log(f);
    }
  });
};

recursiveFind("./", "hello", () => {
  console.log("done");
});
