import getConn from "./connect";
import Sequelize from "sequelize";
let User = getConn().define("user", {
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
  },
  isAdmin: Sequelize.BOOLEAN
});
User.sync();
export default User;
