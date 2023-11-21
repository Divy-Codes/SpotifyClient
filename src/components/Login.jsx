//Login is requesting AUTHORIZATION from spotify API. We are doing the authorization using "Implicit Grant" method. The following link shows how to do it.
// https://developer.spotify.com/documentation/web-api/tutorials/implicit-flow

//If authorization success, then we get the access token.

//The token is then fetched in APP.jsx and made available through useContext hook

//const clientSecret=5770e87772dc415b9cbd00b72125103a;

import styled from "styled-components";

export default function Login() {
  const handleClick = () => {
    const clientId = "7b6c5a13749449ecb3297f4d9c0ccdfd"; //Given by spotify
    const redirectUrl = "http://localhost:5173/";
    const apiUrl = "https://accounts.spotify.com/authorize";
    const scopes = [
      "user-read-email",
      "user-read-private",
      "user-read-playback-state",
      "user-modify-playback-state",
      "user-read-currently-playing",
      "user-read-playback-position",
      "user-top-read",
      "user-read-recently-played",
    ];
    window.location.href = `${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scopes.join(
      " "
    )}&response_type=token&show_dialog=true`;
  };
  return (
    <Container>
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png"
        alt="Spotify App Logo Image"
      />
      <button onClick={handleClick}>Connect to Spotify</button>
      {/* Could have made this button as a link <a> & in href attribute, add the link that we made in handleclick and assigned to window.location.href */}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #1db954;
  gap: 5rem;

  img {
    width: 20vh;
  }
  button {
    padding: 1rem 5rem;
    border: none;
    border-radius: 5rem;
    background-color: #000;
    color: #49f585;
    font-size: 1.4rem;
    cursor: pointer;
  }
`;

//=============Extra Information==============
//SCOPES are the types of access we shall demand the user to offer. Complete access to all info is not given once and for all. For more info visit:- https://developer.spotify.com/documentation/web-api/concepts/scopes
