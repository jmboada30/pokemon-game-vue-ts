import pokemonApi from '../api/pokemonApi';
import { Pokemon } from '../interfaces/pokemon';

export const getPokemon = (): number[] => {
  const pokemonArr = Array.from(Array(40));
  return pokemonArr.map((_, index) => index + 1);
};

export const getPokemonNames = async (
  pokemons: number[]
): Promise<Pokemon[]> => {
  if (pokemons.length !== 4) throw 'Pokemons must be 4';

  const [a, b, c, d] = pokemons;
  const promiseArr = [
    pokemonApi.get('/' + a),
    pokemonApi.get('/' + b),
    pokemonApi.get('/' + c),
    pokemonApi.get('/' + d),
  ];

  const [p1, p2, p3, p4] = await Promise.all(promiseArr);

  return [
    { name: p1.data.name, id: p1.data.id },
    { name: p2.data.name, id: p2.data.id },
    { name: p3.data.name, id: p3.data.id },
    { name: p4.data.name, id: p4.data.id },
  ];
};

const getPokemonOptions = async () => {
  const mixedPokemon = getPokemon().sort(() => Math.random() - 0.5);
  const pokemons = await getPokemonNames(mixedPokemon.splice(0, 4));
  return pokemons;
};

export default getPokemonOptions;
