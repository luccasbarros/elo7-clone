import React from "react";
import styled from "styled-components";

// Material
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

// Imagens
import LoginImage from "./../img/login.svg";
import LogoImage from "./../img/logo.png";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#f4f5f7",
    },
    secondary: {
      main: "#fdb930",
    },
  },
});

const DivLogin = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 2px solid #cccccc;
  border-radius: 10px;
  height: 100vh;
`;

const DivButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  height: 20vh;
  @media (min-width: 600px) {
    height: 30vh;
  }
`;

const ImgSvgLogin = styled.img`
  max-width: 50vw;
  @media (min-width: 600px) {
    width: 25vw;
  }
`;

const Imglogo = styled.img`
  max-width: 80vw;
  margin-bottom: 2rem;
`;

export default class LoginScreen extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <DivLogin>
          <Imglogo src={LogoImage} />
          <ImgSvgLogin src={LoginImage} />
          <DivButton>
            <Button
              onClick={this.props.functionOnClickSeller}
              variant="outlined"
              color="secondary"
            >
              VENDEDOR
            </Button>
            <Button
              onClick={this.props.functionOnClickClient}
              variant="outlined"
              color="secondary"
            >
              CONSUMIDOR
            </Button>
          </DivButton>
        </DivLogin>
      </ThemeProvider>
    );
  }
}
