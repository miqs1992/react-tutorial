import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withError from '../../hoc/withErrorHandler/withErrorHandler'
import { fetchOrders } from '../../store/actions/order'
import { connect } from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
  componentDidMount () {
    this.props.onFetchOrders();
  }

  render () {
    let orders = <Spinner />
    if(!this.props.loading){
      orders = this.props.orders.map(o => 
        <Order 
          key={o.id} 
          ingredients={o.ingredients}
          price={o.price}/>
      )
    }
    
    return (
      <div>
       {orders}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(fetchOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withError(Orders, axios))