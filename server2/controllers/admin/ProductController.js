const db = require('../../db/index')


const ProductController = {
    add: async (req, res) => {
        const { title, introduction, detail } = req.body
        const editTime = new Date()
        const cover = req.file ? `/productuploads/${req.file.filename}` : ""
        const sql = "insert into product (title, introduction, detail, cover, editTime) values (?,?,?,?,?)"
        db.query(sql, [title, introduction, detail, cover, editTime], (err, result) => {
            if (err) throw err
            if (cover) {
                res.send({
                    ActionType: "OK"
                })
            }
        })
    },

    getProduct: async (req, res) => {
        const {title, introduction} = req.body
        const editTime = new Date()
        const sql = "select * from product"
        db.query(sql, [title, introduction, editTime], (err, results) => {
            if(err) throw err
            res.send({
                ActionType: "OK",
                data: results
            })
        })
    },

    delProduct: async (req, res) => {
        const {id} = req.params
        const sql = "delete from product where id=?"
        db.query(sql, [id], (err, results) => {
            if(err) throw err
            res.send({
                ActionType: "OK"
            })
        })
    },

    getProductId: async (req, res) => {
        const { id } = req.params
        const sql = "select * from product where id=?"
        db.query(sql, [id], (err, results) => {
            if (err) throw err
            res.send({
                ActionType: 'OK',
                data: results
            })
        }) 
    },

    updateProduct: async (req, res) => {
        const { id, title, introduction, detail } = req.body
        const editTime = new Date()
        const cover = req.file ? `/productuploads/${req.file.filename}` : ""
        const sql = cover
            ? "update product set title=?, introduction=?, detail=?, cover=?, editTime=? where id=?"
            : "update product set title=?, introduction=?, detail=?, editTime=? where id=?"

        const query_data = cover ? [title, introduction, detail, cover, editTime, id] :
            [title, introduction, detail, editTime, id]
        db.query(sql, query_data, (err, results) => {
            if (err) throw err
            if (cover) {
                res.send({
                    ActionType: "OK",
                    data: {
                        title, introduction, detail, cover, editTime, id
                    }
                })
            } else {
                res.send({
                    ActionType: "OK",
                    data: {
                        title, introduction, detail, editTime, id
                    }
                })
            }
        })
    }
}


module.exports =  ProductController