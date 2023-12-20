import * as React from "react";
import {
  Typography,
  Stack,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Radio,
  RadioGroup,
  Divider,
} from "@mui/material";


import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


export default function Poll() {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Add poll</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Stack direction="column" spacing={2}>
          {/* First Question */}
          <Stack direction="row" spacing={2}>
            <Stack direction="column" alignItems="flex-end">
              <Typography align="right">Question</Typography>
            </Stack>
            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
          </Stack>
          <Stack direction="row" spacing={2}>
            <Stack direction="column" alignItems="flex-end">
              <Typography align="right">Possible Response</Typography>
            </Stack>
            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
            <Stack direction="column">
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
              />
            </Stack>
          </Stack>
          {/* Second Question */}
          <Stack direction="row" spacing={2}>
            <Stack direction="column" alignItems="flex-end">
              <Typography align="right">
                Maximum selectable responses
              </Typography>
            </Stack>
            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label-1"
              defaultValue="Single choice"
              name="radio-buttons-group-1"
            >
              <FormControlLabel
                value="Single choice"
                control={<Radio />}
                label="Single choice"
              />
              <FormControlLabel
                value="Unlimited"
                control={<Radio />}
                label="Unlimited"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
                disabled
              />
            </RadioGroup>
          </Stack>


          <Stack direction="row" spacing={2}>
            <Stack direction="column" alignItems="flex-end">
              <Typography align="right">Question 1</Typography>
            </Stack>
            <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label-2"
              defaultValue="Beginning of Chapter"
              name="radio-buttons-group-2"
            >
              <FormControlLabel
                value="Beginning of Chapter"
                control={<Radio />}
                label="Beginning of Chapter"
              />
              <FormControlLabel
                value="End of Chapter"
                control={<Radio />}
                label="End of Chapter"
              />
            </RadioGroup>
          </Stack>


          {/* Add more questions following a similar structure */}
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
}
