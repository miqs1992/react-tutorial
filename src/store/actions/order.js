import actions from './actions';
import axios from '../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => {
  return{
    type: actions.PURCHASE_BURGER_SUCCESS, orderId: id, orderData: orderData
  }
}

export const purchaseBurgerFail = (error) => {
  return {
    type: actions.PURCHASE_BURGER_FAIL, error: error
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actions.PURCHASE_BURGER_START
  }
}

export const purchaseBurger = (orderData) => {
  return dispatch => {
    dispatch(purchaseBurgerStart())
    axios.post('/orders.json', orderData)
      .then(resp => {
        dispatch(purchaseBurgerSuccess(resp.data.name, orderData))
      })
      .catch(error => {
        dispatch(purchaseBurgerFail(error))
      });
  }
}

export const purchaseInit = () => {
  return {
    type: actions.PURCHASE_INIT
  }
}

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actions.FETCH_ORDERS_SUCCESS,
    orders: orders 
  };
}

export const fetchOrdersFail = (error) => {
  return {
    type: actions.FETCH_ORDERS_FAIL,
    error: error
  };
}

export const fetchOrdersStart = () => {
  return {
    type: actions.FETCH_ORDERS_START
  };
}

export const fetchOrders = () => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    axios.get('/orders.json')
     .then(res => {
        const orders = Object.keys(res.data).map(key => {
          return {
            id: key,
            ...res.data[key]
          }
        });
        dispatch(fetchOrdersSuccess(orders));
     })
     .catch(error => {
        dispatch(fetchOrdersFail(error));
     })
  }
}