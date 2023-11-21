import { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

export default function StateProvider({ children, initialState, reducer }) {
  return (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </StateContext.Provider>
  );
}

//Exporting custom useContext hook for enhanced readibility
export const useStateProvider = () => useContext(StateContext);

//------------------NOTES----------------------

//children of StateProvider is App.jsx
//<StateContext.Provider value={useReducer(reducer, initialState)}>
//Providing useReducer hook in value. So upon using useStateProvider hook, it would return [values,dispatch_Fn]
// cause const [value,dispatch_Fn]=useState(reducer,intialValue);
