import styled from "styled-components";
import { AiFillClockCircle } from "react-icons/ai";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { useEffect } from "react";
import { reducerCases } from "../utils/constants";

const msToMinutesAndSeconds = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  //If seconds is 9 seconds then we want "09" seconds
};

export default function Body({ headerBackground }) {
  const [{ token, selectedPlaylistId, selectedPlaylist }, dispatch] =
    useStateProvider();

  useEffect(() => {
    const getInitialPlaylist = async () => {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a")
          ? ""
          : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({ track }) => ({
          name: track.name,
          id: track.id,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number: track.track_number,
        })),
      };

      dispatch({ type: reducerCases.SET_PLAYLIST, selectedPlaylist });
    };
    getInitialPlaylist();
  }, [token, dispatch, selectedPlaylistId]);

  const playTrack = async (
    id,
    name,
    artists,
    image,
    context_uri,
    track_number
  ) => {
    const response = await axios.put(
      `https://api.spotify.com/v1/me/player/play`,
      {
        context_uri,
        offset: {
          position: track_number - 1,
        },
        position_ms: 0,
      },
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 204) {
      const currentlyPlaying = {
        id,
        name,
        artists,
        image,
      };
      dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
      dispatch({ type: reducerCases.SET_PLAY_STATE, playState: true });
    } else dispatch({ type: reducerCases.SET_PLAY_STATE, playState: true });
    // dispatch({ type: reducerCases.SET_PLAYING, currentlyPlaying });
  };

  return (
    <Container headerBackground={headerBackground}>
      {selectedPlaylist && (
        <>
          <div className="playlist">
            <div className="image">
              <img
                src={selectedPlaylist.image}
                alt="Selected Playlist's Image"
              />
            </div>
            <div className="details">
              <span className="type">Playlist</span>
              <h1 className="title">{selectedPlaylist.name}</h1>
              <p className="description">{selectedPlaylist.description}</p>
            </div>
          </div>
          <div className="list">
            <div className="header_row">
              <div className="col">
                <span>#</span>
              </div>
              <div className="col">
                <span>Title</span>
              </div>
              <div className="col">
                <span>Album</span>
              </div>
              <div className="col">
                <span>
                  <AiFillClockCircle />
                </span>
              </div>
            </div>
            <div className="tracks">
              {selectedPlaylist.tracks.map(
                (
                  {
                    id,
                    name,
                    image,
                    duration,
                    artists,
                    album,
                    context_uri,
                    track_number,
                  },
                  index
                ) => {
                  return (
                    <div
                      className="row"
                      key={id}
                      onClick={() =>
                        playTrack(
                          id,
                          name,
                          artists,
                          image,
                          context_uri,
                          track_number
                        )
                      }
                    >
                      <div className="col">
                        <span>{index + 1}</span>
                      </div>
                      <div className="col detail">
                        <div className="image">
                          <img src={image} alt="Thumbnail for track" />
                        </div>
                        <div className="info">
                          <span className="name">{name}</span>
                          <span>{artists}</span>
                        </div>
                      </div>
                      <div className="col">
                        {/* <span>{album}</span> */}
                        <span>
                          {album.length < 40
                            ? album
                            : album.substring(0, 40) + " ..."}
                        </span>
                      </div>
                      <div className="col">
                        <span>{msToMinutesAndSeconds(duration)}</span>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

const Container = styled.div`
  .playlist {
    margin: 0 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;

    .image {
      width: 15rem;
      height: 15rem;
      img {
        width: 100%;
        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
      }
    }

    .details {
      display: flex;
      flex-direction: column;
      color: #e0dede;
      .title {
        font-size: 5rem;
      }
    }
  }
  .list {
    .header_row {
      display: grid;
      grid-template-columns: 0.3fr 3fr 2fr 0.1fr;
      margin: 1rem 3rem;
      color: #aaa;
      position: sticky;
      top: 15vh;
      padding: 1rem 0;
      transition: position 0.3s ease-in-out;
      border-bottom: 0.05px solid #555;
      font-weight: 500;
      background-color: ${({ headerBackground }) =>
        headerBackground ? "#000000dc" : "none"};
    }
  }
  .tracks {
    display: flex;
    flex-direction: column;
    margin: 0 2rem 5rem;

    .row {
      padding: 0.5rem 1rem;
      display: grid;
      grid-template-columns: 0.3fr 3.1fr 1.9fr 0.1fr;

      &:hover {
        background-color: rgba(255, 255, 255, 0.05);
        cursor: pointer;
      }

      .col {
        color: #dddcdc;
        display: flex;
        /* gap: 1rem; */

        img {
          height: 45px;
          border-radius: 5px;
        }
      }

      .detail {
        display: flex;
        gap: 1rem;

        .info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0.2rem;

          /* line-height: 0.5; */
        }
      }
    }
  }
`;
