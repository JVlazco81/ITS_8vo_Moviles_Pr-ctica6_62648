import React, { useEffect, useState } from "react";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Item {
  name: string;
  url: string;
}

export const ItemList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [offset, setOffset] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const limit = 7;

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://pokeapi.co/api/v2/item?offset=${offset}&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        setItems(data.results);
        setIsLoading(false);
        setSelectedIndex(0);
      });
  }, [offset]);

  useEffect(() => {
    (window as any).itemListNavigation = {
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
    (window as any).currentItemList = items;
    (window as any).currentItemSelectedIndex = selectedIndex;

    return () => {
      delete (window as any).itemListNavigation;
      delete (window as any).currentItemList;
      delete (window as any).currentItemSelectedIndex;
    };
  }, [selectedIndex, offset, items, isLoading]);

  const handleMoveUp = () => {
    if (isLoading) return;
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    } else if (offset > 0) {
      setOffset(offset - limit);
    }
  };

  const handleMoveDown = () => {
    if (isLoading) return;
    if (selectedIndex < items.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    } else {
      setOffset(offset + limit);
    }
  };

  return (
    <div className="font-pokemon text-xs !m-2 !p-2 border-3 border-double border-black rounded-md h-[calc(100%-1rem)] overflow-hidden">
      <ul className="flex flex-col justify-between h-full">
        {(isLoading ? Array.from({ length: limit }) : items).map((_, index) => (
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
            <span className="w-10 text-right">{offset + index + 1}</span>
            <span className="flex-1 text-center truncate">
              {isLoading
                ? "[loading]"
                : items[index]?.name.charAt(0).toUpperCase() +
                  items[index]?.name.slice(1)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};