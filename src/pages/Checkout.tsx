import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddressForm from "../components/UI/AddressForm/AddressForm";
import PaymentForm from "../components/UI/PaymentForm/PaymentForm";
import Review from "../components/UI/Review/Review";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validationSchema } from "../validation/checkoutValidation";
import agent from "../api/agent";
import { clearBasket } from "../store/shopping-cart/basketSlice";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { LoadingButton } from "@mui/lab";
import { useEffect } from "react";
import { StripeElementType } from "@stripe/stripe-js";
import {
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

const steps = ["Shipping address", "Review your order", "Payment details"];

// TODO remove, this demo shouldn't need to reset the theme.

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0 );
  const [orderNumber, setOrderNumber] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useAppDispatch();

  const [cardState, setCardState] = React.useState<{
    elementError: { [key in StripeElementType]?: string };
  }>({ elementError: {} });

  const [cardComplete, setCardComplete] = React.useState<any>({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
  });
  const [paymentMessage, setPaymentMessage] = React.useState("");
  const [paymentSucceeded, setPaymentSucceeded] = React.useState(false);
  const { basket } = useAppSelector((state) => state.basket);
  const stripe = useStripe();
  const elements = useElements();

  function onCardInputChange(event: any) {
    setCardState({
      ...cardState,
      elementError: {
        ...cardState.elementError,
        [event.elementType]: event.error?.message,
      },
    });
    setCardComplete({ ...cardComplete, [event.elementType]: event.complete });
  }

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <Review />;
      case 2:
        return (
          <PaymentForm
            cardState={cardState}
            onCardInputChange={onCardInputChange}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const currentValidationSchema = validationSchema[activeStep];

  const methods = useForm({
    mode: "onTouched",
    resolver: yupResolver(currentValidationSchema),
  });

  useEffect(() => {
    agent.Account.fetchAddress().then((response) => {
      if (response) {
        methods.reset({
          ...methods.getValues(),
          ...response,
          saveAdress: false,
        });
      }
    });
  }, [methods]);

  async function submitOrder(data: FieldValues) {
    setLoading(true);
    const { nameOnCard, saveAddress, ...shippingAddress } = data;
    if (!stripe || !elements) return; // stripe is not ready

    try {
      const cardElement = elements.getElement(CardNumberElement);
      const paymentResult = await stripe.confirmCardPayment(
        basket?.clientSecret!,
        {
          payment_method: {
            card: cardElement!,
            billing_details: {
              name: nameOnCard,
            },
          },
        }
      );
      console.log(paymentResult);

      if (paymentResult.paymentIntent?.status === "succeeded") {
        const orderNumber = await agent.Orders.create({
          saveAddress,
          shippingAddress,
        });
        setOrderNumber(orderNumber);
        setPaymentSucceeded(true);
        setPaymentMessage("Thank you - we have received your payment");
        setActiveStep(activeStep + 1);
        dispatch(clearBasket());
        setLoading(false);
      } else {
        setPaymentMessage(paymentResult.error?.message!);
        setPaymentSucceeded(false);
        setLoading(false);
        setActiveStep(activeStep + 1);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const handleNext = async (data: FieldValues) => {
    if (activeStep === steps.length - 1) {
      await submitOrder(data);
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  function submitDisabled(): boolean {
    if (activeStep === steps.length - 1) {
      return (
        !cardComplete.cardCvc ||
        !cardComplete.cardExpiry ||
        !cardComplete.cardNumber ||
        !methods.formState.isValid
      );
    } else {
      return !methods.formState.isValid;
    }
  }

  return (
    <FormProvider {...methods}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h4" align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <>
            <Typography variant="h5" gutterBottom>
              {/* Thank you for your order. */}
              {paymentMessage}
            </Typography>
            {paymentSucceeded ? (
              <Typography variant="subtitle1">
                Your order number is #{orderNumber}. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            ) : (
              <Button variant="contained" onClick={handleBack}>
                Go back and try again
              </Button>
            )}
          </>
        ) : (
          <form onSubmit={methods.handleSubmit(handleNext)}>
            {getStepContent(activeStep)}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}
              <LoadingButton
                loading={loading}
                disabled={submitDisabled()}
                variant="contained"
                type="submit"
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStep === steps.length - 1 ? "Place order" : "Next"}
              </LoadingButton>
            </Box>
          </form>
        )}
      </Paper>
    </FormProvider>
  );
}
