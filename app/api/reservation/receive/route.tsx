import { NextResponse } from "next/server";
import sql from "mssql";
import { config } from "../../../utils/database";

export async function GET(){
      try {
            const pool = await sql.connect(config);         // 接続
            const result = await pool.request().query("SELECT * FROM Reservations");
            console.log(result.recordset);                  // 結果取得
            await pool.close();                             // 切断
            return NextResponse.json(result.recordset);
        } catch (err) {
            console.error(err);
  }
    return NextResponse.json({message:"取得成功！"})
}