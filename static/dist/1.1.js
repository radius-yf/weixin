webpackJsonp([1],{9:function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={data:function(){return{}},props:["item"],computed:{},ready:function(){},attached:function(){},methods:{},components:{}}},10:function(t,e,o){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var n=o(35),s=i(n);e["default"]={data:function(){return{items:[]}},computed:{},ready:function(){var t=this;this.$http.get("/api/list").then(function(e){t.items=e.data})},attached:function(){},methods:{},components:{Item:s["default"]}}},15:function(t,e,o){e=t.exports=o(1)(),e.push([t.id,"ul[_v-5e02191c]{padding:5px;list-style:none;width:100%;border:1px solid #eee;box-sizing:border-box}li[_v-5e02191c]{padding:10px 20px}",""])},17:function(t,e,o){e=t.exports=o(1)(),e.push([t.id,"a[_v-720d0932]{display:block;border-bottom:1px solid #eee;text-decoration:none}.date[_v-720d0932]{float:right;color:#aaa}",""])},29:function(t,e){t.exports='<ul _v-5e02191c=""> <li is=item v-for="i of items" :item=i _v-5e02191c=""></li> </ul>'},31:function(t,e){t.exports='<li _v-720d0932=""> <a v-link="\'/article/\' + item.articleid" _v-720d0932=""> {{item.title}} <span class=date _v-720d0932="">{{new Date(item.date).format(\'yyyy-MM-dd hh:mm:ss\')}}</span> </a> </li>'},35:function(t,e,o){var i,n;o(43),i=o(9),n=o(31),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports["default"]),n&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=n)},36:function(t,e,o){var i,n;o(41),i=o(10),n=o(29),t.exports=i||{},t.exports.__esModule&&(t.exports=t.exports["default"]),n&&(("function"==typeof t.exports?t.exports.options||(t.exports.options={}):t.exports).template=n)},41:function(t,e,o){var i=o(15);"string"==typeof i&&(i=[[t.id,i,""]]);o(2)(i,{});i.locals&&(t.exports=i.locals)},43:function(t,e,o){var i=o(17);"string"==typeof i&&(i=[[t.id,i,""]]);o(2)(i,{});i.locals&&(t.exports=i.locals)}});