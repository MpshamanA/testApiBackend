const express = require("express");
const app = express();
const port = 3001;

app.use(express.json());

const mysql = require("mysql");
const con = mysql.createConnection({
  host: HOSTNAME,
  user: USER,
  password: PASSWORD,
  database: DATABASENAME,
});

//SQLサーバーへの接続
con.connect((err) => {
  if (err) throw err;
  console.log("Connected");
});

//レスポンスとしてSQLの実行結果を画面に表示
app.get("/api", (req, res) => {
  const sql = "select * from users";
  con.query(sql, (err, result, fields) => {
    if (err) throw err;
    res.json(result);
    // res.json({ message: "Hello World!" });
  });
});
//Serverの起動
app.listen(port, () => {
  console.log(`OK localhost:${port}`);
});
