import { questions } from './main.js';
import { quiz } from './main.js';
let quizCon = document.getElementById("quiz-question")

export class Question {
    constructor(index) {
        this.index = index
        this.category = questions[this.index].category
        this.correct_answer = questions[this.index].correct_answer
        this.incorrect_answers = questions[this.index].incorrect_answers;
        this.choices = [this.correct_answer, ...this.incorrect_answers].sort()
        this.question = questions[this.index].question
        this.lengthOfAll = questions.length;
        this.answered = false;
    }


    displayQuestion() {
        let cartoona = `
        <div class="question-container bg-white p-3 animate__animated animate__bounceInUp col-lg-8 col-12 mx-auto rounded-2 shadow">
            <div id="quiz-question-header" class="d-flex justify-content-between">
                        <div id="category" class="rounded-2">
                            <p class="text-capitalize p-2 mb-0 text-center text-white">${this.category}</p>
                        </div>
                        <div id="question-order" class="rounded-2">
                            <p class="text-capitalize p-2 mb-0 text-center text-white">${this.index + 1} of ${this.lengthOfAll}</p>
                        </div>
                    </div>
                    <div id="question-text" class="text-center my-4">
                        <p>${this.question}</p>
                    </div>
                    <div id="question-choices">
                        <ul class="list-unstyled d-flex  row-gap-3 align-items-center flex-wrap
                        justify-content-between">

                        ${this.choices.map(function (choice) {
                        return `<li class="text-center text-capitalize" >${choice}</li>`
                    }).join("")}
                            
                            

                        </ul>
                    </div>
                </div>
        
        
        `
        quizCon.innerHTML = cartoona
        let allQuestionChoices = document.querySelectorAll('#question-choices li')
        for (let i = 0; i < allQuestionChoices.length; i++) {
            allQuestionChoices[i].addEventListener("click", (e) => {
                this.checkAnswer(e.target)

            })

        }




    }


    checkAnswer(target) {
        if (this.answered) {
            return;
        }
        if (target.innerHTML == this.correct_answer) {
            target.classList.add("true-answer")
            quiz.score++
        } else {
            target.classList.add("wrong-answer")

        }
        this.index++;
        setTimeout(() => {
            this.getNextQuestion()
        }, 1500);
        this.answered = true

        this.animateOut(target)
    }

    animateOut(target) {
        target.closest('.question-container').classList.remove("animate__bounceInUp")
        target.closest('.question-container').classList.add("animate__lightSpeedOutLeft")

    }
   
    getNextQuestion() {
        if (this.index < this.lengthOfAll) {
            let newQ = new Question(this.index)
            newQ.displayQuestion()
            

        } else {
            this.Finish()
        }
    }
    Finish() {

        quizCon.innerHTML = `
        

            <div id="quiz-result" class="text-center">
                <p class="text-capitalize text-white">Your Score is ${quiz.score}</p>
                <button id="tryAgain" class="btn btn-danger text-capitalize fs-5 p-2 " >try again</button>

            </div>
        `
        document.getElementById("tryAgain").addEventListener('click', function () {
            quiz.score = 0
            window.location.href = "./index.html"

        })
    }
}