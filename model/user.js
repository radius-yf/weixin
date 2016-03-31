import db from "./connect";
import mongoose from "mongoose";

let MsgSchema = new mongoose.Schema({
    content: String,
    createtime: Date,
    msgid: Number,
    msgtype: String
});

let MsgModel = db.model("Msg", MsgSchema);

let UserSchema = new mongoose.Schema({
    openid: String,
    name: String,
    chatinfo:[MsgSchema]
});

export var UserModel = db.model("User", UserSchema);
