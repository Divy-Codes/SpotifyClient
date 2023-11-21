import { useEffect, useState } from "react";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from "../utils/constants";
import styled from "styled-components";

export default function Playlists() {
  const [{ token, playlists }, dispatch] = useStateProvider();

  useEffect(() => {
    const getPlaylistData = async () => {
      const response = await axios.get(
        "https://api.spotify.com/v1/me/playlists",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const { items } = response.data; //destructured "items" directly.

      const playlists = items.map(({ name, id }) => {
        return { name, id };
      });

      dispatch({ type: reducerCases.SET_PLAYLISTS, playlists });
    };
    getPlaylistData();
  }, [token, dispatch]);

  //Change selected playlist on click
  const changeCurrentPlaylist = (selectedPlaylistId) => {
    dispatch({ type: reducerCases.SET_PLAYLIST_ID, selectedPlaylistId });
  };

  return (
    <Container>
      <ul>
        {playlists.map(({ name, id }) => {
          return (
            <li key={id} onClick={() => changeCurrentPlaylist(id)}>
              {name}
            </li>
          );
        })}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  height: 100%;
  overflow: hidden;
  ul {
    margin-top: 2rem;
    height: 55vh;
    max-height: 100%;
    overflow-y: auto;
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 2rem;

    &::-webkit-scrollbar {
      width: 0.5rem;
      &-thumb {
        background-color: #666;
        /* border-radius: 10px; */
        /* visibility: hidden; */
      }
      &-track {
        background-color: #9f9f9f;
        /* border-radius: 10px; */
        /* visibility: hidden; */
      }
    }

    li {
      display: flex;
      gap: 1rem;
      align-items: center;
      font-size: 1rem;
      font-weight: 500;
      font-size: 1rem;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      &:hover {
        color: #fff;
      }
    }
  }
`;
