import axios from "axios";
import styled from "styled-components";
import { useStateProvider } from "../utils/StateProvider";

export default function Volume() {
  const [{ token }] = useStateProvider();

  const setVolume = async (e) => {
    await axios.put(
      `https://api.spotify.com/v1/me/player/volume`,
      {},
      {
        params: {
          volume_percent: parseInt(e.target.value),
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  };

  return (
    <Container>
      <div className="bar">
        <input
          type="range"
          name="volumeSlider"
          id="volumeSlider"
          min={0}
          max={100}
          // onChange={(e) => setVolume(e.target.value)}
          // onMouseUp={changeVolume}

          onMouseUp={(e) => setVolume(e)}
        />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-content: center;

  input {
    width: 15rem;
    border-radius: 2rem;
    height: 0.5rem;

    /* -webkit-appearance: none;
    appearance: none;
    background: transparent;
    cursor: pointer;

    &::-webkit-slider-runnable-track {
      background: #053a5f;
      height: 0.5rem;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none; 
      appearance: none;
      margin-top: -12px; 
      background-color: #5cd5eb;
      height: 2rem;
      width: 1rem;
    } */
  }
`;
