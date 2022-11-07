let userName = document.getElementById("user");
let level = document.querySelector("#level");
let category = document.querySelectorAll("input[name='category']");
let question = document.querySelector("#question");
let answer = document.querySelector("#answer");
let refer = document.querySelector("#refer");
let checkButton = document.getElementById("button");




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

checkButton.addEventListener("click",() => {
    init()
    // 必須項目が入力されているかチェックする
    if(categoryList.length === 0 || question.value === "" || answer.value === ""){
        categoryList = []
        alert("必須項目は全て入力して下さい")
    } else{
        setDocFunction();
        alert("投稿が完了しました")
        location.href = "./index.html"
    }
},false);








// firebase

import {db} from "./myFirebase"
import { doc, setDoc} from "firebase/firestore"

const setDocFunction = () => {
    let ident = "D" + String(Math.floor(Math.random()*100000000));
    console.log(ident);
    console.log(userName.value);
    console.log(level.value);
    console.log(categoryList);
    console.log(question.value);
    console.log(answer.value);
    console.log(refer.value);

    setDoc(doc(db,level.value,ident),{
        name: userName.value,
        level: level.value,
        category: categoryList,
        question: question.value,
        answer: answer.value,
        refer: refer.value,
    });
    console.log("firebase完了")
};







// 実験用

const checkfunction = () =>{
    setDoc(doc(db,"users","checkfunction"),{
        name: userName.value,
        level: level.value,
        category: categoryList,
        question: question.value,
        answer: answer.value,
        refer: refer.value,
    });
};

checkfunction();