var express = require('express');
const ProductController = require('../../controllers/admin/ProductController')
var ProductRouter = express.Router();

// 图片上传
const multer  = require('multer')
const upload = multer({ dest: 'public/productuploads/' })

// 添加产品
ProductRouter.post("/adminapi/product/add", upload.single('file'), ProductController.add)

// 获取产品信息
ProductRouter.get("/adminapi/product/list", ProductController.getProduct)

// 删除产品
ProductRouter.delete("/adminapi/product/list/:id", ProductController.delProduct)

// 根据id获取当前编辑产品内容
ProductRouter.get("/adminapi/product/productId/:id", ProductController.getProductId)

// 提交编辑新闻内容
ProductRouter.post("/adminapi/product/listUpdate", upload.single('file'), ProductController.updateProduct)








module.exports = ProductRouter