import express from 'express';
import list from './list.json';
import fs from 'fs';
const router = express.Router();
router.route("/test").get(function (req, res) {
	console.log("GET");
	res.json(req.query)
}).post(function (req, res) {
	console.log("POST");
	console.log(req.body);
	res.json(req.body);
});
//  首页列表
router.route("/list").get(function (req, res) {
	res.json(list);
});
// 文章列表 添加文章
router.route("/article").get(function (req, res) {
	res.json(list);
}).post(function (req, res) {
	var articleid = Math.max.apply(null, list.map((item) => item.articleid)) + 1;
	if (/^(?!.*[\/\.])/.test(req.body.title)) {
		let item = {
			title: req.body.title,
			articleid,
			date: Date.now()
		};
		list.push(item);
		fs.writeFile(`${__dirname}/list.json`, JSON.stringify(list), function (err) {
			if (err) {
				console.log("list.json");
				console.log(err);
			}
		});
		let content = req.body.content;
		fs.writeFile(`${__dirname}/article/${articleid}.md`, content, function (err) {
			if (err) {
				console.log("md");
				console.log(err);
			}
		});
		res.json(Object.assign({content}, item));
	} else {
		res.status(400).send('Bad Request');
	}
});
// 文章内容 修改文章 删除文章
router.route("/article/:articleid").get(function (req, res) {
	if (/^(?!.*[\/\.])/.test(req.params.articleid)) {
		let item = list.filter((item) => item.articleid == req.params.articleid)[0];
		fs.readFile(`${__dirname}/article/${item.articleid}.md`, "utf-8", function (err, content) {
			if (err) {
				console.log(err);
				res.status(400).send('Bad Request');
			} else {
				res.send(content);
			}
		});
	} else {
		res.status(400).send('Bad Request');
	}
}).put(function (req, res) {
	res.json({
		articleid: req.params.articleid,
		title: "标题",
		content: `
# markdown
这是内容
`
	});
}).delete(function (req, res) {
	res.json({articleid: req.params.articleid});
});

export default router;
