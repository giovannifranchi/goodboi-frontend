<template>
  <div>
    <h1 class="position-relative">{{ currentText }}<span class="position-absolute">{{ pipe }}</span></h1>
  </div>
</template>

<script>
export default {
  name: "AutoTypingComponent",

  data() {
    return {
      text: ["BadBoi", "GoodBoi"],

      currentText: "",
      pipe: '|'
    };
  },

  mounted() {
    const firstWordArr = this.text[0].split("");
    const secondWordArr = this.text[1].split("");

    let isDoneFirst = false;

    let i = 0;

    let isPipe = true;

    let pipeInerval = setInterval(() => {

      isPipe ? this.pipe = '' : this.pipe = '|';
      isPipe ? isPipe = false : isPipe = true;
      
    }, 500);

    let interval = setInterval(()=>{


        this.currentText += firstWordArr[i];

        i++

        if(i === firstWordArr.length){
            clearInterval(interval);
            clearInterval(pipeInerval);
        }




    }, 1000)


  },
};
</script>

<style lang="scss" scoped></style>
