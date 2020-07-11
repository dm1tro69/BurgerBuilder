import * as actionType from './actionTypes'
import axios from "../../axios-order";

export const addIngredient = (name) => {
    return{
        type: actionType.ADD_INGREDIENT,
        ingredientName: name
    }
}
export const removeIngredient = (name) => {
    return{
        type: actionType.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionType.FETCH_INGREDIENTS_FAILED
    }
}

export const setIngredients = (ingredients) => {
    return {
         type: actionType.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://burger-92fde.firebaseio.com/ingredients.json')
            .then(res => {
                dispatch(setIngredients(res.data))

            })
            .catch(error => {
                dispatch(fetchIngredientsFailed())
            })
    }
}