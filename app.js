const express = require("express");
const app = express();
const port = 3001;

app.use(express.json());

const mysql = require("mysql");
const con = mysql.createConnection({});

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//SQLサーバーへの接続
con.connect((err) => {
  if (err) throw err;
  console.log("Connected");
});

app.post("/api", (req, res) => {
  const request = req.body;
  const name = request.name;
  const position = request.position;
  //パターン1
  const sqlInsert1 = `insert into users (name,position) VALUES ("${name}","${position}")`;
  con.query(sqlInsert1, (err) => {
    if (err) throw err;
    res.json({
      OK: true,
      InsertLog: request,
    });
  });

  //パターン2
  //?の場合はquetyの引数で値を渡す
  // const sqlInsert2 = `insert into users (name,position) VALUES (?,?)`;
  // const sqlSelect = `select * from users where name = ?`;
  // con.query(sqlSelect, [name], (err, result, fields) => {
  //   if (err) throw err;
  //   res.json(result);
  // });
});

//レスポンスとしてSQLの実行結果を画面に表示
app.get("/api", (req, res) => {
  const sql = `select * from users`;
  con.query(sql, (err, result, fields) => {
    if (err) throw err;
    res.json(result);
  });
});
//Serverの起動
app.listen(port, () => {
  console.log(`OK localhost:${port}`);
});
