import mongoose from "mongoose";
import config from "../config";

var db = mongoose.createConnection(config.dburl);

export default db;
process.on("SIGINT", ()=> db.close(()=> console.log("\nconnection closed")));
