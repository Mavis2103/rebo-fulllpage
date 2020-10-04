const mysql = require("mysql");
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DB,
    multipleStatements: true
})

connection.connect(err => {
    if (err) throw err;
    console.log(`Connected MySQL !!!`);
})

module.exports = connection;