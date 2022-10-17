<script setup lang="ts">
import { ref, computed, watch } from "vue";

const name = "Vue dinamico";
const style = "color: blue";
const arrayColors = ["blue", "red", "yellow"];
const arrayFruits = ["🍊", "🍌", "🍋"];
const activo = false;
const arrayFrutas = [
  {
    name: "Manzana",
    price: " $ 9.30",
    description: "Una manzana",
    stock: 0,
  },
  {
    name: "Pera",
    price: " $ 9.30",
    description: "Una pera",
    stock: 0,
  },
  {
    name: "Fresa",
    price: " $ 9.30",
    description: "Una fresa",
    stock: 3,
  },
];
const click = () => alert("jajaja");
const counter = ref(0);

const increment = () => counter.value++;
const decrement = () => counter.value--;
const reset = () => (counter.value = 0);
const classCounter = computed(() => {
  if (counter.value === 0) return "zero";
  if (counter.value < 0) return "negative";
  return "positive";
});
// App de preguntas
const question = ref("");
const answer = ref("Questions usually contain a question mark. ;-)");

// watch works directly on a ref
watch(question, async (newQuestion) => {
  if (newQuestion.indexOf("?") > -1) {
    answer.value = "Thinking...";
    try {
      const res = await fetch("https://yesno.wtf/api");
      answer.value = (await res.json()).answer;
    } catch (error) {
      answer.value = "Error! Could not reach the API. " + error;
    }
  }
});
</script>

<template>
  <h1>Hola {{ name.toLocaleUpperCase() }}</h1>
  <h2>{{ arrayColors }}</h2>
  <h2 :style="style">soy azul</h2>
  <h2>{{ activo ? "Estoy activo" : "Estoy inactivo" }}</h2>
  <p v-if="!activo">Hi</p>
  <ul>
    <li v-for="(fruit, index) in arrayFruits" :key="fruit">
      {{ index }}-{{ fruit }}
    </li>
  </ul>
  <ul>
    <template v-for="(fruit, index) in arrayFrutas" :key="index">
      <li v-if="fruit.stock > 0">
        <h1>{{ fruit.name }}</h1>
        <h4>{{ fruit.price }}</h4>
        <p>{{ fruit.description }}</p>
      </li>
    </template>
  </ul>
  <button @click="click">ajaja</button>
  <p :class="classCounter">{{ counter }}</p>
  <button @click="increment()">Incrementar</button>
  <button @click="decrement()">Decrementar</button>
  <button @click="reset()">Resetear</button>
  <hr />
  <p>
    Ask a yes/no question:
    <input v-model="question" />
  </p>
  <p>{{ answer }}</p>
</template>

<style>
h1 {
  color: red;
}
.positive {
  color: blue;
}
.zero {
  color: yellow;
}
.negative {
  color: red;
}
</style>
