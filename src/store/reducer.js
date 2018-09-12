import actions from './actions';

const initialState = {
  ingredients: {
    salad: 0,
    meat: 0,
    bacon: 0,
    cheese: 0 
  },
  totalPrice: 4
};

const ING_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.7
}

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] + 1
        },
        totalPrice: state.totalPrice + ING_PRICES[action.ingredient]
      }
    case actions.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] - 1
        },
        totalPrice: state.totalPrice - ING_PRICES[action.ingredient]

      }
    case actions.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients
      }
    default:
      return state;
  }
  
};

export default reducer;