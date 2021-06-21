var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

import { AllPokes, Pokemon, Form, Spaces } from './Interfaces';

export const getData = async (difference: boolean, pokemonID: number) => {
  const allPoke: AllPokes = await P.getPokemonsList();
  const ID = difference ? Math.round(Math.random() * allPoke.count) : pokemonID;
  const Poke: Pokemon = await P.getPokemonByName(allPoke.results[ID].name);
  let PokeData: Spaces | Form;
  try {
    const PokeSpaces: Spaces = await P.getPokemonSpeciesByName(
      Poke.forms[0].name
    );
    PokeData = PokeSpaces;
  } catch (error) {
    const PokeForm: Form = await P.getPokemonFormByName(Poke.forms[0].name);
    PokeData = PokeForm;
  }
  return { PokeData, ID };
};