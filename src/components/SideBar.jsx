import styled from "styled-components";
import Playlists from "./Playlists";
import { IoHomeSharp, IoSearchSharp, IoLibrary } from "react-icons/io5";
export default function SideBar() {
  return (
    <Container>
      <div className="top_links">
        <div className="logo">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_White.png"
            alt="Spotify App Logo Image"
          />
        </div>
      </div>
      <ul>
        <li>
          <IoHomeSharp />
          <span>Home</span>
        </li>
        <li>
          <IoSearchSharp />
          <span>Search</span>
        </li>
        <li>
          <IoLibrary />
          <span>Your Library</span>
        </li>
      </ul>

      <Playlists />
    </Container>
  );
}

const Container = styled.div`
  background-color: #000;
  color: #b3b3b3;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .top_links {
    display: flex;
    flex-direction: column;

    .logo {
      text-align: center;
      margin: 1rem 0 2rem;

      img {
        /* width: 80%; */
        max-inline-size: 80%;
        block-size: auto;
      }
    }
  }

  ul {
    list-style-type: none;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    padding: 0 2rem 1rem;

    li {
      display: flex;
      gap: 1rem;
      align-items: center;
      font-size: 1.2rem;
      font-weight: 500;
      cursor: pointer;
      transition: 0.3s ease-in-out;
      &:hover {
        color: #fff;
      }
    }
  }
`;
