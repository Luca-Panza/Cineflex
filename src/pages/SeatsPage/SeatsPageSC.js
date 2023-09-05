import styled from "styled-components";

const PageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #808080;
  padding-bottom: 120px;
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
const SeatsContainer = styled.div`
  width: 330px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
const FormContainer = styled.form`
  width: calc(100vw - 40px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  font-size: 18px;
  button {
    align-self: center;
    cursor: pointer;
    transition: opacity 0.3s ease;
    &:hover {
      opacity: 0.7;
      color: #16181c;
    }
  }
  input {
    width: calc(100vw - 60px);
  }
`;
const CaptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: space-between;
  margin: 20px;
`;
const CaptionCircle = styled.div`
  border: 1px solid ${(seat) => (seat.isAvailable === "selected" ? "#0E7D71" : seat.isAvailable ? "#7B8B99" : "#F7C52B")};
  background-color: ${(seat) => (seat.isAvailable === "selected" ? "#1AAE9E" : seat.isAvailable ? "#C3CFD9" : "#FBE192")};
  height: 25px;
  width: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;
const CaptionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
`;
const SeatItem = styled.div`
  border: 1px solid ${(seat) => (seat.isAvailable === "selected" ? "#0E7D71" : seat.isAvailable ? "#7B8B99" : "#F7C52B")};
  background-color: ${(seat) => (seat.isAvailable === "selected" ? "#1AAE9E" : seat.isAvailable ? "#C3CFD9" : "#FBE192")};
  height: 25px;
  width: 25px;
  border-radius: 25px;
  font-family: "Roboto";
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
  cursor: ${(seat) => (seat.isAvailable || seat.isAvailable === "selected" ? "pointer" : "default")};
`;
const FooterContainer = styled.div`
  width: 100%;
  height: 120px;
  background-color: #16181c;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  position: fixed;
  bottom: 0;

  div:nth-child(1) {
    box-shadow: 0px 2px 4px 2px #0000001a;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    margin: 12px;
    img {
      width: 50px;
      height: 70px;
      padding: 8px;
    }
  }

  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    p {
      text-align: left;
      &:nth-child(2) {
        margin-top: 10px;
      }
    }
  }
`;

export {
  PageContainer,
  LoadingContainer,
  SeatsContainer,
  FormContainer,
  CaptionContainer,
  CaptionCircle,
  CaptionItem,
  SeatItem,
  FooterContainer,
};
