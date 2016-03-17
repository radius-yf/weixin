const koa = require("koa");
const weixin = require("./router/weixin");

const app = koa();

app.use(weixin.routes());
app.listen(process.env.PORT || 3000);
