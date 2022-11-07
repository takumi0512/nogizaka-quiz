
let list = document.querySelector("#list");
let h1 = document.querySelector("#h1");
let button = document.querySelector("#button");
let up = document.querySelector("#up");
let down = document.querySelector("#down");



//前のページからurlパラメーターで選択されたレベルとジャンルを取得
const url = new URL(window.location.href);
const params = url.searchParams;
let selectLevel = params.get("level");
let selectCategory = params.get("category");

console.log(selectLevel);
console.log(selectCategory);
// レベルを大文字に変換
const capitalLevel = {
    "level1":"レベル１",
    "level2":"レベル２",
    "level3":"レベル３",
    "level4":"レベル４",
    "level5":"レベル５",
}





// firebase

import {db} from "./myFirebase";
import {collection,getDocs,query,where} from "firebase/firestore";


if (selectCategory === null){
    // 選択されたレベルコレクションのドキュメントを全部表示する関数
    h1.innerHTML = capitalLevel[selectLevel] + "のクイズ一覧"
    removeButton(); //表示順選択ボタンを非表示にする関数
    levelFunction();
} else{
    // 選択されたカテゴリのドキュメントを全部のレベルコレクションから表示する関数
    h1.innerHTML = "ジャンル「" + selectCategory + "」のクイズ一覧"
    categoryFunction(true);
};






//一つのレベルコレクションから全部のドキュメントを表示させる関数
function levelFunction () {
    // 選ばれたレベルのコレクション全体を取得
    const collectionData = collection(db,selectLevel);
    console.log(collectionData);
    console.log(getDocs(collectionData));

    getDocs(collectionData).then((snapShot) => {
        //コレクション全体を配列で取得
        let collectionList = snapShot.docs.map((doc) => ({...doc.data() }))
        console.log(collectionList);
        
        // ドキュメントをそれぞれ取り出して表示させる
        collectionList.forEach((doc) => {
            console.log(doc);
            // 取り出したものを整えて画面に表示させる
            htmlCreate(doc);    
        });
    });
}




//指定したカテゴリのドキュメントを全部のレベルコレクションから表示する関数
function categoryFunction (reverse) {

    // 表示をレベルの昇順にするか降順にするか
    const levelBox = ["level1","level2","level3","level4","level5"]
    if (reverse === false ){levelBox.reverse()}


    // それぞれのレベルコレクションで指定した条件（カテゴリ）のドキュメントを取得する
    levelBox.forEach((i) => {
        // 指定した条件（カテゴリ）のドキュメントを取得する
        const collectionData = query(collection(db,i),where("category",'array-contains',selectCategory));
        console.log(collectionData);
        console.log(getDocs(collectionData));

        getDocs(collectionData).then((snapShot) => {
            //コレクション全体を配列で取得
            let collectionList = snapShot.docs.map((doc) => ({...doc.data() }))
            console.log(collectionList);
            
            // ドキュメントをそれぞれ取り出して表示させる
            collectionList.forEach((doc) => {
                console.log(doc);
                // 取り出したものを整えて画面に表示させる
                htmlCreate(doc);    
            });
        });

    });
};









// htmlとして画面に表示させる関数
let htmlCreate = (doc) => {
    // 要素全体のコンテナ
    let element = document.createElement("div");
    element.className = "element";

    // ユーザー名、レベル,ジャンル表示
    let metaBox = document.createElement("div");
    metaBox.className = "metaBox"
        // ユーザー名表示
        let newName = document.createElement("div");
        newName.className = "name";
        newName.innerHTML = "ユーザー名:  " + doc["name"];
        metaBox.appendChild(newName);
        // ジャンル表示
        let newCategory = document.createElement("div");
        newCategory.className = "category";
        newCategory.innerHTML = "ジャンル :  " + doc["category"];
        metaBox.appendChild(newCategory);
        //レベル表示,リンク付け
        let newLevel = document.createElement("a");
        newLevel.setAttribute("href",`./index3.html?level=${doc["level"]}`);
        newLevel.className = "level";
        newLevel.innerHTML = capitalLevel[doc["level"]];
        metaBox.appendChild(newLevel);
    element.appendChild(metaBox);

    // 問題表示
    let newQuestion = document.createElement("div");
    newQuestion.innerHTML = doc["question"];
    newQuestion.className = "question";
    element.appendChild(newQuestion);

    //隠していた答えをクリックで表示させる
    let newAnswer1 = document.createElement("div");
    newAnswer1.innerHTML = "答えを見る";
    newAnswer1.className = "accordion__title";
    let newAnswer2 = document.createElement("div");
    newAnswer2.innerHTML = doc["answer"];
    newAnswer2.className = "accordion__content";

    let newRefer = document.createElement("div");
    newRefer.className = "refer";
    newRefer.innerHTML = "出典: " + doc["refer"];
    newAnswer2.appendChild(newRefer);

    newAnswer1.addEventListener("click",() => {
        newAnswer1.classList.toggle("is-active");
        newAnswer2.classList.toggle("is-open");
    },false);
    element.appendChild(newAnswer1);
    element.appendChild(newAnswer2);



    // 要素全体をhtmlにぶっこむ
    list.appendChild(element);
}














// レベル表示順ボタンを非表示にする関数
function removeButton () {
    button.style.display = "none";
}




// 表示順ボタンをクリックされた時の挙動
// 今あるhtml要素を全部削除してからhtmlを再構築する
up.addEventListener("click",()=>{
    let elementList = document.querySelectorAll(".element")
    elementList.forEach(element => element.remove())
    categoryFunction(true);
})
down.addEventListener("click",()=>{
    let elementList = document.querySelectorAll(".element")
    elementList.forEach(element => element.remove())
    categoryFunction(false);
})