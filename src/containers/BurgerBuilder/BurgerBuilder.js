import React, {Component} from 'react'
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-order'
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from '../../hoc/withErorHandler/withErrorHandler'
import {connect} from 'react-redux'
import * as actionTypes from '../../store/actions/actionTypes'
import * as burgerBuilderActions from "../../store/actions/index";




class BurgerBuilder extends Component{

    state = {
        purchasing: false,

    }

    componentDidMount() {
       this.props.onInitIngredients()
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchasedCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchasedContinueHandler = () => {

        this.props.history.push('/checkout')

    }

    updatePurchaseState = (ingredients) => {

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            }).reduce((sum, el) => {
                return sum + el
            }, 0)
        return sum > 0

    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type]
    //     const updatedCount = oldCount + 1
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount
    //     const priceAddition = INGREDIENT_PRICES[type]
    //     const oldPrice = this.state.totalPrice
    //     const newPrice = oldPrice + priceAddition
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    //     this.updatePurchaseState(updatedIngredients)
    //
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type]
    //     if(oldCount <= 0){
    //         return
    //     }
    //     const updatedCount = oldCount - 1
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     }
    //     updatedIngredients[type] = updatedCount
    //     const priceDeduction = INGREDIENT_PRICES[type]
    //     const oldPrice = this.state.totalPrice
    //     const newPrice = oldPrice - priceDeduction
    //     this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    //     this.updatePurchaseState(updatedIngredients)
    //
    // }


    render() {

        const disabledInfo = {
            ...this.props.ings
        }
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null

        let burger = this.props.error ? <p>Ingredients can't be loaded </p> : <Spinner/>
        if(this.props.ings){
            burger =  (
                <Aux>
                    <Burger ingredients={this.props.ings}/>

                    <BuildControls
                        price={this.props.price}
                        disabled={disabledInfo}
                        ingrediantRemove={this.props.onIngredientRemoved}
                        ingredientAdded={this.props.onIngredientAdded}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            )
            orderSummary = <OrderSummary
                price={this.props.price}
                purchasedContinue={this.purchasedContinueHandler}
                purchasedCanceled={this.purchasedCancelHandler}
                ingredients={this.props.ings}/>

        }



        return(
            <Aux>
                <Modal show={this.state.purchasing}
                       modalClosed={this.purchasedCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}

            </Aux>
        )
    }

}
const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error
    }

}
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler (BurgerBuilder, axios))
