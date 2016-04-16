import db from "./connect";
import Sequelize from "sequelize";
let User = db.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  name: Sequelize.STRING,
  openid: {
    type: Sequelize.STRING,
    unique: true
  }
});
User.sync();
export default User;
