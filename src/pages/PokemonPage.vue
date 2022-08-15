<template>
  <h1 v-if="!pokemon">Por favor espere...</h1>

  <div v-else>
    <h1>¿Quien es este Pokemon?</h1>
    <pokemon-picture></pokemon-picture>
    <pokemon-options></pokemon-options>

    <template class="fade-in" v-if="showAnswer">
      <h2>{{ message }}</h2>
      <button @click="newGame">Nuevo juego</button>
    </template>
  </div>
</template>

<script lang="ts" setup>
import usePokemons from '../composables/usePokemons';
import PokemonPicture from '../components/PokemonPicture.vue';
import PokemonOptions from '../components/PokemonOptions.vue';

const {
  pokemonArr,
  pokemon,
  showPokemon,
  showAnswer,
  message,
  mixPokemonArray,
  checkAnswer,
  newGame,
} = usePokemons();

mixPokemonArray();
</script>
