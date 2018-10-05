import React, { Component } from 'react'
import {Route, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary"
import ContactData from './ContactData/ContactData'


class Checkout extends Component {
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/form");
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  render() {
    let summary = <Redirect to="/" />
    
    if(this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary 
            ingredients={this.props.ingredients}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}/>
          <Route 
            path={this.props.match.path + '/form'} 
            component={ContactData} />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burderBuilder.ingredients,
    purchased: state.order.purchased
  }
}

export default connect(mapStateToProps)(Checkout);