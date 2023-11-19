'use strict';

const jwt = require('jsonwebtoken');
const jwtKey = require('../../configs/jwt.json').key;
const service = require('../services/user')
const loginSql = require('../../configs/sql.json');

const mysql = require('mysql2');
const con = mysql.createConnection({
  host: loginSql.host,
  user: loginSql.user,
  password: loginSql.password,
  database: loginSql.database
}).promise();


class controler {
  async create(req, res) {
    const sql = `INSERT INTO users (firstname, secondname, thirdname, phone) VALUES ('${req.body.firstname}', '${req.body.secondname}', '${req.body.thirdname}', '${req.body.phone}')`;
    con.query(sql).then(async result =>{
      // console.log(result)
      jwt.sign(req.body, jwtKey, { expiresIn: '14d' }, async (err, token) => {
        await res.status(201).json(token);
      });
    })
    .catch(async error =>{
      await res.status(500).json(error);
    });
  }
  async getAll(req, res) {
    const sql = `SELECT * FROM users`;
    con.query(sql).then(async result =>{
      await res.status(200).json(result[0]);
    })
    .catch(async error =>{
      await res.status(500).json(error);
    });
  };
  async get(req, res) {
    const sql = `SELECT * FROM users WHERE id = ${req.params.id}`;
    con.query(sql).then(async result =>{
      await res.status(200).json(result[0]);
    })
    .catch(async error =>{
      await res.status(500).json(error);
    });
  };
  async getMe(req, res) {
    const sql = `SELECT * FROM users HAVING phone = "${req.user.phone}"`;
    con.query(sql).then(async result =>{
      await res.status(200).json({ data: result[0]});
    })
    .catch(async error =>{
      await res.status(500).json({ error: 'Internal Server Error'});
    });
  };
  async update(req, res) {
    const sqlG = `SELECT * FROM users HAVING phone = "${req.user.phone}"`;
    con.query(sqlG).then(async result =>{
      const sqlU = `UPDATE users SET
      firstname = "${req.body.firstname == undefined ? result[0][0].firstname : req.body.firstname}",
      secondname = "${req.body.secondname == undefined ? result[0][0].secondname : req.body.secondname}",
      thirdname = "${req.body.thirdname == undefined ? result[0][0].thirdname : req.body.thirdname}",
      phone = "${req.body.phone == undefined ? result[0][0].phone : req.body.phone}",
      pasport = "${req.body.pasport == undefined ? JSON.stringify(result[0][0].pasport) : req.body.pasport}",
      story = "${req.body.story == undefined ? JSON.stringify(result[0][0].story) : req.body.story}",
      cards = "${req.body.cards == undefined ? JSON.stringify(result[0][0].cards) : req.body.cards}",
      password = "${req.body.password == undefined ? result[0][0].password : req.body.password}"
      HAVING phone = "${req.user.phone}"`;

      con.query(sqlU).catch(async error =>{
        console.log(error)
        await res.status(500).json({ error: 'Internal Server Error'});
      });

      con.query(sqlG).then(async result =>{
        await res.status(200).json({ data: result[0]});
      })
    })
    .catch(async error =>{
      console.log(error)
      await res.status(500).json({ error: 'Internal Server Error'});
    });
  }
  async delete(req, res) {
    const sql = `DELETE FROM users HAVING phone = "${req.user.phone}"`;
    con.query(sql).then(async result =>{
      if (result[0].affectedRows !== 0){
        await res.status(200).json({ data: 'ok' });
      } else {
        await res.status(404).json({ error: 'Not Found' });
      }
    })
    .catch(async error =>{
      console.log(error)
      await res.status(500).json({ error: 'Internal Server Error'});
    });
  }
}

module.exports = new controler()