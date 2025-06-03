import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe("pk_test_51RVO9wJBcHgkqCWfsLUpElMuvvUrC8eUiZPmrMh0G33IGvoMjFXnLjtQgjMrInO5WuPDQZYFMbjXLDCNval6dCJt00iERwyvGr");

const StripeConfig = ({ children }) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeConfig;