// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

let categories = [20,80];
const gameTable = $("#gameTable")
let newGame;
const loadingGif = "https://media2.giphy.com/media/3o7bu3XilJ5BOiSGic/giphy.gif?cid=ecf05e47wneadtgy1ydrc37zzh21cneondlp196z2xj2kff9&rid=giphy.gif&ct=g";
const mainDiv = $("#gameContainer");
const questionImg = "https://cdn.pixabay.com/photo/2012/04/13/00/17/question-mark-31190_960_720.png";

class clue{
    constructor(clue,answer){
        this.clue = clue;
        this.answer = answer;
        this.clicked = false;
    }
}
class myGame{
    constructor(clueArray){
        this.categories = categories;
        this.clueArray = clueArray;
    }
    createTable(){
        for(let cats of this.clueArray){
            let newDiv = document.createElement("div");
                newDiv.innerHTML = cats[0].cat;
                let newData = document.createElement("th")
                newData.append(newDiv);
                $(`#rowHead`).get(0).append(newData);
            for(let i = 1;i<7;i++){
                let newDiv = document.createElement("div");
                let thisclue = new clue(cats[i-1].clueText,cats[i-1].answerText);
                let aImg = document.createElement('img');
                aImg.classList = "buttonImg";
                aImg.src = questionImg;
                newDiv.append(aImg);
                newDiv.classList = "tableEl";
                newDiv.addEventListener('click',function(evt){
                    if(thisclue.clicked == false){
                        newDiv.innerHTML = cats[i-1].clueText;
                        thisclue.clicked = true;
                    } else{
                        newDiv.innerHTML = cats[i-1].answerText;
                    }
                })
                let newRow = document.createElement("td")
                newRow.append(newDiv);
                let thisRow = $(`#row${i}`).get(0);
                thisRow.append(newRow);
                console.log("did loop");
            }
        }
    }
}
/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
    let cats = await axios.get(`https://jservice.io/api/categories?count=20&offset=${Math.floor(Math.random()*800)}`)
    let iter = [];
    categories = [];
    for(let i = 0; i <6;i++){
        let newNum = Math.floor(Math.random()*20);
        while(iter.includes(newNum)){
            newNum = Math.floor(Math.random()*20);
        }
        iter[i]=newNum;
    }
    for(let i = 0; i < 6;i++ ){
    categories.push([cats.data[iter[i]].id])
    }
    return categories;
}

async function getClues(ids){
    let theRe = [];
    let used = [];
    console.log(ids);
    for(let i =0;i<6;i++){
        let newA = [];
        let clues =  await axios.get(`https://jservice.io/api/category?id=${ids[i]}`);
        let cluesArray = clues.data;
        console.log(cluesArray);
        //return cluesArray;
        used = [];
        for(let i =0;i<6;i++){
            let checkNum;
            checkNum = Math.floor(Math.random()*cluesArray.clues.length);
            let infPrev = 0;
            while(used.includes(checkNum) && infPrev < 10){
                checkNum = Math.floor(Math.random()*cluesArray.clues.length);
                infPrev++;
            }
            let newClue = cluesArray.clues[checkNum];
            newA.push({cat: cluesArray.title, clueText: newClue.question, answerText: newClue.answer});
            used.push(checkNum);
        }
        theRe.push(newA);
    }
    return theRe;
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

function getCategory(catId) {
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {

}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
}

async function startGame(){
    $(`#rowHead`).get(0).innerHTML = "";
    for(let i = 1;i<7;i++){
        $(`#row${i}`).get(0).innerHTML = "";
    }
    let newImg = $(`<img class="center-block" src=${loadingGif}>`)
    mainDiv.append(newImg);
    let pooOnMe = await getCategoryIds();
    let arr = await getClues(categories);
    newGame = new myGame( arr);
    newGame.createTable();
    newImg.remove();
}

/** On click of start / restart button, set up game. */

// TODO

/** On page load, add event handler for clicking clues */

$("#startButton").get(0).addEventListener('click',function(evt){
    evt.target.innerHTML="Reset Game";
    startGame();
})