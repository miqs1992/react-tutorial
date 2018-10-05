import actions from './actions';
import axios from '../../axios-orders'

export const addIngredient = (ingredient) => {
  return {type: actions.ADD_INGREDIENT, ingredient: ingredient}
};

export const removeIngredient = (ingredient) => {
  return {type: actions.REMOVE_INGREDIENT, ingredient: ingredient}
};

const setIngredients = (ingredients) => {
  return {type: actions.SET_INGREDIENTS, ingredients: ingredients}
}

const setError = () => {
  return {type: actions.SET_ERROR}
}

export const initIngredients = () => {
  return dispatch => {
    axios.get('/ingredients.json')
      .then(responce => {
        dispatch(setIngredients(responce.data))
      })
      .catch(error => {
        dispatch(setError())
      });
  }
};