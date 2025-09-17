import { NextResponse } from "next/server";
import sql from "mssql";
import { config } from "../../utils/database";

export async function POST(request: Request){
    try{
        const data = await request.json();
        const { KanjiName, KanaName, BirthDate, Gender, TelNo, Address, Email, Password} = data;

        /*CustomerNoの一意キーを取得します。*/
        const pool = await sql.connect(config)     //データベース接続

        const search = await pool.query("select MAX(CustomerNo + 1) as customerno from CustomerMaster");
        const CustomerNo = search.recordset[0].customerno;
        console.log(CustomerNo);
        
        const regist = await pool.request()
            .input("CustomerNo", sql.BigInt, CustomerNo)
            .input("KanjiName", sql.NVarChar, KanjiName)
            .input("KanaName", sql.NVarChar, KanaName)
            .input("BirthDate", sql.Date, BirthDate)
            .input("Gender", sql.Int, Gender)
            .input("TelNo", sql.NVarChar, TelNo)
            .input("Address", sql.VarChar, Address)
            .input("Email", sql.NVarChar, Email)
            .input("Password", sql.VarChar, Password)
            .query("INSERT INTO CustomerMaster (CustomerNo ,KanjiName, KanaName, BirthDate, Gender, TelNo, Address, MailAddress, Password) VALUES ('@CustomerNo', '@KanjiName', '@KanaName', '@BirthDate', @Gender, '@TelNo', '@Address', '@Email', '@Password');")
        
        console.log(regist);
        await pool.close();
        return NextResponse.json({success: true, message: "登録成功"});
    }catch(err){
        return NextResponse.json({success: false, message: "サーバ内でエラーが発生しました。"});
    }
}