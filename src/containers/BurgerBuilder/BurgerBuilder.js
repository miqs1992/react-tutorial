import React, { Component } from 'react'
import { connect } from 'react-redux'

import axios from '../../axios-orders'
import { addIngredient, removeIngredient, initIngredients } from '../../store/actions/burgerBuilder'
import { purchaseInit } from '../../store/actions/order'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.values(ingredients).reduce((pre, cur) => pre + cur, 0)
    return sum > 0
  }

  componentDidMount () {
    this.props.onComponentDidMount();
  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout")
  }

  render (){
    const disabledInfo = {
      ...this.props.ingredients
    }
    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0 
    }
    let orderSummary = null;
    
    let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if(this.props.ingredients){
      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ingredients}/>
          <BuildControls 
            ingAdded={this.props.onAddIngredient}
            ingRemoved={this.props.onRemoveIngredient}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ingredients)}
            price={this.props.totalPrice}
            ordered={this.purchaseHandler} />
        </React.Fragment>)
      
      orderSummary =  (<OrderSummary 
        ingredients={this.props.ingredients} 
        canceled={this.purchaseCancelHandler}
        continued={this.purchaseContinueHandler}
        price={this.props.totalPrice}/>)
    }
    
    return (
      <React.Fragment>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burderBuilder.ingredients,
    totalPrice: state.burderBuilder.totalPrice,
    error: state.burderBuilder.fetchError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ing) => dispatch(addIngredient(ing)),
    onRemoveIngredient: (ing) => dispatch(removeIngredient(ing)),
    onComponentDidMount: () => dispatch(initIngredients()),
    onInitPurchase: () => dispatch(purchaseInit())
  }  
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))