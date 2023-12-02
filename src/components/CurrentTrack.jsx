import styled from "styled-components";
import { useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/constants";

export default function CurrentTrack() {
  const [{ token, currentlyPlaying }, dispatch] = useStateProvider();

  useEffect(() => {
    const getCurrentTrack = async () => {
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
      }
    };
    getCurrentTrack();
  }, [token, dispatch, currentlyPlaying]);
  return (
    <Container>
      {/* If component null then no need to render it */}
      {currentlyPlaying && (
        <div className="track">
          <div className="track_image">
            <img
              src={currentlyPlaying.image}
              alt="Image of currently playing"
            />
          </div>
          <div className="track_info">
            <span>{currentlyPlaying.name}</span>
            <span>{currentlyPlaying.artists.join(", ")}</span>
          </div>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  .track {
    display: flex;
    align-items: center;
    gap: 1rem;
    &_info {
      display: flex;
      flex-direction: column;
      gap: 0.3rem;

      span:nth-child(1) {
        color: #fff;
        font-weight: 500;
      }

      span:nth-child(2) {
        color: #b3b3b3;
        font-size: 0.9rem;
        font-weight: 500;
      }
    }
  }
`;
