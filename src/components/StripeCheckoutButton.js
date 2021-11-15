import React from "react";
import StripeCheckout from 'react-stripe-checkout';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { callApi } from '../util';

import 'react-toastify/dist/ReactToastify.css'

const StripeCheckoutButton = ({ apiToken, cart, getCart, price, products }) => {
    const history = useHistory();
    const priceForStripe = price * 100
    const publishableKey = 'pk_test_51JvcBTDj4vIXcYkwnTt6LOnhKUEjXT2kW4c6IbJyNxtcQR4mPkNhLnnDggEzqHVXxVg0WuZY1QmkB7g0NUSFdj3F00N0xpdraW';

    const onToken = token => {
        toast('Payment Successful', { type: 'success' });
        products.map(async (product) => {
            try {
                const orderProd = await callApi ({ url: `orders/${cart.id}/${product.id}`, token: apiToken });
                const response = await callApi ({ url: `order_products/${orderProd.id}`, method: 'DELETE', token})
                if (response) {
                    await getCart();
                }
            } catch (error) {
                console.error (error);
            };
        });
        history.push('/cart')
    };

    return <StripeCheckout
            label="Pay Now"
            name="Awesome Shoe Store"
            billingAddress
            shippingAddress
            image='https://images4.alphacoders.com/292/292538.jpg'
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
};

export default StripeCheckoutButton;