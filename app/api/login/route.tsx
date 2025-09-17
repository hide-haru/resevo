import { NextResponse } from "next/server";
import sql from "mssql";
import { config } from "../../utils/database";

export async function POST(request: Request) {
    try{
        const data = await request.json();
        const { MedicalCardNumber, Password } = data;
        const pool = await sql.connect(config);     //データベース接続
        const search = await pool.request()
            .input("MedicalCardNumber", sql.Int, MedicalCardNumber)
            .input("Password", sql.VarChar(100), Password)
            .query("SELECT * FROM CustomerMaster WHERE MedicalCardNumber = @MedicalCardNumber AND Password = @Password")

        if(search.recordset.length > 0){
            await pool.close();     //データベース切断
            return NextResponse.json({success: true, message: "ログイン成功"});
        }else{
            await pool.close();     //データベース切断
            return NextResponse.json({success: false, message: "診察券番号 または passwordが間違っています。"});
        }
        
    }catch(err){
        console.error(err);
        return NextResponse.json({message:"サーバ内でエラーが発生しました。"})
    }
}