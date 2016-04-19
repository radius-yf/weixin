import db from "./connect";
import Sequelize from "sequelize";
let Bill = db.define("bill", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  openid: Sequelize.STRING,
  content: Sequelize.STRING,
  money: Sequelize.DECIMAL
});
Bill.sync();
export default Bill;
