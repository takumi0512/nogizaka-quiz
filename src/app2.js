let userName = document.getElementById("user");
let level = document.querySelector("#level");
let category = document.querySelectorAll("input[name='category']");
let question = document.querySelector("#question");
let answer = document.querySelector("#answer");
let refer = document.querySelector("#refer");
let checkButton = document.getElementById("button");

let today = new Date();


// 投稿ボタンが押されたら最初にする処理をまとめた関数
let categoryList = []
const init = () =>{
    // ユーザー名が入力されていなかったら名無しにする
    if (userName.value === "") {
        userName.value = "名無し"
    }

    // 選択されたジャンルをリストにする
    for (let i = 0; i<category.length; i++){
        if(category[i].checked){
            categoryList.push(category[i].value);
        }
    }
}




// 投稿ボタンを押された時の処理

checkButton.addEventListener("click", async() => {
    init()
    // 必須項目が入力されているかチェックする
    if(categoryList.length === 0 || question.value === "" || answer.value === ""){
        categoryList = []
        alert("必須項目は全て入力して下さい")
    } else{
        await setDocFunction();
        location.href = "./index.html"
    }
},false);








// firebase

import {db} from "./myFirebase"
import { doc, setDoc} from "firebase/firestore"

const setDocFunction = async() => {
    let ident = String(today.getFullYear())+"."+String(today.getMonth()+1)+String(today.getDate())+"."+String(today.getHours())+":"+String(today.getMinutes())+":"+String(today.getSeconds());
   
    const submit = await setDoc(doc(db,level.value,ident),{
        name: userName.value,
        level: level.value,
        category: categoryList,
        question: question.value,
        answer: answer.value,
        refer: refer.value,
    }).then(()=>{
        console.log("成功");
        alert("投稿が完了しました");
    }).catch((e => {
        console.log("失敗");
        alert("投稿に失敗しました");
    }))
    console.log("firebase完了")
};




