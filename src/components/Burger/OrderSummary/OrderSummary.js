import React, {Component} from 'react';
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
  render () {
    const ingredientSummary = Object.keys(this.props.ingredients).map(ing => {
      return (
        <li key={ing}>
          <span style={{textTransform: 'capitalize'}}>{ing}</span>: {this.props.ingredients[ing]}
        </li>)
    })
    return (
      <React.Fragment>
        <h3>Your order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button btnType="Danger" clicked={this.props.canceled}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.continued}>CONTINUE</Button>
      </React.Fragment>
    )
  }
};

export default OrderSummary;