<template>
  
  <link rel="stylesheet" href="./assets/style.scss">
  <template v-if="this.question"> 
    <h1 v-html="this.question" class="questionTitle">
    </h1>

    <template v-for="(answer, index) in this.answers" :key="index">
      <it-button type="primary" v-html="answer" round></it-button><br>
    </template>
    <it-button type="primary" pulse outlined>Envoyer</it-button>
  </template>

</template>



<script>

export default {
  name: 'App',
  data() {
    return {
      question: undefined,
      correctAnswer: undefined,
      wrongAnswers: undefined
    }
  },

  computed: {
    answers() {
      var allAnswers = JSON.parse(JSON.stringify(this.wrongAnswers));
      allAnswers.splice(Math.round(Math.random() * allAnswers.length), 0, this.correctAnswer)
      return allAnswers
      }
  },

  created() {
    this.axios.get("https://opentdb.com/api.php?amount=1&category=18")
      .then((response =>{
        console.log(response.data.results[0])
        this.question = response.data.results[0].question
        this.correctAnswer = response.data.results[0].correct_answer
        this.wrongAnswers = response.data.results[0].incorrect_answers
      }))
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

  .it-btn--round {
    margin: 10px 4px;
    display:inline;
    width:300px;
  }
  
}

</style>

