import { Button, ButtonGroup, Container, Typography } from '@mui/material'
import agent from '../api/agent'

const About = () => {
  return (
    <Container>
      <Typography gutterBottom variant='h2'>Erros for testing purposes</Typography>
      <ButtonGroup fullWidth>
        <Button variant='contained' onClick={() => agent.TestErrors.get400Error().catch(error => console.log(error))}>Test 400 Error</Button>
      </ButtonGroup>
    </Container>
  )
}

export default About