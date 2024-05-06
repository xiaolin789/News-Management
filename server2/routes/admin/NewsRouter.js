var express = require('express');
const NewsController = require('../../controllers/admin/NewsController')
var NewsRouter = express.Router();

// 图片上传
const multer  = require('multer')
const upload = multer({ dest: 'public/newsuploads/' })

// 涉及文件上传， 普通的post不行，需要加上multer中间件
// 添加新闻
NewsRouter.post("/adminapi/news/add", upload.single('file') , NewsController.add)

// 获取新闻列表信息
NewsRouter.get("/adminapi/news/list", NewsController.getNews)

// 发布状态管理
NewsRouter.put("/adminapi/news/publish", NewsController.putPublish)

// 删除新闻
NewsRouter.delete("/adminapi/news/list/:id",  NewsController.delNews)

// 根据id获取当前编辑内容
NewsRouter.get("/adminapi/news/listId/:id", NewsController.getNewsId)

// 提交编辑新闻内容
NewsRouter.post("/adminapi/news/listUpdate", upload.single('file'), NewsController.updateNews)

module.exports = NewsRouter;