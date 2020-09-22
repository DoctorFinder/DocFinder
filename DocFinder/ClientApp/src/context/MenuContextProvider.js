import React, { useReducer } from "react";
import MenuReducer from "../context/MenuReducer";

export const MenuTypeContext = React.createContext(null);

let initialMenu = { menutype: "user" };

export function MenuContext(props) {
  const [menu, dispatch] = useReducer(MenuReducer, initialMenu);

  const contextValue = {
    menu,
    dispatch
  };

  return (
      <MenuTypeContext.Provider value={contextValue}>
      {props.children}
      </MenuTypeContext.Provider>
  );
}
