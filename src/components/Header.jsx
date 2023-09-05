import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from '/src/assets/logo.png';

export default function Header () {

  return (
    <HeaderContainer>
      <Link to="/">
        <p>CINEFLEX</p>
        <img src= {logo} alt="Logo"></img>
      </Link>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
    width: 100%;
    height: 70px;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #16181C;
    position: fixed;
    top: 0;
    a{
      display: flex;
      align-items: center;
      justify-content: center;

      text-decoration: none;
      transition: opacity 0.3s ease;
        &:hover {
            opacity: 0.7;;
        }
      p{
        color: #E8833A;
        font-family: 'Roboto', sans-serif;
        font-size: 34px;
      }
      img{
        width: 34px;
        height: 34px;
        margin-left:2%;
      }   
    }
`