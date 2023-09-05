import styled from "styled-components";

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  > p {
    padding-top: 70px;
    font-family: "Roboto";
    font-size: 24px;
    color: #e8833a;
    margin-top: 30px;
    margin-bottom: 30px;
  }
`;
const LoadingContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ListContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 10px;
`;
const MovieContainer = styled.div`
  width: 145px;
  height: 210px;
  background-color: #16181c;
  box-shadow: 0px 2px 4px 2px #0000001a;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.6;
    background-color: #808080;
  }

  img {
    width: 130px;
    height: 190px;
  }
`;

export { PageContainer, LoadingContainer, ListContainer, MovieContainer };
