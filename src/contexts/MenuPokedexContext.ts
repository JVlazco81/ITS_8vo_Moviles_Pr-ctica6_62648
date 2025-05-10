import { createContext } from "react";

export enum EPokedexMenuOption {
  POKEDEX = 1,
  PACK = 2,
  EXIT = 3
}

export enum EPokedexScreen {
  MENU,
  POKEDEX = 1,
  PACK = 2,
  EXIT = 3,
  DETAIL
}

export type TMenuPokedexContext = {
  screen: EPokedexScreen;
  menuOption: EPokedexMenuOption;
  setScreen: (option: EPokedexScreen) => void;
  setMenuOption: (option: EPokedexMenuOption) => void;
}

export const MenuPokedexContext = createContext<TMenuPokedexContext>({
  screen: EPokedexScreen.MENU,
  menuOption: EPokedexMenuOption.POKEDEX,
  setScreen: () => {},
  setMenuOption: () => {},
});