'use strict';

const jwt = require('jsonwebtoken');
const jwtKey = require('../../configs/jwt.json').key;
const loginSql = require('../../configs/sql.json');

const mysql = require('mysql2');
const con = mysql.createConnection({
  host: loginSql.host,
  user: loginSql.user,
  password: loginSql.password,
  database: loginSql.database
}).promise();


class controler {
  async create(data) {
    const sql = `INSERT INTO users (firstname, secondname, thirdname, phone) VALUES ('${data.firstname}', '${data.secondname}', '${data.thirdname}', '${data.phone}')`;
    con.query(sql).then(async result =>{
      // console.log(result)
      jwt.sign(data, jwtKey, { expiresIn: '14d' }, async (err, token) => {
        await res.status(201).json(token);
      });
    })
    .catch(async error =>{
      await res.status(500).json(error);
    });
  }
  async getAll() {
    const sql = `SELECT * FROM users`;
    con.query(sql).then(async result =>{
      await res.status(200).json(result[0]);
    })
    .catch(async error =>{
      await res.status(500).json(error);
    });
  };
  async get(id) {
    const sql = `SELECT * FROM users WHERE id = ${id}`;
    con.query(sql).then(async result =>{
      await res.status(200).json(result[0]);
    })
    .catch(async error =>{
      await res.status(500).json(error);
    });
  };
  async update(data) {
    const sql = `SELECT * FROM users WHERE id = ${id}`;
    con.query(sql).then(async result =>{
      const sqlU = `UPDATE users SET firstname, secondname, thirdname, phone WHERE id = ${id}`;
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
  async delete(id) {
    const sql = `DELETE FROM users WHERE id = ${id}`;
    con.query(sql).then(async result =>{
      if (result[0].affectedRows !== 0){
        await res.status(200).json({ data: 'ok' });
      } else {
        await res.status(404).json({ error: 'Not Found' });
      }
    })
    .catch(async error =>{
      return error;
    });
  }
}

module.exports = new controler()