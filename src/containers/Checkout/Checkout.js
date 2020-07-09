import React, {Component} from 'react'
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from "react-router";
import ContactData from "./ContactData/ContactData";
import {connect} from 'react-redux'

class Checkout extends Component{


    onCheckoutCanceledHandler = () => {
        this.props.history.goBack()

    }

    onCheckoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')

    }

    render() {
        return(
            <div>
               <CheckoutSummary
                   onCheckoutCanceled={this.onCheckoutCanceledHandler}
                   onCheckoutContinued={this.onCheckoutContinuedHandler}

                   ingredients={this.props.ings}/>
                   <Route
                       path={this.props.match.path + '/contact-data'}
                       component={ContactData}/>
            </div>
        )
    }

}
const mapStoreToProps = state => {
    return {
      ings: state.ingredients
    }
}




export default connect(mapStoreToProps)(Checkout)