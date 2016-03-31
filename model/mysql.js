import Sequelize from "sequelize";
import config from "../config";

// var sequelize = new Sequelize("r18n4bnfzt11782c","r18n4bnfzt11782c","123456",{
//     dialect: "mysql",
//     host: "rds08ct7o3fm7wuqbe69.mysql.rds.aliyuncs.com",
//     port: 3306
// });
var sequelize = new Sequelize(config.mysql);
export var User = sequelize.define("User", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    title: {
        type: Sequelize.STRING,
        comment: 'Task title'
    },
    // allow null
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    // default value
    deadline: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
    }
});
User.sync()
export default sequelize;
