import React from 'react';
import { SingleOrder } from '.';
const Orders = ({ orders }) => {
    return orders
        ? <>
            <div className='orders'>
                <h2>All Orders</h2>
                { orders.map(order => <SingleOrder key={order.id} order={order} />)}
            </div>
         </> 
        : null
};

export default Orders;