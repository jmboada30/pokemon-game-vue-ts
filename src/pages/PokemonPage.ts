import { defineComponent, ref } from 'vue';

import PokemonPicture from '../components/PokemonPicture.vue';
import PokemonOptions from '../components/PokemonOptions.vue';
import getPokemonOptions from '../helpers/getPokemonOptions';
import { Pokemon } from '../interfaces/pokemon';

export default defineComponent({
  name: 'PokemonPage',
  components: {
    PokemonOptions,
    PokemonPicture,
  },
  setup: () => {
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
