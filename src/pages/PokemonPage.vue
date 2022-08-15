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

<script src="./PokemonPage.ts"></script>

<style></style>
