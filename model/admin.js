import Route from "./route"

let app = Route();
async function cost(money, content, openid) {
	let data = await Bill.create({
		openid,
		content,
		money
	});
	return `记录成功
编号:${data.id}
价格:${data.money}
备注:${data.content}`;
// 使用 $del cost ${data.id} 命令可以删除记录`;
}
app.use("cost", (req, res) => {
  
})
