const db = require('../../db/index')


const NewsController = {
    add: async (req, res) => {
        const { title, content, category, isPublish } = req.body
        const editTime = new Date()
        const cover = req.file ? `/newsuploads/${req.file.filename}` : ""
        const sql = "insert into news (title, content, category, cover, isPublish, editTime) values (?,?,?,?,?,?)"
        db.query(sql, [title, content, category, cover, isPublish, editTime], (err, result) => {
            if (err) throw err
            if (cover) {
                res.send({
                    ActionType: "OK"
                })
            }
        })
    },

    getNews: async (req, res) => {
        const { title, content, category, cover, isPublish, editTime } = req.body
        const sql = "select * from news"
        db.query(sql, [title, content, category, cover, isPublish, editTime], (err, results) => {
            if (err) throw err
            res.send({
                ActionType: "OK",
                data: results
            })
        })
    },

    putPublish: async (req, res) => {
        const editTime = new Date()
        const { id, isPublish } = req.body
        const sql = "update news set isPublish=?, editTime=? where id=?"
        db.query(sql, [isPublish, editTime, id], (err, results) => {
            if (err) throw err
            res.send({
                ActionType: "OK"
            })
        })
    },

    delNews: async (req, res) => {
        const { id } = req.params
        const sql = "delete from news where id=?"
        db.query(sql, [id], (err, results) => {
            if (err) throw err
            res.send({
                ActionType: 'OK'
            })
        })
    },

    getNewsId: async (req, res) => {
        const { id } = req.params
        const sql = "select * from news where id=?"
        db.query(sql, [id], (err, results) => {
            if (err) throw err
            res.send({
                ActionType: 'OK',
                data: results
            })
        })
    },

    updateNews: async (req, res) => {
        const { id, title, content, category, isPublish } = req.body
        const editTime = new Date()
        const cover = req.file ? `/newsuploads/${req.file.filename}` : ""
        const sql = cover
            ? "update news set title=?, content=?, category=?, cover=?, isPublish=?, editTime=? where id=?"
            : "update news set title=?, content=?, category=?, isPublish=?, editTime=? where id=?"

        const query_data = cover ? [title, content, category, cover, isPublish, editTime, id] :
            [title, content, category, isPublish, editTime, id]
        db.query(sql, query_data, (err, results) => {
            if (err) throw err
            if (cover) {
                res.send({
                    ActionType: "OK",
                    data: {
                        title, content, category, cover, isPublish, editTime, id
                    }
                })
            } else {
                res.send({
                    ActionType: "OK",
                    data: {
                        title, content, category, isPublish, editTime, id
                    }
                })
            }
        })
    }
}




















module.exports = NewsController;