import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const infoFields = ['ID', 'Costo', 'Efecto'];

export const ItemDetail: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [item, setItem] = useState<any>(null);
  const [infoIndex, setInfoIndex] = useState(0);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/item/${name}`)
      .then((res) => res.json())
      .then((data) => setItem(data));
  }, [name]);

  useEffect(() => {
    (window as any).itemDetailNavigation = {
      prevInfo: () => {
        setInfoIndex((prev) => Math.max(prev - 1, 0));
      },
      nextInfo: () => {
        setInfoIndex((prev) => Math.min(prev + 1, infoFields.length - 1));
      },
    };
    return () => {
      delete (window as any).itemDetailNavigation;
    };
  }, []);

  if (!item) {
    return (
      <div className="font-pokemon text-xs m-2 p-2 border-3 border-double border-black rounded-md h-[calc(100%-1rem)] flex items-center justify-center">
        Cargando...
      </div>
    );
  }

  const effectText = item.effect_entries[0]?.effect || "N/A";
  const shortEffect = effectText.length > 70 ? effectText.slice(0, 47) + '...' : effectText;

  const infoValues = [
    item.id,
    item.cost,
    shortEffect,
  ];

  return (
    <div className="font-pokemon text-xs !m-2 !p-2 border-3 border-double border-black rounded-md h-[calc(100%-1rem)] overflow-hidden">
      <div className="grid grid-cols-[1fr_1.4fr] gap-2 h-full">
        <div className="flex items-center justify-center">
          <img src={item.sprites.default} alt={item.name} className="max-h-24" />
        </div>
        <div className="flex flex-col justify-between">
          <div className="text-center mb-2 text-xs capitalize truncate w-full">{item.name}</div>
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