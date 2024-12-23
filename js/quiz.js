import { Question } from './question.js'
export class Quiz {
    constructor(category, difficulty, amount) {
        this.category = category;
        this.difficulty = difficulty;
        this.amount = amount;
        this.score = 0;
        this.questions = []
    }

    async getQuestions() {
        let cat = (this.category != 'any')
        let dif = (this.difficulty != 'any')
        let data = await fetch(`https://opentdb.com/api.php?amount=${this.amount}${cat ? `&category=${this.category}` : ''}${dif ? `&difficulty=${this.difficulty}` : ''}`)
        let resp = await data.json();
        this.questions = resp.results;

        return this.questions;

    }

    start() {
        if (this.questions.length == 0) {
            return false
        } else {
            let q = new Question(0)
            q.displayQuestion()
            return true
        }
    }


}