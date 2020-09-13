import React from "react";
import styled from "styled-components";

// Material UI
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal'; 

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

//imagens
import EmptyCarIcon from '../img/empty-cart.svg'


// styled

const CartContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 10px;
  width: 50%;
`
const EmptyImage = styled.img`
  width: 50%;
  margin: 20px 0;

  @media (min-width: 600px) {
    width: 30%;
  }
`;


export default class ShoppingCart extends React.Component {

  render() {

    return (
    <Modal
    open
    disablePortal
    onClose={this.props.showCart}
    style={{display:'flex',alignItems:'center',justifyContent:'center'}}
    >
      <CartContainer>
      {(this.props.cartItems.length === 0)? 
        <div> 
          <Typography variant="h6"> Seu carrinho está vazio :( </Typography>
          <EmptyImage src={EmptyCarIcon} />
        </div>:
        <div>
          <Typography variant="h6"> Itens adicionados:</Typography>
        {this.props.cartItems.map( (item) => {
        return (
          <List>
            
         <ListItem>
          {(item.qnt === 1)? 
          <ListItemText primary={`${item.qnt}x - ${item.name}`} secondary={`Preço: R$${item.price}`} />:
          <ListItemText primary={`${item.qnt}x - ${item.name}`} secondary={`R$${item.price} unidade | Subtotal: R$ ${item.price * item.qnt}`} />
          
        }
          </ListItem>
          </List>
        )

      })}
      <Typography variant="paragraph"><strong>Valor total:</strong>R${this.props.subtotal}</Typography>
      </div>
      }
      </CartContainer>
      

      
    </Modal>
      
    )
  }
}
