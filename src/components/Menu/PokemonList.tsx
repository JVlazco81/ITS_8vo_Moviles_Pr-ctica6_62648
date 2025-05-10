import React, { useEffect, useState } from "react";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Pokemon {
  name: string;
  url: string;
}

export const PokemonList: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [offset, setOffset] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 7;

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemons(data.results);
        setIsLoading(false);
        setSelectedIndex(0); // siempre reinicia el índice al cargar nueva página
      });
  }, [offset]);

  useEffect(() => {
    (window as any).pokedexListNavigation = {
        prevPage: handleMoveUp,
        nextPage: handleMoveDown,
        prevBlock: () => {
        if (isLoading) return;
        if (offset > 0) {
            setOffset(Math.max(offset - limit, 0));
        }
        },
        nextBlock: () => {
        if (isLoading) return;
        setOffset(offset + limit);
        },
    };
    return () => {
        delete (window as any).pokedexListNavigation;
    };
  }, [selectedIndex, offset, pokemons, isLoading]);

  useEffect(() => {
    (window as any).currentPokemonList = pokemons;
    (window as any).currentSelectedIndex = selectedIndex;
  }, [pokemons, selectedIndex]);

  const handleMoveUp = () => {
    if (isLoading) return; // bloquear mientras carga
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    } else if (offset > 0) {
      setOffset(offset - limit);
    }
  };

  const handleMoveDown = () => {
    if (isLoading) return; // bloquear mientras carga
    if (selectedIndex < pokemons.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    } else {
      setOffset(offset + limit);
    }
  };

  return (
    <div className="font-pokemon text-xs !m-2 !p-2 border-3 border-double border-black rounded-md h-[calc(100%-1rem)] overflow-hidden">
      <ul className="flex flex-col justify-between h-full">
        {(isLoading ? Array.from({ length: limit }) : pokemons).map((_, index) => (
          <li
            key={index}
            className="flex flex-row items-center justify-between w-full"
          >
            <FontAwesomeIcon
              className={`${
                (!isLoading && selectedIndex === index) || (isLoading && index === 0)
                  ? ""
                  : "!hidden"
              }`}
              icon={faCaretRight}
            />
            <span className="w-5"></span>
            <span className="w-10 text-right">
              {offset + index + 1}
            </span>
            <span className="flex-1 text-center truncate">
              {isLoading
                ? "[loading]"
                : pokemons[index]?.name.charAt(0).toUpperCase() +
                  pokemons[index]?.name.slice(1)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};