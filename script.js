const container=document.querySelector(".container");
const questionBox=document.querySelector(".question");
const choicesBox=document.querySelector(".choices");
const nextBtn=document.querySelector(".nextBtn");
const scoreCard=document.querySelector(".scoreCard");
const alert=document.querySelector(".alert");
const startBtn=document.querySelector(".startBtn");
const timer=document.querySelector(".timer");

const quiz=[
    {
        question:"Q. Which of the following is not a CSS box model property?",
        choices:["margin","padding","border-radius","border-collapse"],
        answer:"border-collapse"
    },
{
    question:"Q. Which of the following is not a valid way to declare a function in Javascript?",
    choices:["function myFunction() {}"," let myFunction=function() {};","myFunction: function() {}", "const myFunction = () => {};"],
    answer:"myFunction: function() {}"

},
{
    question:"Q. Which of the following is not a Javascript data type?",
    choices:["string","boolean","object","float"],
    answer:"float"
},
{
    question:"Q. What is the purpose of the this keyword in Javascript?",
    choices:["It refers to the current function.","It refers to the current object.","It refers to the parent object.", " It is used for comments."],
    answer:"It refers to the current object."
}
]

let currQuesInd=0;
let quizOver=false;
let score=0;
let timeLeft=15;
let timerId=null;
const showQues=()=>{
    const quesDetails=quiz[currQuesInd];
    questionBox.textContent=quesDetails.question;  

    choicesBox.textContent="";
    for(let i=0;i<quesDetails.choices.length;i++){
        const currChoice=quesDetails.choices[i];
        const choiceDiv=document.createElement("div");
        choiceDiv.textContent=currChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv); 

        choiceDiv.addEventListener('click',()=>{
            if(choiceDiv.classList.contains('selected')){
                choiceDiv.classList.remove('selected');
            }
            else choiceDiv.classList.add('selected');
        });
    }
    if(currQuesInd<quiz.length) startTimer();
}

//function to check answers
const checkAns=()=>{
    const selectedChoice=document.querySelector('.choice.selected');
    if(selectedChoice.textContent===quiz[currQuesInd].answer){
        displayAlert("Correct Answer!");
        alert.style.backgroundColor="#5d9b63";
        score++;
    }
    else {
        displayAlert(`Wrong Answer! ${quiz[currQuesInd].answer} is the Correct Answer`);
        alert.style.backgroundColor="#ec4755";
    }
    timeLeft=15;
    currQuesInd++;
    if(currQuesInd<quiz.length){
        showQues();
    }
    else {
        showScore();
        stopTimer();
    }
}

//function to stop timer
const showScore=()=>{
    questionBox.textContent="";
    choicesBox.textContent="";
    scoreCard.textContent=`You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    alert.style.backgroundColor="#5d9b63";
    nextBtn.textContent="Play Again"
    quizOver=true;
    timer.style.display="none";
}

//function to show alert
const displayAlert=(msg)=>{
    alert.style.display="block";
    alert.textContent=msg;
    setTimeout(()=>{
        alert.style.display="none";
    },2000);
}

//function to show timer
const startTimer=()=>{
    clearInterval(timerId);
    timer.textContent=timeLeft;
    const countDown=()=>{
        timeLeft--;
        timer.textContent=timeLeft;
        if(timeLeft===0){
            const confirmUser=confirm("Time Up!!! Do you want to play the quiz again");
            if(confirmUser){
                timeLeft=15;
                startQuiz();
            }
            else{
                startBtn.style.display="block";
                container.style.display="none"; 
            }
        }
    }
    timerId =setInterval(countDown,1000);
}

//function to stop timer
const stopTimer=()=>{
    clearInterval(timerId);
}

//function to shuffle question
const shuffleQues=()=>{
    for(let i=quiz.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        [quiz[i],quiz[j]]=[quiz[j],quiz[i]];
    }
    currQuesInd=0;
    showQues();
}

//function to start quiz
const startQuiz=()=>{
    timeLeft=15;
    timer.style.display="flex";
    shuffleQues();
}
startBtn.addEventListener("click",()=>{
    startBtn.style.display="none";
    container.style.display="block";
    startQuiz();
});
nextBtn.addEventListener("click",()=>{
    const selectedChoice=document.querySelector('.choice.selected');
    if(!selectedChoice && nextBtn.textContent!=="Play Again") {
        displayAlert("Select your answer!");
        alert.style.backgroundColor="#ec4755";
    }
    if(quizOver){
        currQuesInd=0;
        nextBtn.textContent="Next";
        scoreCard.textContent="";
        quizOver=false;
        score=0;
        startQuiz();
    }
    else checkAns();
});


