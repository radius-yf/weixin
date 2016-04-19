import Sequelize from "sequelize";
import config from "../config";

// var sequelize = new Sequelize("r18n4bnfzt11782c","r18n4bnfzt11782c","123456",{
//     dialect: "mysql",
//     host: "rds08ct7o3fm7wuqbe69.mysql.rds.aliyuncs.com",
//     port: 3306
// });
var db = new Sequelize(config.mysql, {
  timezone: "+08:00"
});
export default function () {
  return db;
};
