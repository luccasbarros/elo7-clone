import React from "react";
import axios from "axios";
import styled from "styled-components";
import HeaderFilter from "./HeaderFilter"
import LogoImage from "./../img/logo.png";


import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import ShoppingCart from "./ShoppingCart";

// MATERIAL UI
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

// MATERIAL UI da parte de ordenar
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";

import Fab from "@material-ui/core/Fab";

//MATERIAL UI ICON
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";

//tema
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

// styled

const Img = styled.img`
  margin-top: 20px;
  margin-left: 40px;
`

const CardsGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1em;

  @media (min-width: 800px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 2em;
    align-content: center;
    justify-items: center;
    width: 60vw;
  }
`;

const CardContainer = styled.div`
  margin-bottom: 1em;
  width: 80vw;

  @media (min-width: 600px) {
    width: 15em;
  }
`;

const ShoppingIconContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  padding-right: 1em;
  padding-bottom: 2em;
`;

const OrderDiv = styled.div`
  display: flex;
  width: 100vw;
  height: 15vh;
  justify-content: center;
  align-items: center;
`;

export default class ProductCard extends React.Component {
  state = {
    products: [],
    cartVisibility: false,
    cartItems: [],
    subtotal: 0,
    filters: {
      minValue: 0,
      maxValue: Infinity,
    },
    searchText: "",
    category: ""
  };
  

  onChangeSort = (event) => {
    const arrayAlterado = [...this.state.products];

    this.setState(
      {
        sort: event.target.value,
      },
      () => {
        console.log(this.state.sort);

        switch (this.state.sort) {
          case "price":
            arrayAlterado.sort(function (a, b) {
              return a.price - b.price;
            });
            break;

          case "name":
            arrayAlterado.sort(function (a, b) {
              const tituloA = a.name.toUpperCase();
              const tituloB = b.name.toUpperCase();

              if (tituloA === tituloB) {
                return 0;
              } else if (tituloA < tituloB) {
                return -1;
              } else {
                return 1;
              }
            });
            break;

          case "category":
            arrayAlterado.sort(function (a, b) {
              const tituloA = a.category.toUpperCase();
              const tituloB = b.category.toUpperCase();
              if (tituloA === tituloB) {
                return 0;
              } else if (tituloA < tituloB) {
                return -1;
              } else {
                return 1;
              }
            });
            break;
        }
        this.setState({ products: arrayAlterado });
      }
    );
  };

  inputText = (event) =>{
    this.setState({searchText: event.target.value})
  };

  updateFilter = (newValueFilter) =>{
    this.setState({filters: {...this.state.filters, ...newValueFilter}})
  };

  category = (event) =>{
    this.setState({category: event.target.value})
  };


  filterProducts = () =>{
    const newProducts = this.state.products
    const filteredProducts = newProducts.filter(product =>{
      return product.name.toLowerCase().indexOf(this.state.searchText.toLowerCase())> -1
    }).filter(product =>{
      return product.price <= (this.state.filters.maxValue || Infinity)
    }).filter(product =>{
      return product.price >= (this.state.filters.minValue || 0)
    }).filter(product =>{
      return product.description.toLowerCase().indexOf(this.state.searchText.toLowerCase())> -1
    })
    if(this.state.category !== ""){
      return newProducts.filter(product =>{
        return product.category === this.state.category
    })
    }

    return filteredProducts
  };

  getProducts = () => {
    axios
      .get(
        "https://us-central1-labenu-apis.cloudfunctions.net/eloFourOne/products"
      )
      .then((response) => {
        this.setState({ products: response.data.products });
      })
      .catch((error) => {
        alert(
          "Erro ao recuperar todos os produtos:",
          error,
          "Reinicie a página!"
        );
      });
  };

  componentDidMount = () => {
    this.getProducts();
  };

  // função que mostra o carrinho na tela:
  showCart = () => {
    this.setState({ cartVisibility: !this.state.cartVisibility });
  };

  // função que adiciona os itens no carrinho:
  addToCart = (id, name, price) => {
    let condition = this.state.cartItems.some((item) => {
      return id === item.id;
    });

    if (condition) {
      const newAddedItems = [];

      for (let i = 0; i < this.state.cartItems.length; i++) {
        let item = this.state.cartItems[i];
        if (id === item.id) {
          item.qnt += 1;
        }
        newAddedItems.push(item);
      }
      this.setState({
        cartItems: newAddedItems,
        subtotal: this.state.subtotal + price,
      });
    } else {
      const addedItem = { id: id, name: name, price: price, qnt: 1 };
      const addedItems = [...this.state.cartItems, addedItem];
      this.setState({
        cartItems: addedItems,
        subtotal: this.state.subtotal + addedItem.price,
      });
    }

    this.showCart();
  };

  render() {

    return (
       <div>
        <Img src={LogoImage}/>
        <HeaderFilter stateProducts={this.state.products} onChangeFilter={this.updateFilter} stateInputMin={this.state.filters.minValue}
          searchTitle={this.state.searchText} changeSearch={this.inputText} changeCategory={this.category} stateCategory={this.state.category}/>
        <ThemeProvider theme={theme}>
          <OrderDiv>
            <FormControl variant="outlined">
              <Box width="200px">
                <InputLabel
                  id="demo-simple-select-outlined-label"
                  color="secondary"
                >
                  Ordenar por
                </InputLabel>
              </Box>

              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={this.state.sort}
                onChange={(event) => this.onChangeSort(event)}
              >
                <MenuItem value={""}></MenuItem>
                <MenuItem value={"name"}>Nome</MenuItem>
                <MenuItem value={"category"}>Categoria</MenuItem>
                <MenuItem value={"price"}>Preço</MenuItem>
              </Select>
            </FormControl>
          </OrderDiv>

        </ThemeProvider>

        <CardsGrid>
         
          <ThemeProvider theme={theme}>
            {/* Aqui é onde o carrinho de compra é renderizado: */}
            {this.state.cartVisibility && (
              <ShoppingCart
                showCart={this.showCart}
                cartItems={this.state.cartItems}
                subtotal={this.state.subtotal}
              ></ShoppingCart>
            )}

            {/* Aqui é onde o grid de produtos é renderizado: */}
            {this.filterProducts().map((item) => {
              return (
                <CardContainer>
                  <Card>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        src={item.photos}
                        alt={item.name}
                        height="140"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {item.name}
                        </Typography>

                        <Typography
                          variant="caption"
                          display="inline"
                          variant="subtitle2"
                        >
                          R$
                        </Typography>

                        <Typography variant="h6" display="inline">
                          {item.price}
                        </Typography>
                        <Typography gutterBottom variant="subtitle2">
                          Pague no {item.paymentMethod} em até{" "}
                          <strong>{item.installments}x</strong>
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          <strong>{item.category}</strong> - {item.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button
                        startIcon={<AddShoppingCartIcon />}
                        size="small"
                        color="secondary"
                        onClick={() =>
                          this.addToCart(item.id, item.name, item.price)
                        }
                      >
                        Adicionar ao carrinho
                      </Button>
                    </CardActions>
                  </Card>
                </CardContainer>
              );
            })}

            <ShoppingIconContainer onClick={this.showCart}>
              <Fab size="large" color="secondary">
                <ShoppingCartIcon />
              </Fab>
            </ShoppingIconContainer>
          </ThemeProvider>
        </CardsGrid>
      </div>
    );
  }
}
