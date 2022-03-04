<template>
  <div class="eingabe">
    <input type="text" v-model="inputText" />
    <p>
      <b>Number letters:</b>
      <span>{{ letters }}</span>
    </p>
    <p>
      <b>Number spaces:</b>
      <span>{{ spaces }}</span>
    </p>
    <p>
      <b>Number words:</b>
      <span>{{ words }}</span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'eingabe',
  data() {
    return {
      inputText: "",
      letters: 0,
      spaces: 0,
      words: 0
    }
  },
  methods: {},
  watch: {
    inputText(val) {
      if (val === '') {
        this.letters = 0;
        this.spaces = 0;
        this.words = 0;
      } else {
        let numberWords = 0;
        let numberLetters = 0;
        const words = val.split(" ");
        for (let char of val) {
          if (char != "" && /^[a-zA-Z]+$/.test(char)) {
            numberLetters++;
          }
        }
        for (let word of words) {
          if (word != "") {
            numberWords++;
          }
        }
        this.letters = numberLetters;
        this.spaces = words.length - 1;
        this.words = numberWords;
      }
    }
  }
}
</script>

<style scoped>
.eingabe {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 22px;
  margin: 30px auto;
  background: #ddd;
  width: fit-content;
  -webkit-box-shadow: 0 0 10px 0 rgb(0 0 0 / 50%);
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 50%);
}
input {
  margin-bottom: 5px;
}
p {
  margin: 15px 0 0;
}
span {
  float: right;
}
@media (min-width: 768px) {
  .eingabe {
    margin-right: 30px;
    display: inline-block;
  }
}
</style>
