import React, { Component } from 'react'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const ING_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.values(ingredients).reduce((pre, cur) => {return pre + cur}, 0)
    this.setState({purchasable: sum > 0})
  }

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIng = {
      ...this.state.ingredients
    };
    updatedIng[type] = updatedCount;
    const priceAddition = ING_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      ingredients: updatedIng,
      totalPrice: newPrice
    })
    this.updatePurchaseState(updatedIng)
  }

  componentDidMount () {
    axios.get('/ingredients.json')
      .then(responce => {
        this.setState({ingredients: responce.data})
      })
      .catch(error => {
        this.setState({error: true})
      });
  }

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount <= 0 ){
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIng = {
      ...this.state.ingredients
    };
    updatedIng[type] = updatedCount;
    const priceDeduction = ING_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;
    this.setState({
      ingredients: updatedIng,
      totalPrice: newPrice
    })
    this.updatePurchaseState(updatedIng)
  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    this.setState({loading: true});
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Wojtek',
        address: {
          street: 'Bla bla street',
          country: 'Poland',
          city: 'Burgerowo'
        },
        email: 'customer@example.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(resp => {
        this.setState({
          loading: false,
          purchasing: false
        });
        console.log(resp)
      })
      .catch(error => {
        this.setState({
          loading: false,
          purchasing: false
        });
        console.error(error);
      });
      
  }

  render (){
    const disabledInfo = {
      ...this.state.ingredients
    }
    for (let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0 
    }
    let orderSummary = null;
    
    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if(this.state.ingredients){
      burger = (
        <React.Fragment>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls 
            ingAdded={this.addIngredientHandler}
            ingRemoved={this.removeIngredientHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler} />
        </React.Fragment>)
      
      orderSummary =  (<OrderSummary 
        ingredients={this.state.ingredients} 
        canceled={this.purchaseCancelHandler}
        continued={this.purchaseContinueHandler}
        price={this.state.totalPrice}/>)

    
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

export default withErrorHandler(BurgerBuilder, axios)