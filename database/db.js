const mysql = require("mysql2/promise"); // Menggunakan promise-based

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "myperpus",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


(async () => {
  try {
    const connection = await db.getConnection();
    console.log("Database connected");
    connection.release();
  } catch (err) {
    console.error("Database failed to connect:", err.message);
    process.exit(1);
  }
})();

module.exports = db;