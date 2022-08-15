import { defineComponent } from 'vue';

import PokemonPicture from '../components/PokemonPicture.vue';
import PokemonOptions from '../components/PokemonOptions.vue';
import getPokemonOptions from '../helpers/getPokemonOptions';
import { usePokemonStore } from '../stores/pokemonStore';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'PokemonPage',
  components: {
    PokemonOptions,
    PokemonPicture,
  },
  setup: () => {
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

    mixPokemonArray();

    return {
      //* Properties
      pokemonArr,
      pokemon,
      showPokemon,
      showAnswer,
      message,

      //* Methods
      mixPokemonArray,
      checkAnswer,
      newGame,
    };
  },
});
