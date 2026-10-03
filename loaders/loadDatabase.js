const mysql = require("mysql2")
module.exports = async () => {
    let db = await mysql.createPool(process.env.DATABASE);

    return db;
}