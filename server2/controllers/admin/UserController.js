const db = require('../../db/index')
const JWT = require("../../util/JWT");

const UserController = {
  login: async (req, res) => {
    const { username, password } = req.body
    // console.log(req.body);
    const sql = "select * from user WHERE username=? AND password=?"
    db.query(sql, [username, password], (err, results) => {

      if (err) throw err
      if (results.length === 0) {
        res.send({
          code: "-1",
          error: "用户名密码不匹配",
        });
      } else {
        const token = JWT.generate({
          id: results[0].id,
          username: results[0].username,
        }, "1d")

        // console.log(token.id);
        res.header("Authorization", token)
        res.send({
          ActionType: "OK",
          data: {
            username: results[0].username,
            gender: results[0].gender ? results[0].gender : 0,
            introduction: results[0].introduction,
            avatar: results[0].avatar,
            id:results[0].id,
            role: results[0].role,
          }
        })
      }
    })
  },

  upload: async (req, res) => {
    // console.log(req.body, req.file);
    const { username, password, introduction, gender } = req.body
    const token = req.headers["authorization"].split(" ")[1]
    const avatar = req.file ? `/avataruploads/${req.file.filename}` : ""
    console.log('avatar',avatar);
    var payload = JWT.verify(token)
    const sql = avatar ? 
    "update user set username=?, password=?, introduction=?, gender=?,avatar=? where id=?" :
    "update user set username=?, password=?, introduction=?, gender=? where id=?"

    const query_data = avatar ? [username, password, introduction, gender, avatar, payload.id] :
    [username, password, introduction, gender, payload.id]
    // console.log(sql);
    db.query(sql, query_data, (err, results) => {
      console.log('res',results);
      if (err) throw err
      if (avatar) {
        res.send({
          ActionType: "OK",
          data: {
            id: payload.id,
            username,
            password,
            introduction,
            gender: Number(gender),
            avatar
          }
        })
      } else {
        res.send({
          ActionType: "OK",
          data: {
            id: payload.id,
            username,
            password,
            introduction,
            gender: Number(gender),
          }
        })
      }
    })
  },

  add: async (req, res) => {
    // console.log(req.body, req.file);
    const { username, password, introduction, gender, role } = req.body
    const avatar = req.file ? `/avataruploads/${req.file.filename}` : ""
    const sql = "insert into user (username, password, introduction, gender, role, avatar) values (?,?,?,?,?,?)"
    db.query(sql, [username, password, introduction, gender, role, avatar], (err, results) => {
      if (err) throw err
      if (avatar) {
        res.send({
          ActionType: "OK",
        })
      }
    })
  },

  getList: async (req, res) => {
    const { id, username, introduction, gender, role, avatar } = req.body
    const sql = "select id, username, gender, introduction, role, avatar from user"
    // const sql = "select * from user"
    db.query(sql, [id, username, introduction, gender, role, avatar], (err, results) => {
      if (err) throw err;
      res.send({
        ActionType: "OK",
        data: results
      });
    })
  },

  getListId: async (req, res) => {
    const { id } = req.params
    const sql = "select * from user where id=?"
    db.query(sql, [id], (err, results) => {
      if (err) throw err;
      res.send({
        ActionType: "OK",
        data: results
      });
    })
  },

  putList: async (req, res) => {
    const { id, username, password, gender, role, introduction } = req.body
    const sql = "update user set username=?, password=?, gender=?, role=?, introduction=? where id=?"
    console.log(sql);
    db.query(sql, [username, password, gender, role, introduction, id], (err, results) => {
      if (err) throw err;
      res.send({
        ActionType: 'OK'
      })
    })
  },

  delList: async (req, res) => {
    console.log(req.params.id);
    const { id } = req.params
    const sql = "delete from user where id=?"
    db.query(sql, [id], (err, results) => {
      if (err) throw err;
      res.send({
        ActionType: 'OK'
      })
    })
  }
}
module.exports = UserController;
