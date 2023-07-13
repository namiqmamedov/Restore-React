import { Button, ButtonGroup, Typography } from '@mui/material'
import { useAppDispatch } from '../store/configureStore';

const Contact = () => {
  const dispatch = useAppDispatch();
  // const {data,title} = useAppSelector(state => state.title)
  return (
    <>
      <Typography variant='h2'>
        {/* {data} and {title} */}
    </Typography>
    <ButtonGroup>
      {/* <Button onClick={() => dispatch(decrement())} variant='contained'>Decrement</Button>
      <Button onClick={() => dispatch(increment())} variant='contained'>Increment</Button> */}
    </ButtonGroup>
    </>
  )
}

export default Contact