import React from "react";
import styled from "styled-components";
import AddProduct from "./components/AddProduct";
import LoginScreen from "./components/LoginScreen";
import ProductGrid from "./components/ProductGrid";
import SellerPanel from "./components/SellerPanel";

const ContainerApp = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
`;

export default class App extends React.Component {
  state = {
    pageRender: "pageDirection",

  };

  onClickClient = () => {
    this.setState({ pageRender: "pageProducts" });
  };

  onClickSeller = () => {
    this.setState({ pageRender: "pageSeller" });
  };

  onClickAddProducts = () => {
    this.setState({ pageRender: "pageAddProducts" });
  };


  render() {
    const renderize = () => {
      if (this.state.pageRender === "pageDirection") {
        return (
          <LoginScreen
            functionOnClickClient={this.onClickClient}
            functionOnClickSeller={this.onClickSeller}
          />
        );
      } else if (this.state.pageRender === "pageProducts") {
        return <ProductGrid />;
      } else if (this.state.pageRender === "pageSeller") {
        return <SellerPanel functionOnClickAdd={this.onClickAddProducts} />;
      } else if (this.state.pageRender === "pageAddProducts") {
        return <AddProduct onClickBack={this.onClickSeller} />;
      }
    };


    return (
      <ContainerApp>
        {renderize()}
      </ContainerApp>
    )
  }
}

