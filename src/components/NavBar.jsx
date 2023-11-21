import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { useStateProvider } from "../utils/StateProvider";

export default function NavBar({ navBackground }) {
  const [{ userInfo }] = useStateProvider();
  return (
    <Container navBackground={navBackground}>
      <div className="search_bar">
        <FaSearch />
        <input type="text" placeholder="Artists, Songs and Podcasts" />
      </div>
      <div className="avatar">
        <a href="#">
          <CgProfile />
          <span>{userInfo.userName}</span>
        </a>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem;
  height: 15vh;
  position: sticky;
  top: 0;
  //Destructured navBackground here from props arguments implicitly passed. Check next commented out background-color properpty
  background-color: ${({ navBackground }) =>
    navBackground ? "rgba(0,0,0,0.7)" : "none"};
  /* background-color: ${(props) =>
    props.navBackground ? "yellow" : "none"}; */

  transition: background-color 0.3s ease-in-out;
  FaSearch {
    color: #000;
    background-color: #000;
  }

  .search_bar {
    width: 30%;
    background-color: #fff;
    padding: 0.4rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    input {
      border: none;
      width: 100%;
      height: 2rem;
      color: #555;
      font-weight: 500;
      letter-spacing: 0.5px;
      font-size: 0.9rem;

      &:focus {
        outline: none;
      }
    }
  }

  .avatar > a {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background-color: #000;
    padding: 0.3rem 0.4rem;
    border-radius: 2rem;
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: 500;
    color: #aaa;

    svg {
      background-color: #282828;
      font-size: 1.4rem;
      padding: 0.2rem;
      border-radius: 1rem;
      color: #c7c5c5;
    }
  }
`;
