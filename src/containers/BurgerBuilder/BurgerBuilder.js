import React, {Component} from 'react'
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";


const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.4,
    cheese: 1.3,
    meat: 0.7
}

export default class BurgerBuilder extends Component{

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchasedCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchasedContinueHandler = () => {
        alert('Your Continue!')
    }

    updatePurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            }).reduce((sum, el) => {
                return sum + el
            }, 0)
        this.setState({purchasable: sum > 0})

    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients)

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        if(oldCount <= 0){
            return
        }
        const updatedCount = oldCount - 1
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount
        const priceDeduction = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceDeduction
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients)

    }


    render() {

        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing}
                       modalClosed={this.purchasedCancelHandler}>
                    <OrderSummary
                        price={this.state.totalPrice}
                        purchasedContinue={this.purchasedContinueHandler}
                        purchasedCanceled={this.purchasedCancelHandler}
                        ingredients={this.state.ingredients}/>
                </Modal>
               <Burger ingredients={this.state.ingredients}/>
                <div>
                    <BuildControls
                        price={this.state.totalPrice}
                        disabled={disabledInfo}
                         ingrediantRemove={this.removeIngredientHandler}
                        ingredientAdded={this.addIngredientHandler}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </div>

            </Aux>
        )
    }

}