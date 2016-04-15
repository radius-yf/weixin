import db from "./connect";
import Sequelize from "sequelize";
let Message = db.define("message", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  openid: Sequelize.STRING,
  content: Sequelize.STRING,
  result: Sequelize.STRING
});
Message.sync();
export default Message;
