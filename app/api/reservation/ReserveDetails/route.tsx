import { NextResponse } from "next/server";
import sql from "mssql";
import { config } from "../../../utils/database";

export async function POST(request: Request){
    try{
        const data = await request.json();
        const { CustomerNo, Title, ResStartTime, ResEndTime } = data;
        console.log(CustomerNo, Title, ResStartTime, ResEndTime);
        const pool = await sql.connect(config);         // 接続
        
        //日時重複が存在するか確認
        const search = await pool.request().query(`SELECT count(*) as count FROM Reservations WHERE ResStartTime >= '${ResStartTime}' and ResEndTime <= '${ResEndTime}'`);
        const result = search.recordset[0].count;
        console.log(result);
        if(result === 0){
            await pool.request()
                .input("CustomerNo", sql.NVarChar, CustomerNo)
                .input("Title", sql.VarChar, Title)
                .input("ResStartTime", sql.VarChar, ResStartTime)
                .input("ResEndTime", sql.VarChar, ResEndTime)
                .query(`INSERT INTO Reservations (CustomerNo,Title,ResStartTime,ResEndTime) VALUES (@CustomerNo, @title ,@ResStartTime ,@ResEndTime);`);
                await pool.close();                             // 切断
                return NextResponse.json({message: "予約が登録されました。"});
        }else{
            console.log("既に予約時間が埋まっているため、予約できませんでした。");
            await pool.close();                             // 切断
            return NextResponse.json({message: "予約は登録されませんでした。"});
        }
        
        
        
    }catch(err){
        console.log(err);
    }
    return NextResponse.json({message:"取得成功！"})
}