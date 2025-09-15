import sql from "mssql";

// 接続設定
export const config = {
  user: process.env.DB_USER!,           // DBユーザー名
  password: process.env.DB_PASSWORD!,   // パスワード
  server: process.env.DB_HOST!,         // サーバー名 / IP
  database: process.env.DB_NAME!,       // データベース名
  options: {
    encrypt: true,                     // Azure SQL などでは必須
    trustServerCertificate: true,      // 開発環境のみ
  },
  port: Number(process.env.DB_PORT) || 57739,
};

// 接続関数
export async function getConnection() {
  try {
    const pool = await sql.connect(config);
    return pool;
  } catch (err) {
    console.error("DB接続エラー:", err);
    throw err;
  }
}