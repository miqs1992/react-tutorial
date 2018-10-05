import actions from '../actions/actions';
import {updateObject} from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  fetchError: false,
  loading: true
};

const ING_PRICES = {
  salad: 0.5,
  bacon: 0.4,
  cheese: 1.3,
  meat: 0.7
}

const addIngredient = (state, action) => {
  const updatedIng = { [action.ingredient]: state.ingredients[action.ingredient] + 1 };
  const updatedIngs = updateObject(state.ingredients, updatedIng);
  const updatedState = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice + ING_PRICES[action.ingredient]
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIng = { [action.ingredient]: state.ingredients[action.ingredient] - 1 };
  const updatedIngs = updateObject(state.ingredients, updatedIng);
  const updatedState = {
    ingredients: updatedIngs,
    totalPrice: state.totalPrice - ING_PRICES[action.ingredient]
  };
  return updateObject(state, updatedState);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    fetchError: false,
    loading: false,
    totalPrice: 4
  })
};

const setError = (state) => {
  return updateObject(state, {
    fetchError: true,
    loading: false
  })
};

const reducer = (state = initialState, action) => {
  switch(action.type){
    case actions.ADD_INGREDIENT: return addIngredient(state, action);
    case actions.REMOVE_INGREDIENT: return removeIngredient(state, action);
    case actions.SET_INGREDIENTS: return setIngredients(state, action);
    case actions.SET_ERROR: return setError(state);
    default: return state;
  }
};

export default reducer;