import React, { Component } from 'react'
import { connect } from 'react-redux'
import actions from '../../store/actions'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.values(ingredients).reduce((pre, cur) => pre + cur, 0)
    return sum > 0
  }

  componentDidMount () {
    // axios.get('/ingredients.json')
    //   .then(responce => {
    //     this.setState({ingredients: responce.data})
    //   })
    //   .catch(error => {
    //     this.setState({error: true})
    //   });
  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
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
    
    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

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

    if(this.state.loading) {
      orderSummary = <Spinner />
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
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddIngredient: (ing) => dispatch({type: actions.ADD_INGREDIENT, ingredient: ing}),
    onRemoveIngredient: (ing) => dispatch({type: actions.REMOVE_INGREDIENT, ingredient: ing})
  }  
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))