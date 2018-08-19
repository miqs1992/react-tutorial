import React from 'react';
import classes from './Order.css'

const order = (props) => {
  const ingredients = Object.keys(props.ingredients).map(i => {
    return {
      name: i,
      amount: props.ingredients[i]
    }
  });

  const ingOutput = ingredients.map(i => {
    return <span 
      style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px'
      }}
      key={i.name}>
      {i.name} ({i.amount})
    </span>
  });
  
  return (
    <div className={classes.Order}>
      <p>Ingredient: {ingOutput}</p>
      <p>Price: <strong>$ {parseFloat(props.price).toFixed(2)}</strong></p>
    </div>
  );
};

export default order;