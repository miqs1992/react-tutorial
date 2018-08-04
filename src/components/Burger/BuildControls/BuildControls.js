import React from 'react';
import classes from "./BuildControls.css"
import BuildControl from './BuildControl/BuildControl'

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Meat', type: 'meat'},
  {label: 'Bacon', type: 'bacon'}
];

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
    {controls.map(c => <BuildControl 
      label={c.label} 
      key={c.label}
      added={() => props.ingAdded(c.type)}
      removed={() => props.ingRemoved(c.type)}
      disabled={props.disabled[c.type]}/>)}
    <button 
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}>ORDER NOW</button>
  </div>
);

export default buildControls;