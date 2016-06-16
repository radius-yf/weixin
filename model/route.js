export default function Route(param) {
  let arr = [];
  let app = (req, res, params) => {
    arr.forEach(f => {
      if (f.param === undefined) {
        f(req, res);
      } else if (f.param === "") {
        f(req, res, params);
      } else if (f.param === params[0]) {
        f(req, res, params.splice(1));
      }
    });
  };
  app.param = param || "";
  app.use = (param, callback) => {
    if (typeof param === "string" && param !== "") {
      if (typeof callback !== "function") {
        throw "参数错误";
      }
      if(param.indexOf(" ") >= 0) {
        throw "命令中包含空格";
      }
      let n = arr.map(i => i.param).indexOf(param);
      if (n >= 0) {
        arr[n].use(callback);
      } else if (callback.param === undefined || callback.param !== "") {
        let v = Route();
        v.use(callback);
        v.param = param;
        arr.push(v);
      } else if (callback.param === "") {
        callback.param = param;
        arr.push(callback);
      }
    } else {
      arr.push(param);
    }

    return app;
  };

  return app;
}
