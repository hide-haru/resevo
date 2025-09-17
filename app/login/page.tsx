"use strict";
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login(){

    const router = useRouter();

    const handleClick = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const MedicalCardNumber = formData.get("medicalCardNumber");
        const Password = formData.get("password");

        try{
            const response = await fetch("http://localhost:3000/api/login",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({MedicalCardNumber: MedicalCardNumber, Password: Password})
            });
            const result = await response.json();
            alert(result.message);

            if(result.success){
                router.push("http://localhost:3000");
            }else{
                console.log("やり直し");
            }

        }catch(err){
            console.log("サーバとの通信に失敗しました。再度ログインをお願いします。", err);
        }
    }

    return(
        <>
            <div>
                <h1>ログイン</h1>
                <form onSubmit={handleClick}>
                    <dl>
                        <dt>診察券番号　：</dt>
                        <dd><input type="text" name="medicalCardNumber" placeholder="診察券番号(半角数字)"
                                onInput={(e) => {const target = e.target as HTMLInputElement; target.value = target.value.replace(/[^0-9]/g, "");}} required /></dd>
                    </dl>
                    <dl>
                        <dt>パスワード　：</dt>
                        <dd><input type="password" name="password" placeholder="パスワード" required /></dd>
                    </dl>
                    <button>ログイン</button>
                </form>
                <Link href="http://localhost:3000//newregister">新規登録はこちら</Link>
            </div>
        </>
    );
}