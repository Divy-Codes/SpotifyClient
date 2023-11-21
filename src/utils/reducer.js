//Reducer function to be passed to useReducer hook inside the StateProvider Component. Therefore this will be available in entire App.

import { reducerCases } from "./constants";

export const initialState = {
  token: null,
  playlists: [],
  userInfo: {},
  // selectedPlaylistId: "2ryejDaf3jMup0Capyczrj",
  selectedPlaylistId: "5hRUqB1FVTB2X5HugFviY7",
  selectedPlaylist: null,
  currentlyPlaying: null,
  playState: false,
};

//This function would be the dispatch/reducer function returned by useStateProvider
export default function reducer(state, action) {
  switch (action.type) {
    case reducerCases.SET_TOKEN: {
      return { ...state, token: action.token };
    }

    case reducerCases.SET_PLAYLISTS: {
      return { ...state, playlists: action.playlists };
    }

    case reducerCases.SET_USER: {
      return { ...state, userInfo: action.userInfo };
    }

    case reducerCases.SET_PLAYLIST: {
      return { ...state, selectedPlaylist: action.selectedPlaylist };
    }

    case reducerCases.SET_PLAYING: {
      return { ...state, currentlyPlaying: action.currentlyPlaying };
    }

    case reducerCases.SET_PLAY_STATE: {
      return { ...state, playState: action.playState };
    }

    //Remove below
    case reducerCases.SET_VOLUME: {
      return { ...state, volume: action.volume };
    }

    case reducerCases.SET_PLAYLIST_ID: {
      return { ...state, selectedPlaylistId: action.selectedPlaylistId };
    }

    default:
      return state;
  }
}

//In reducer function we declared action. Then we wrote action.type. It's as if writing the following:-
// const action = {
//   type: null,
// };

//So when we pass reducerCases.SET_TOKEN in function call, reducerCases becomes action object and SET_TOKEN becomes the type.
