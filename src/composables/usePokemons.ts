import { usePokemonStore } from '../stores/pokemonStore';
import getPokemonOptions from '../helpers/getPokemonOptions';
import { storeToRefs } from 'pinia';

const usePokemons = () => {
  const pokemonStore = usePokemonStore();
  const { pokemonArr, pokemon, showPokemon, showAnswer, message } =
    storeToRefs(pokemonStore);

  const mixPokemonArray = async () => {
    pokemonStore.loadPokemons(await getPokemonOptions());
    const randomId = Math.floor(Math.random() * 4);
    pokemonStore.setHiddenPokemon(pokemonArr.value[randomId]);
  };

  const checkAnswer = (pokemonId: number) => {
    if (!pokemon.value) return;

    pokemonId === pokemon.value.id
      ? pokemonStore.showPokemonAndAnswer(`Correcto, ${pokemon.value.name}`)
      : pokemonStore.showPokemonAndAnswer(`Oops, era ${pokemon.value.name}`);
  };

  const newGame = () => {
    pokemonStore.clearState();
    mixPokemonArray();
  };

  return {
    //* Properties
    message,
    pokemon,
    pokemonArr,
    showAnswer,
    showPokemon,

    //* Methods
    checkAnswer,
    mixPokemonArray,
    newGame,
  };
};

export default usePokemons;
