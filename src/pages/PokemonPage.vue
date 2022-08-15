<template>
  <h1 v-if="!pokemon">Por favor espere...</h1>

  <div v-else>
    <h1>Quien es este Pokemon?</h1>
    <pokemon-picture
      :pokemonId="pokemon.id"
      :showPokemon="showPokemon"
    ></pokemon-picture>
    <pokemon-options
      :pokemons="pokemonArr"
      @selection="checkAnswer"
    ></pokemon-options>

    <template class="fade-in" v-if="showAnswer">
      <h2>{{ message }}</h2>
      <button @click="newGame">Nuevo juego</button>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import PokemonPicture from '../components/PokemonPicture.vue';
import PokemonOptions from '../components/PokemonOptions.vue';
import getPokemonOptions from '../helpers/getPokemonOptions';
import { Pokemon } from '../interfaces/pokemon';

const pokemonArr = ref<Pokemon[]>([]);
const pokemon = ref<Pokemon>();
const showPokemon = ref(false);
const showAnswer = ref(false);
const message = ref('');

const mixPokemonArray = async () => {
  pokemonArr.value = await getPokemonOptions();
  const randomId = Math.floor(Math.random() * 4);
  pokemon.value = pokemonArr.value[randomId];
};

const checkAnswer = (pokemonId: number) => {
  if (!pokemon.value) return;

  showPokemon.value = true;
  showAnswer.value = true;
  
  if (pokemonId === pokemon.value.id) {
    message.value = `Correcto, ${pokemon.value.name}`;
  } else {
    message.value = `Oops, era ${pokemon.value.name}`;
  }
};

const newGame = () => {
  pokemonArr.value = [];
  pokemon.value = undefined;
  showPokemon.value = false;
  showAnswer.value = false;
  message.value = '';
  mixPokemonArray();
};

mixPokemonArray();
</script>

<style></style>
