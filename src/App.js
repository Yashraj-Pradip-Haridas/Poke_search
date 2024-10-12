// src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonList from "./components/PokemonList";
import SearchBar from "./components/SearchBar";
import "./App.css";

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=100"
      );
      const pokemonData = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const pokemonDetails = await axios.get(pokemon.url);
          return pokemonDetails.data;
        })
      );
      setPokemons(pokemonData);
    };
    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Pokémon List</h1>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PokemonList pokemons={filteredPokemons} />
    </div>
  );
};

export default App;
