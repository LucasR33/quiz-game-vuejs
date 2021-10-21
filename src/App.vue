<template>
  
  <ScoreBoard :playerScore="this.playerScore" :computerScore="this.computerScore"/>

  <template v-if="this.question"> 
    <h1 v-html="this.question" class="questionTitle">
    </h1>

    <template v-for="(answer, index) in this.answers" v-bind:key="index">
      <input 
      :disabled="this.answerSubmitted"
      type="radio" 
      name="options"
      :value="answer"
      v-model="this.chosenAnswer">

      <label v-html="answer"></label><br>
    </template>

    <it-button v-if="!this.answerSubmitted" type="primary" pulse outlined @click="this.submitAnswer()">Submit</it-button>

    <section v-if="this.answerSubmitted">
      <it-alert v-if="this.chosenAnswer == this.correctAnswer" iconbox type="success" title="GJ" body="Correct answer"/>
      <it-alert v-else iconbox type="danger" title="BJ" :body="'Wrong answer ' + this.correctAnswer"/>
      <it-button type="primary" pulse outlined @click="this.getNewQuestion()">Next Question</it-button>
    </section>
  
  </template>

</template>


<script>
import ScoreBoard from '@/components/ScoreBoard.vue'

export default {

  name: 'App',
  components: {
    ScoreBoard
  },

  data() {
    return {
      question: undefined,
      correctAnswer: undefined,
      wrongAnswers: undefined,
      chosenAnswer: undefined,
      answerSubmitted: false,
      playerScore: 0,
      computerScore: 0
    }
  },

  computed: {
    answers() {
      var allAnswers = JSON.parse(JSON.stringify(this.wrongAnswers));
      allAnswers.splice(Math.round(Math.random() * allAnswers.length), 0, this.correctAnswer)
      return allAnswers
      }
  },

  methods: {
    submitAnswer() {
      if(!this.chosenAnswer) {
        alert("Pick an answer")
      } else {
        if(this.chosenAnswer == this.correctAnswer) {
          this.playerScore ++
          this.answerSubmitted = true;
        } else {
          this.computerScore ++
          this.answerSubmitted = true;
        }
      }
    },
    getNewQuestion() {
      this.answerSubmitted = false
      this.chosenAnswer = undefined
      this.question = undefined
      this.axios.get("https://opentdb.com/api.php?amount=1&category=18")
      .then((response =>{
        this.question = response.data.results[0].question
        this.correctAnswer = response.data.results[0].correct_answer
        this.wrongAnswers = response.data.results[0].incorrect_answers
      }))
    },
  },

  created() {
    this.getNewQuestion()
  }

}
</script>

<style lang="scss">

#app {
  text-align: center;
  margin-top: 160px auto;

  .it-btn {
    margin:20px;
    display:inline;
  }
}

</style>

