import styled from "styled-components";

export const Header = styled.div`
  color: red;
  margin-top: 55px;
  .name {
    width: 33%;
  }
  .form {
    display: flex;
    gap: 22px;
  }
  .surname {
    width: 33%;
  }
  .add-name-surname {
    width: 33%;
  }
  .loading {
    width: 55px;
    height: 55px;
    border-radius: 50%;
    border: 3px solid blueviolet;
    border-top-color: aquamarine;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-name: loading;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    @keyframes loading {
      from {
        transform: rotate(-360deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  }

  .load-none {
    display: none;
  }
`;
