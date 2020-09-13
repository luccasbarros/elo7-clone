import React from "react";
import axios from "axios";
import styled from "styled-components";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CardImage from "./../img/seller-delete.png";
import Delete from '@material-ui/icons/DeleteOutlined';



const GeneralContainer = styled.div `
background-color: white;
min-height: 100vh;
width: 100%;`

const CardPhoto = styled.img`
width: 50%;
display:flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-left: 25%;
margin-bottom: 10%;`

const Title = styled.p ` 
text-align:center;
height: 20%;
margin-bottom: 2rem;
margin: 0;
padding: 40px;
font-size: 1.5rem;
` 

const SectionOne = styled.div ` 
display: flex;
justify-content: center;
margin: 1rem;
height: 0%;`

const ProductDeleteSection = styled.div `
display:flex;
flex-direction: column;
align-items: center;
margin:0;
height: 100%;`

const GridProducts = styled.div `
display:grid;
grid-template-columns:1fr 1fr;
word-wrap: break-word;
height: 7vh; 
`
const NamePrice = styled.div `
font-size: 12px;  
margin-right: 2rem;
margin-left: 2rem;
text-align:left;
margin-top: 0.8rem;
display:flex;
flex-direction:column;
margin-top: 0px;`

const ButtonConfig = styled.div `
margin-right: 10px;`


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

export default class SellerPanel extends React.Component {

  state = {
    products: []
  }
  
  componentDidMount() {
    this.getProducts();
  }

  getProducts = () => {
    axios
      .get("https://us-central1-labenu-apis.cloudfunctions.net/eloFourOne/products", {
            })
      .then((response) => {
        console.log(response.data)
        this.setState({ products: response.data.products});
      })
      .catch((erro) => {
        console.log(erro);
      });
  };


  deleteProducts = (id) => {
    axios.delete(
      `https://us-central1-labenu-apis.cloudfunctions.net/eloFourOne/products/${id}`,
      { 
      }
    )
      .then((response) => {
        alert("O produto foi deletado com sucesso!")
        this.getProducts();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };







  render() { 
    
    return <GeneralContainer>

      <ThemeProvider theme={theme}>

      <Title>Olá, bem-vindo(a) ao controle dos seus produtos </Title>

      <SectionOne>
      <Button 
      variant="contained" 
      color="secondary" 
      href="#contained-buttons"
      onClick={this.props.functionOnClickAdd}>
      Cadastrar Produto
      </Button>
      </SectionOne>

    

      <Title>Gerenciar Produtos</Title>

      <CardPhoto src={CardImage} />

      <ProductDeleteSection>
          {this.state.products.map((item) => {
          return <p onClick={this.getProducts} key={item.id}>



          <GridProducts>
          <NamePrice>
          <div><strong>{"Produto: "} </strong>{item.name}{`   `}</div>
          <div><strong>{"Preço: "}  </strong> {"R$ "} {item.price}</div> 
          </NamePrice>
          
         
          <ButtonConfig>
          <Button  
          variant="contained"
          color="primary" 
          href="#contained-buttons"
          size="small"
          endIcon={<Delete />}
          onClick={() => this.deleteProducts(item.id)}> Deletar Produto</Button>
          </ButtonConfig> 

         
          </GridProducts>

         
          </p>; })}

      </ProductDeleteSection>


          </ThemeProvider>


    </GeneralContainer>;
  }
}
