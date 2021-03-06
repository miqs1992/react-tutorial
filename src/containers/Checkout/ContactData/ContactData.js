import React, { Component } from 'react'
import { connect } from 'react-redux'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import {purchaseBurger} from '../../../store/actions/order'

class ContactData extends Component {
  state = {
    formIsValid: false,
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zipcode'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
          maxLength: 6
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your e-mail'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', display: 'Fastest'},
            {value: 'cheapest', display: 'Cheapest'}
          ]
        },
        value: 'fastest',
        validation: {},
        valid: true
      }
    }
  }

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    Object.entries(this.state.orderForm).forEach(([key, data]) => {
      formData[key] = data.value;
    });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData 
    }
    this.props.onOrderCreated(order)
  }

  checkValidity = (value, rules) => {
    let isValid = true;
    if(rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  inputChangedHandler = (event, id) => {
    const newOrderForm = {
      ...this.state.orderForm
    }

    const updatedFormElement = {
      ...newOrderForm[id]
    }

    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    newOrderForm[id] = updatedFormElement

    let formIsValid = true;
    Object.values(newOrderForm).forEach(item => {
      formIsValid = item.valid && formIsValid
    })
    this.setState({
      orderForm: newOrderForm,
      formIsValid: formIsValid
    })
    
  }

  render () {
    const formElement = Object.entries(this.state.orderForm).map(entry => {
      return {
        id: entry[0],
        config: entry[1]
      }
    })
    let form = (
      <form onSubmit={this.orderHandler}>
          {formElement.map(ele => (
            <Input 
              key = {ele.id}
              elementType={ele.config.elementType} 
              elementConfig={ele.config.elementConfig} 
              value={ele.config.value} 
              changed={(event) => this.inputChangedHandler(event, ele.id)}
              invalid={!ele.config.valid}
              shouldValidate={ele.config.validation}
              touched={ele.config.touched}/>
          ))}
          <Button btnType='Success' clicked={this.orderHandler} disabled={!this.state.formIsValid}>ORDER</Button>
        </form>
    ) ;
    if (this.props.loading){
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Entry you Contact Data</h4>
        {form}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burderBuilder.ingredients,
    price: state.burderBuilder.totalPrice,
    loading: state.order.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderCreated: (orderData) => {dispatch(purchaseBurger(orderData))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));