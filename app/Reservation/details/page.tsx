"use strict";
"use client";

export default function ReserveDetails(){
    const handleClick = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const title = formData.get("title");

        const CustomerNo = "1";
        const ResStartTime = "2025-09-19T09:00:00";
        const ResEndTime = "2025-09-19T10:00:00";
        
        try{
            const response = await fetch("http://localhost:3000/api/reservation/ReserveDetails",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({CustomerNo:CustomerNo, Title:title, ResStartTime:ResStartTime, ResEndTime:ResEndTime})
            })
            const result = await response.json();
            
        }catch(err){
            console.log("バックエンドとの通信に失敗", err);
        }
    }

    return(
        <>
            <div>
                <h1>予約詳細</h1>
                <form onSubmit={handleClick}>
                    <input type="text" name="title" placeholder="タイトルを入力" />
                    <button>予約</button>
                </form>
            </div>
        </>
    );
}