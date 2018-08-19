import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withError from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }
  componentDidMount () {
    axios.get('/orders.json')
     .then(res => {
        const orders = Object.keys(res.data).map(key => {
          return {
            id: key,
            ...res.data[key]
          }
        });
        this.setState({
          loading: false,
          orders: orders
        })
     })
     .catch(error => {
        this.setState({loading: false})
     })
  }

  render () {
    const orders = this.state.orders.map(o => 
      <Order 
        key={o.id} 
        ingredients={o.ingredients}
        price={o.price}/>
    )
    return (
      <div>
       {orders}
      </div>
    );
  }
}

export default withError(Orders, axios)