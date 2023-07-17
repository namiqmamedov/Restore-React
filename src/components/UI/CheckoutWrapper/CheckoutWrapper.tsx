import { Elements } from '@stripe/react-stripe-js'
import Checkout from '../../../pages/Checkout'
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_51NUy0FDAm9kYt48Yjdz2qvU8rSZWbBfZ3w98HEBRfnprUEYPKHfr5ani2GcDFcOVRlCIcyzNjIsJ5HSCovBQxSty00hS864rUc')

const CheckoutWrapper = () => {
  return (
   <Elements stripe={stripePromise}>
      <Checkout/>
   </Elements>
  )
}

export default CheckoutWrapper