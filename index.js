const express = require("express");

const app = express();

app.use('/', require("./router/index"));
app.use('/weixin', require("./router/weixin"));
app.listen(process.env.PORT || 3000);
