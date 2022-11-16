const fs = require("fs");
const path = require("path");

console.log(path.join(__dirname, "./db/db.json"));

fs.promises.writeFile(path.resolve(".", "./db/db.json"), JSON.stringify({}));
