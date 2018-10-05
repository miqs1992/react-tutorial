import actions from '../actions/actions';
import {updateObject} from '../utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.PURCHASE_BURGER_SUCCESS:
      const newOrder = updateObject(action.orderData, {id: action.orderId});
      const orders = state.orders.concat(newOrder)
      return updateObject(state, {
        loading: false,
        orders: orders,
        purchased: true
      });
    case actions.PURCHASE_BURGER_FAIL:
      return updateObject(state, {loading: false});
    case actions.PURCHASE_BURGER_START:
      return updateObject(state, {loading: true});
    case actions.PURCHASE_INIT:
      return updateObject(state, {purchased: false});
    case actions.FETCH_ORDERS_START:
      return updateObject(state, {loading: true});
    case actions.FETCH_ORDERS_SUCCESS:
      return updateObject(state, {
        orders: action.orders,
        loading: false
      });
    case actions.FETCH_ORDERS_FAIL:
      return updateObject(state, {loading: false});
    default:
      return state;
  }
};

export default reducer;