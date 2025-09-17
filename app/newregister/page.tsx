"use strict";
"use client";

export default function newRegister(){
    const handleClick = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const KanjiName = formData.get("kanjiName");
        const KanaName = formData.get("kanaName");
        const BirthDate = formData.get("birthDate");
        const Gender = formData.get("gender");
        const TelNo = formData.get("telNo");
        const Address = formData.get("address");
        const Email = formData.get("email");
        const Password = formData.get("password");

        try{
            const response = await fetch("http://localhost:3000/api/newregister",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({KanjiName: KanjiName, KanaName: KanaName, BirthDate: BirthDate, Gender: Gender, TelNo: TelNo, Address: Address, Email: Email, Password: Password})
            });

            const result = await response.json();
            alert(result.message);
        }catch(err){
            console.log("サーバとの通信に失敗しました。再度新規登録をお願いします。");
        }

    }
    return(
        <>
            <div>
                <h1>新規登録</h1>
                <form onSubmit={handleClick}>
                    <dl>
                        <dt>名前(漢字)　：</dt>
                        <dd><input type="text" name="kanjiName" placeholder="山田　太郎" required /></dd>
                    </dl>
                    <dl>
                        <dt>名前(カナ)　：</dt>
                        <dd><input type="text" name="kanaName" placeholder="ヤマダ　タロウ" /></dd>
                    </dl>
                    <dl>
                        <dt>生年月日　：</dt>
                        <dd><input type="date" name="birthDate" required /></dd>
                    </dl>
                    <dl>
                        <dt>性別　：</dt>
                        <dd><input type="radio" name="gender" value="0" required /><label>男性</label></dd>
                        <dd><input type="radio" name="gender" value="1" required /><label>女性</label></dd>
                    </dl>
                    <dl>
                        <dt>電話番号　：</dt>
                        <dd><input type="text" name="telNo" maxLength={20} placeholder="080-1234-5678" required /></dd>
                    </dl>
                    <dl>
                        <dt>住所　：</dt>
                        <dd><input type="text" name="address" placeholder="東京都〇〇区〇〇丁目〇〇番地" required /></dd>
                    </dl>
                    <dl>
                        <dt>メールアドレス　：</dt>
                        <dd><input type="email" name="email" placeholder="sample@gmail.com" required /></dd>
                    </dl>
                    <dl>
                        <dt>パスワード　：</dt>
                        <dd><input type="password" name="password" maxLength={20} placeholder="(20文字以内)" required /></dd>
                    </dl>
                    <button>登録</button>
                </form>
            </div>
        </>
    );
}
