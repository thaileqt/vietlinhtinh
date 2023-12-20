import React from "react";
import Select from "@mui/material/Select";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import AddLinkIcon from "@mui/icons-material/AddLink";
import CampaignIcon from "@mui/icons-material/Campaign";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";

import { styled, Stack, MenuItem, InputLabel, FormControl } from "@mui/material";


import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";


const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  "& .MuiToggleButtonGroup-grouped": {
    margin: theme.spacing(0.5),
    border: 0,
    "&.Mui-disabled": {
      border: 0,
    },
    "&:not(:first-of-type)": {
      borderRadius: theme.shape.borderRadius,
    },
    "&:first-of-type": {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));
export default function Toolbar() {
  const [textFormat, setTextFormat] = React.useState("p");
  const handleTextFormatChange = (event) => {
    setTextFormat(event.target.value);
  };


  const [formats, setFormats] = React.useState(() => ["bold", "italic"]);
  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };


  const [alignment, setAlignment] = React.useState("left");
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };


  return (
    <div>
      <Stack direction="row" width="100%">
        <FormControl variant="filled" sx={{ minWidth: 120, padding: "5px" }}>
          <InputLabel id="demo-simple-select-filled-label">
            Text Format
          </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={textFormat}
            onChange={handleTextFormatChange}
          >
            <MenuItem value="p">
              <em>Paragraph</em>
            </MenuItem>
            <MenuItem value="h1">Heading1</MenuItem>
            <MenuItem value="h2">Heading2</MenuItem>
            <MenuItem value="h3">Heading3</MenuItem>
            <MenuItem value="h4">Heading4</MenuItem>
            <MenuItem value="h5">Heading5</MenuItem>
            <MenuItem value="h6">Heading6</MenuItem>
          </Select>
        </FormControl>


        <div>
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              //   border: (theme) => `1px solid ${theme.palette.divider}`,
              flexWrap: "wrap",
              backgroundColor: "rgb(233, 233, 233, 0.5)",
            }}
          >
            <StyledToggleButtonGroup
              size="small"
              value={formats}
              onChange={handleFormat}
              aria-label="text formatting"
            >
              <ToggleButton value="bold" aria-label="bold">
                <FormatBoldIcon />
              </ToggleButton>
              <ToggleButton value="italic" aria-label="italic">
                <FormatItalicIcon />
              </ToggleButton>
              <ToggleButton value="underlined" aria-label="underlined">
                <FormatUnderlinedIcon />
              </ToggleButton>
              <ToggleButton value="color" aria-label="color" disabled>
                <FormatColorTextIcon />
                <ArrowDropDownIcon />
              </ToggleButton>
              <ToggleButton value="color" aria-label="color" disabled>
                <FormatColorFillIcon />
                <ArrowDropDownIcon />
              </ToggleButton>
              <ToggleButton value="quote" aria-label="quote" disabled>
                <FormatQuoteIcon />
              </ToggleButton>
              <ToggleButton value="bulleted" aria-label="bulleted" disabled>
                <FormatListBulletedIcon />
                <ArrowDropDownIcon />
              </ToggleButton>
              <ToggleButton value="numbered" aria-label="numbered" disabled>
                <FormatListNumberedIcon />
                <ArrowDropDownIcon />
              </ToggleButton>
            </StyledToggleButtonGroup>


            <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />


            <StyledToggleButtonGroup
              size="small"
              value={alignment}
              exclusive
              onChange={handleAlignment}
              aria-label="text alignment"
            >
              <ToggleButton value="left" aria-label="left aligned">
                <FormatAlignLeftIcon />
              </ToggleButton>
              <ToggleButton value="center" aria-label="centered">
                <FormatAlignCenterIcon />
              </ToggleButton>
              <ToggleButton value="right" aria-label="right aligned">
                <FormatAlignRightIcon />
              </ToggleButton>
              <ToggleButton value="justify" aria-label="justified" disabled>
                <FormatAlignJustifyIcon />
              </ToggleButton>
            </StyledToggleButtonGroup>


            <Divider flexItem orientation="vertical" sx={{ mx: 0.5, my: 1 }} />


            <StyledToggleButtonGroup>
              <ToggleButton disabled value="photo" aria-label="photo">
                <AddPhotoAlternateIcon />
              </ToggleButton>
              <ToggleButton disabled value="campaign" aria-label="campaign">
                <CampaignIcon />
              </ToggleButton>
              <ToggleButton disabled value="link" aria-label="link">
                <AddLinkIcon />
              </ToggleButton>
            </StyledToggleButtonGroup>
          </Paper>
        </div>
      </Stack>
    </div>
  );
}
