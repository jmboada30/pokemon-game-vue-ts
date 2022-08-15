<template>
  <div class="pokemon-container">
    <img
      v-if="!showPokemon"
      class="hidden-pokemon"
      :src="imgSrc"
      alt="pokemon"
    />
    <img v-else class="fade-in" :src="imgSrc" alt="pokemon" />
  </div>
</template>

<script setup lang="ts">
import usePokemons from '../composables/usePokemons';
const { showPokemon, imgSrc } = usePokemons();
</script>

<style scoped>
.pokemon-container {
  height: 200px;
}
img {
  height: 200px;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
}
.hidden-pokemon {
  filter: brightness(0);
}
</style>
