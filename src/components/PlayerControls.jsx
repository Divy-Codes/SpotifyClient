import styled from "styled-components";
import axios from "axios";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsShuffle,
} from "react-icons/bs";
import { CgPlayTrackNext, CgPlayTrackPrev } from "react-icons/cg";
import { FiRepeat } from "react-icons/fi";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/constants";

export default function PlayerControls() {
  const [{ token, playState }, dispatch] = useStateProvider();

  //Changing the track would also change "CurrentTrack". So need API call again to fetch currently Playing
  const changeTrack = async (type) => {
    await axios.post(
      `https://api.spotify.com/v1/me/player/${type}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    //Re-Fetch currently playing after track change.
    const response = await axios.get(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.data !== "") {
      const { item } = response.data;
      const currentlyPlaying = {
        name: item.name,
        id: item.id,
        artists: item.artists.map((artist) => artist.name),
        image: item.album.images[2].url,
      };
      dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
    } else dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying: null });
  };

  const changeState = async () => {
    const state = playState ? "pause" : "play";
    await axios.put(
      `https://api.spotify.com/v1/me/player/${state}`,
      {},
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: reducerCases.SET_PLAY_STATE, playState: !playState });
  };

  return (
    <Container>
      <div className="shuffle">
        <BsShuffle />
      </div>
      <div className="previous" onClick={() => changeTrack("previous")}>
        <CgPlayTrackPrev />
      </div>
      <div className="state" onClick={changeState}>
        {playState ? <BsFillPauseCircleFill /> : <BsFillPlayCircleFill />}
      </div>
      <div className="next" onClick={() => changeTrack("next")}>
        <CgPlayTrackNext />
      </div>
      <div className="repeat">
        <FiRepeat />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;

  svg {
    color: #b3b3b3;
    transition: all 0.3s ease-in-out;
    &:hover {
      color: #fff;
    }
  }

  .state {
    svg {
      color: #fff;
    }
  }

  .previous,
  .next,
  .state {
    font-size: 2rem;
  }
`;
