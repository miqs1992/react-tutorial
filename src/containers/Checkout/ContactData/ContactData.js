import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './ContactData.css'
import axios from '../../../axios-orders'

class ContactData extends Component {
  state = {
    laoding: false,
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
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
          loading: false
        });
        console.log(resp);
        this.props.history.push("/")
      })
      .catch(error => {
        this.setState({
          loading: false
        });
        console.error(error);
      });
    
  }

  render () {
    let form = (
      <form>
          <input className={classes.Input} type="text" name='name' placeholder='Your Name' />
          <input className={classes.Input} type="text" name='email' placeholder='Your Mail' />
          <input className={classes.Input} type="text" name='street' placeholder='Street' />
          <input className={classes.Input} type="text" name='postal' placeholder='Postal Code' />
          <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
        </form>
    ) ;
    if (this.state.loading){
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

export default ContactData;