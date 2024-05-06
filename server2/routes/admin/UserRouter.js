var express = require('express');
const UserController = require('../../controllers/admin/UserController')
var UserRouter = express.Router();

// 图片上传
const multer  = require('multer')
const upload = multer({ dest: 'public/avataruploads/' })

/* GET home page. */
UserRouter.post('/adminapi/user/login', UserController.login)
UserRouter.post('/adminapi/user/upload', upload.single('file'), UserController.upload)
UserRouter.post('/adminapi/user/add', upload.single('file'), UserController.add)

// 实现用户列表的增删改查

// 获取用户信息
UserRouter.get('/adminapi/user/list', UserController.getList)

// 根据id获取用户信息
UserRouter.get('/adminapi/user/listId/:id', UserController.getListId)

// 根据id修改信息
UserRouter.put('/adminapi/user/listPut/:id', UserController.putList)

// 根据id删除信息
UserRouter.delete('/adminapi/user/list/:id', UserController.delList)


module.exports = UserRouter;