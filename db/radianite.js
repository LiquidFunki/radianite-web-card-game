const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });


const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
});

con.connect(async (err) => {
  if (err) throw err;
  console.log("radianite DB CREATED!");
  await con.promise().query("CREATE DATABASE IF NOT EXISTS radianite");
  con.destroy();
});
