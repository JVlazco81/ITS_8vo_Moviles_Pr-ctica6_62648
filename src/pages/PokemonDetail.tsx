import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const infoFields = ['ID', 'Altura', 'Peso', 'Tipos', 'Descripción'];

export const PokemonDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [pokemon, setPokemon] = useState<any>(null);
  const [description, setDescription] = useState(''); // nueva descripción
  const [infoIndex, setInfoIndex] = useState(0);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));

    fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
      .then((res) => res.json())
      .then((data) => {
        const entry = data.flavor_text_entries.find((e: any) => e.language.name === 'es') ||
                      data.flavor_text_entries.find((e: any) => e.language.name === 'en');
        const cleanText = entry
            ? entry.flavor_text.replace(/[\n\f]/g, ' ').replace(/\s+/g, ' ')
            : 'Descripción no disponible';
        const shortText = cleanText.length > 70 ? cleanText.slice(0, 47) + '...' : cleanText;
        setDescription(shortText);
      });
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

  const infoValues = [
    pokemon.id,
    pokemon.height,
    pokemon.weight,
    pokemon.types.map((t: any) => t.type.name).join(', '),
    description && description.length > 0 ? description : 'Descripción no disponible',
  ];

  return (
    <div className="font-pokemon text-xs !m-2 !p-2 border-3 border-double border-black rounded-md h-[calc(100%-1rem)] overflow-hidden">
      <div className="grid grid-cols-[1fr_1.4fr] gap-2 h-full">
        <div className="flex items-center justify-center">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} className="max-h-24" />
        </div>
        <div className="flex flex-col justify-between">
          <div className="text-center mb-2 text-xs capitalize truncate w-full">{pokemon.name}</div>
          <div className="text-center rounded p-2 flex-1 flex flex-col justify-center">
            <div>
              <strong>{infoFields[infoIndex]}:</strong> {infoValues[infoIndex]}
            </div>
          </div>
          <div className="flex justify-between mt-1">
            <span>{infoIndex > 0 ? '<' : ''}</span>
            <span>{infoIndex < infoFields.length - 1 ? '>' : ''}</span>
          </div>
        </div>
      </div>
    </div>
  );
};