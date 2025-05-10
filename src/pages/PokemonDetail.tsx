import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const infoFields = ['ID', 'Altura', 'Peso', 'Tipos'];

export const PokemonDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<any>(null);
  const [infoIndex, setInfoIndex] = useState(0); // controla qué info se muestra

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }, [name]);

  useEffect(() => {
    (window as any).pokedexDetailNavigation = {
      prevInfo: () => {
        setInfoIndex((prev) => Math.max(prev - 1, 0));
      },
      nextInfo: () => {
        setInfoIndex((prev) => Math.min(prev + 1, infoFields.length - 1));
      },
    };
    return () => {
      delete (window as any).pokedexDetailNavigation;
    };
  }, []);

  if (!pokemon) {
    return (
      <div className="font-pokemon text-xs m-2 p-2 border-3 border-double border-black rounded-md h-[calc(100%-1rem)] flex items-center justify-center">
        Cargando...
      </div>
    );
  }

  // Preparar los datos
  const infoValues = [
    pokemon.id,
    pokemon.height,
    pokemon.weight,
    pokemon.types.map((t: any) => t.type.name).join(', '),
  ];

  return (
    <div className="font-pokemon text-xs !m-2 !p-2 border-3 border-double border-black rounded-md h-[calc(100%-1rem)] overflow-hidden">
        <div className="grid grid-cols-[1fr_1.4fr] gap-2 h-full">
        <div className="flex items-center justify-center">
            <img src={pokemon.sprites.front_default} alt={pokemon.name} className="max-h-32" />
        </div>
        <div className="flex flex-col justify-between">
            <div className="text-center mb-2 text-xs capitalize truncate w-full">{pokemon.name}</div>
            <div className="text-center rounded p-2 flex-1 flex flex-col justify-center">
            <div>
                <strong>{infoFields[infoIndex]}:</strong> {infoValues[infoIndex]}
            </div>
            </div>
            <div className="flex justify-between mt-1">
            <span>{infoIndex > 0 ? '<<' : ''}</span>
            <span>{infoIndex < infoFields.length - 1 ? '>>' : ''}</span>
            </div>
        </div>
        </div>
    </div>
    );
};