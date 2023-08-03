import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Faq() {
  const [expanded, setExpanded] = React.useState<string | false>(false);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <div>
        <h2 className='mt-5'>How can we help you?</h2>
        <div className="accordion-item mt-4">
        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
          How can I place an order?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          To place an order, simply browse our website, add the desired products to your shopping cart, 
          proceed to checkout, and follow the instructions to complete the purchase.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>What payment methods do you accept?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          We accept various payment methods, including credit/debit cards, PayPal, and other secure online payment gateways.
           You can choose the most convenient option during the checkout process.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
          Do you offer international shipping?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Yes, we offer international shipping to most countries. Shipping costs and delivery times may vary depending on the destination.
           Please check the shipping details during the checkout process.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Is my personal information safe on your website?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
           Yes, we take the security of your personal information seriously. Our website uses encryption technology 
           to protect your data during transmission.
           Please review our Privacy Policy to learn more about how we handle your information.
          </Typography>
        </AccordionDetails>
      </Accordion>
        </div>
    </div>
  );
}
