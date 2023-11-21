import { useEffect } from "react";
import Login from "./components/Login";
import { useStateProvider } from "./utils/StateProvider";
import { reducerCases } from "./utils/constants";
import Spotify from "./components/Spotify";

export default function App() {
  const [{ token }, dispatch] = useStateProvider(); //provides a useReducer hook which returns an array [value,dispatch] function. An object called InitialState is returned as value. token is one of it's properties. So we destructured token here.
  //[value,dispatch] is returned from reducer.js

  useEffect(() => {
    const hash = window.location.hash; //Returns substring after "#" in URL
    if (hash) {
      //Fetching the access token
      const token = hash.substring(1).split("&")[0].split("=")[1];

      dispatch({ type: reducerCases.SET_TOKEN, token });
    }
  }, [token, dispatch]);
  return (
    <div>
      {/* If we have token then run Spotify app else  run Login */}
      {token ? <Spotify /> : <Login />}
      {/* <Login /> */}
    </div>
  );
}
