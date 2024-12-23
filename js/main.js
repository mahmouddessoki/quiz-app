import { Quiz } from './quiz.js'
const category = document.getElementById("category")
const difficulty = document.getElementById("difficulty")
const amount = document.getElementById("amount")
let quizForm = document.getElementById("quiz-specification-form")

export let questions;
export let quiz;
document.forms[0].addEventListener('submit', async function (e) {
    e.preventDefault()
    if (validateAmount()) {
        quiz = new Quiz(category.value, difficulty.value, amount.value)
        questions = await quiz.getQuestions()
        console.log(questions);
        
        if (quiz.start()) {
            quizForm.classList.add("d-none")
            toastr.success('Quiz Started Successfully')
        }else {
            toastr.error('No Quiz Available with the given specification')

        }

    } else {
        toastr.error('Please Enter Number Of Questions ');
    }

})

function validateAmount() {
    let flag = false
    if (amount.value >= 1) {
        amount.classList.add("is-valid")
        amount.classList.remove("is-invalid")
        flag = true

    } else {
        amount.classList.add("is-invalid")
        amount.classList.remove("is-valid")

    }
    return flag
}
amount.addEventListener('input', validateAmount)

