const mongoose = require('mongoose');

const db = mongoose.createConnection('mongodb://192.168.75.1/test');

var UserSchema = new mongoose.Schema({
    openid: String,
    name: String,
    chatinfo:[{
        content: String,
        createtime: Date,
        msgid: Number,
        msgtype: String
    }]
});
var UserModel = db.model("User", UserSchema);

UserModel.find().then(docs=> {
    console.log(docs);
    db.close();
});

// UserModel.create({
//     openid: "zpy",
//     name: "张培园",
//     money: 100.00
// }).then(function (err) {
//     if (!err) {
//         console.log("success");
//     }
//     db.close();
// })


// UserModel.remove().then(function () {
//     console.log("success");
//     db.close();
// });
