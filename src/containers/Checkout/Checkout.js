import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary"
import ContactData from './ContactData/ContactData'


class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  }

  componentWillMount(){
    const query = new URLSearchParams(this.props.location.search)
    const ingredients = {};
    let price = 0;
    Array.from(query.entries()).forEach(p => {
      if(p[0] === 'price'){
        price = p[1]
      }
      else{
        ingredients[p[0]] = +p[1];
      }
      
    })
    this.setState({ingredients: ingredients, totalPrice: price})
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/form")
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  render() {
    return (
      <div>
        <CheckoutSummary 
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}/>
        <Route 
          path={this.props.match.path + '/form'} 
          render={(props) => (
            <ContactData 
              ingredients={this.state.ingredients} 
              price={this.state.totalPrice}
              {...props}/>)
          } />
      </div>
    )
  }
}

export default Checkout;