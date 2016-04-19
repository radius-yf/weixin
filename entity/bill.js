import getConn from "./connect";
import Sequelize from "sequelize";
let Bill = getConn().define("bill", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  openid: Sequelize.STRING,
  content: Sequelize.STRING,
  money: Sequelize.DECIMAL(10,2)
});
Bill.sync();
export default Bill;
