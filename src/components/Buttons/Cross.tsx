import { useContext } from "react";
import { EPokedexScreen, MenuPokedexContext } from "../../contexts/MenuPokedexContext";

export const Cross = () => {
  const { screen, menuOption, setMenuOption } = useContext(MenuPokedexContext);

  const handleTopPress = () => {
    if (screen === EPokedexScreen.MENU) {
      const newOption = menuOption - 1 < 1 ? 3 : menuOption - 1;
      setMenuOption(newOption);
    } else if (screen === EPokedexScreen.POKEDEX) {
      (window as any).pokedexListNavigation?.prevPage();
    } else if (screen === EPokedexScreen.PACK) {
      (window as any).itemListNavigation?.prevPage();
    }
  };

  const handleBottomPress = () => {
    if (screen === EPokedexScreen.MENU) {
      const newOption = menuOption + 1 > 3 ? 1 : menuOption + 1;
      setMenuOption(newOption);
    } else if (screen === EPokedexScreen.POKEDEX) {
      (window as any).pokedexListNavigation?.nextPage();
    } else if (screen === EPokedexScreen.PACK) {
      (window as any).itemListNavigation?.nextPage();
    }
  };

  return (
    <div id="cross">
      <div
        id="leftcross"
        className="gameboy-button"
        onClick={() => {
          if (screen === EPokedexScreen.POKEDEX) {
            (window as any).pokedexListNavigation?.prevBlock();
          } else if (screen === EPokedexScreen.DETAIL) {
            (window as any).pokedexDetailNavigation?.prevInfo();
          } else if (screen === EPokedexScreen.PACK) {
            (window as any).itemListNavigation?.prevBlock();
          } else if (screen === EPokedexScreen.ITEM_DETAIL) {
            (window as any).itemDetailNavigation?.prevInfo();
          }
        }}
      >
        <div id="leftT"></div>
      </div>
      <div id="topcross" className="gameboy-button" onClick={handleTopPress}>
        <div id="upT"></div>
      </div>
      <div
        id="rightcross"
        className="gameboy-button"
        onClick={() => {
          if (screen === EPokedexScreen.POKEDEX) {
            (window as any).pokedexListNavigation?.nextBlock();
          } else if (screen === EPokedexScreen.DETAIL) {
            (window as any).pokedexDetailNavigation?.nextInfo();
          } else if (screen === EPokedexScreen.PACK) {
            (window as any).itemListNavigation?.nextBlock();
          } else if (screen === EPokedexScreen.ITEM_DETAIL) {
            (window as any).itemDetailNavigation?.nextInfo();
          }
        }}
      >
        <div id="rightT"></div>
      </div>
      <div id="midcross" className="gameboy-button">
        <div id="midCircle"></div>
      </div>
      <div id="botcross" className="gameboy-button" onClick={handleBottomPress}>
        <div id="downT"></div>
      </div>
    </div>
  )
}