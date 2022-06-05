import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckboxLabels() {
  return (
    <FormGroup sx={{boxSizing : 'border-box'}} p={3}>
      <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
      <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />

      <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
      <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
      <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
      <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
      <FormControlLabel control={<Checkbox defaultChecked />} label="Label" />

    </FormGroup>
  );
}