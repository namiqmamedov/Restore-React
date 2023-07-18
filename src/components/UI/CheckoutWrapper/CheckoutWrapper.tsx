import { Elements } from '@stripe/react-stripe-js'
import Checkout from '../../../pages/Checkout'
import { loadStripe } from '@stripe/stripe-js'
import { useAppDispatch } from '../../../store/configureStore'
import { useEffect, useState } from 'react'
import agent from '../../../api/agent'
import { setBasket } from '../../../store/shopping-cart/basketSlice'
import Loading from '../../../common/Loading/Loading'

const stripePromise = loadStripe('pk_test_51NUy0FDAm9kYt48Yjdz2qvU8rSZWbBfZ3w98HEBRfnprUEYPKHfr5ani2GcDFcOVRlCIcyzNjIsJ5HSCovBQxSty00hS864rUc')

const CheckoutWrapper = () => {
  const dispatch = useAppDispatch();
  const [loading,setLoading] = useState(true);

  useEffect(() => {
      agent.Payments.createPaymentIntent()
        .then(basket => dispatch(setBasket(basket)))
        .catch(error => console.log(error))
        .finally(() => setLoading(false))
  },[dispatch])

  if(loading) return <Loading/>
  

  return (
   <Elements stripe={stripePromise}>
      <Checkout/>
   </Elements>
  )
}

export default CheckoutWrapper