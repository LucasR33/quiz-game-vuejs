<template>
    <section class="score">
        Player <span>{{playerScore}}</span> x <span>{{computerScore}}</span> Computer
    </section>
</template>

<script>
export default {
    props: {
        playerScore: Number,
        computerScore: Number
    }

}
</script>

<style lang="scss">
section.score {
    border-bottom: 1px solid black;
    padding: 24px;
    font-size: 18px;

    span {
        padding: 8px;
        font-weight: bold;
        border: 1px solid black;
    }
}

</style>