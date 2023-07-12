import { Container, Paper, Typography } from '@mui/material'

const ServerError = () => {
  return (
        <Container component={Paper}>
            <Typography gutterBottom variant='h5'>
                Server error
            </Typography>
        </Container>
    )
}

export default ServerError