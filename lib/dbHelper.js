const fs = require("fs");
const path = require("path");

const PATH = path.resolve(__dirname, "../../../../db/db.json");
let db = JSON.parse(fs.readFileSync(PATH));

const write = async () => await fs.promises.writeFile(PATH, JSON.stringify(db));

function writeRoom(roomId, adminId) {
  if (!(roomId in db)) {
    db[roomId] = { adminId, messages: [] };
    write();
  }
}

function writeMessage(roomId, userId, msg) {
  db[roomId].messages.push({ userId, msg });
  write();
}

module.exports = { writeRoom, writeMessage };
