import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Checkbox from '@mui/material/Checkbox';

type ElectricalFacilities = {
  isElectrified: boolean;
  hasConnection: boolean;
  wiringComplete: string;
  wiringSafe: string;
  cookingFuel: string;
  stoveType: string;
  bulbsCount: number;
  bulbTypes: string[];
  hasSolar: boolean;
  solarUsage: string;
  solarCondition: string;
  additionalComments: string;
  estimatedBudget: number;
};

type ElectricalFacilitiesError = Partial<Record<keyof ElectricalFacilities, string>>;

type HouseholdData = {
  electricalFacilities?: ElectricalFacilities;
  // ...other fields
};

type Props = {
  householdData: HouseholdData;
  onChange: (section: string, field: string, value: any) => void;
};

const ElectricalFacilitiesForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<ElectricalFacilitiesError>({});
  const safeData = householdData || {};
  const electricalFacilities: ElectricalFacilities = safeData.electricalFacilities || {
    isElectrified: false,
    hasConnection: false,
    wiringComplete: '',
    wiringSafe: '',
    cookingFuel: '',
    stoveType: '',
    bulbsCount: 0,
    bulbTypes: [],
    hasSolar: false,
    solarUsage: '',
    solarCondition: '',
    additionalComments: '',
    estimatedBudget: 0,
  };

  const validate = (field: keyof ElectricalFacilities, value: any) => {
    let error = '';
    if (field === 'isElectrified' && value === undefined) error = 'Required';
    if (field === 'hasConnection' && value === undefined) error = 'Required';
    if (field === 'wiringComplete' && !value) error = 'Required';
    if (field === 'wiringSafe' && !value) error = 'Required';
    if (field === 'cookingFuel' && !value) error = 'Required';
    if (field === 'stoveType' && !value) error = 'Required';
    if (field === 'bulbsCount' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid number';
    if (field === 'bulbTypes' && (!Array.isArray(value) || value.length === 0)) error = 'Select at least one bulb type';
    if (field === 'hasSolar' && value === undefined) error = 'Required';
    if (field === 'solarUsage' && !value) error = 'Required';
    if (field === 'solarCondition' && !value) error = 'Required';
    if (field === 'estimatedBudget' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid number';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };

  const validateAll = () => {
    let valid = true;
    (Object.keys(electricalFacilities) as (keyof ElectricalFacilities)[]).forEach((field) => {
      if (!validate(field, electricalFacilities[field])) valid = false;
    });
    return valid;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          💡 Electrical and Lighting Facilities
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControlLabel
              control={
                <Radio
                  checked={electricalFacilities.isElectrified}
                  onChange={() => onChange('electricalFacilities', 'isElectrified', true)}
                  name="isElectrified"
                  value="true"
                />
              }
              label="Yes"
            />
            <FormControlLabel
              control={
                <Radio
                  checked={!electricalFacilities.isElectrified}
                  onChange={() => onChange('electricalFacilities', 'isElectrified', false)}
                  name="isElectrified"
                  value="false"
                />
              }
              label="No"
            />
            {Boolean(errors.isElectrified) && <Typography color="error">{errors.isElectrified}</Typography>}
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControlLabel
              control={
                <Radio
                  checked={electricalFacilities.hasConnection}
                  onChange={() => onChange('electricalFacilities', 'hasConnection', true)}
                  name="hasConnection"
                  value="true"
                />
              }
              label="Yes"
            />
            <FormControlLabel
              control={
                <Radio
                  checked={!electricalFacilities.hasConnection}
                  onChange={() => onChange('electricalFacilities', 'hasConnection', false)}
                  name="hasConnection"
                  value="false"
                />
              }
              label="No"
            />
            {Boolean(errors.hasConnection) && <Typography color="error">{errors.hasConnection}</Typography>}
          </Box>
          <TextField
            select
            label="Is wiring complete?"
            value={electricalFacilities.wiringComplete}
            onChange={(e) => {
              const value = e.target.value;
              onChange('electricalFacilities', 'wiringComplete', value);
              validate('wiringComplete', value);
            }}
            fullWidth
            error={Boolean(errors.wiringComplete)}
            helperText={errors.wiringComplete}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="Fully Wired">Fully Wired</MenuItem>
            <MenuItem value="Partially Wired">Partially Wired</MenuItem>
          </TextField>
          <TextField
            select
            label="Is wiring safe?"
            value={electricalFacilities.wiringSafe}
            onChange={(e) => {
              const value = e.target.value;
              onChange('electricalFacilities', 'wiringSafe', value);
              validate('wiringSafe', value);
            }}
            fullWidth
            error={Boolean(errors.wiringSafe)}
            helperText={errors.wiringSafe}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="Safe">Safe</MenuItem>
            <MenuItem value="Unsafe">Unsafe</MenuItem>
            <MenuItem value="Requires Rewiring">Requires Rewiring</MenuItem>
          </TextField>
          <TextField
            select
            label="Cooking Fuel Used"
            value={electricalFacilities.cookingFuel}
            onChange={(e) => {
              const value = e.target.value;
              onChange('electricalFacilities', 'cookingFuel', value);
              validate('cookingFuel', value);
            }}
            fullWidth
            error={Boolean(errors.cookingFuel)}
            helperText={errors.cookingFuel}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="LPG">LPG</MenuItem>
            <MenuItem value="Firewood">Firewood</MenuItem>
            <MenuItem value="Kerosene">Kerosene</MenuItem>
            <MenuItem value="Induction">Induction</MenuItem>
            <MenuItem value="Biogas">Biogas</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </TextField>
          <TextField
            select
            label="Type of Stove Used"
            value={electricalFacilities.stoveType}
            onChange={(e) => {
              const value = e.target.value;
              onChange('electricalFacilities', 'stoveType', value);
              validate('stoveType', value);
            }}
            fullWidth
            error={Boolean(errors.stoveType)}
            helperText={errors.stoveType}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="Single Burner">Single Burner</MenuItem>
            <MenuItem value="Double Burner">Double Burner</MenuItem>
            <MenuItem value="Traditional Stove">Traditional Stove</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </TextField>
          <TextField
            label="Number of Bulbs"
            type="number"
            value={electricalFacilities.bulbsCount}
            onChange={(e) => {
              const value = e.target.value;
              onChange('electricalFacilities', 'bulbsCount', parseInt(value) || 0);
              validate('bulbsCount', value);
            }}
            fullWidth
            error={Boolean(errors.bulbsCount)}
            helperText={errors.bulbsCount}
          />
          <TextField
            select
            label="Types of Bulbs Used"
            multiple
            value={electricalFacilities.bulbTypes}
            onChange={(e) => {
              const options = Array.from(e.target.selectedOptions, option => option.value);
              onChange('electricalFacilities', 'bulbTypes', options);
              validate('bulbTypes', options);
            }}
            fullWidth
            error={Boolean(errors.bulbTypes)}
            helperText={errors.bulbTypes}
          >
            <MenuItem value="Incandescent">Incandescent</MenuItem>
            <MenuItem value="CFL">CFL</MenuItem>
            <MenuItem value="LED">LED</MenuItem>
          </TextField>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControlLabel
              control={
                <Radio
                  checked={electricalFacilities.hasSolar}
                  onChange={() => onChange('electricalFacilities', 'hasSolar', true)}
                  name="hasSolar"
                  value="true"
                />
              }
              label="Yes"
            />
            <FormControlLabel
              control={
                <Radio
                  checked={!electricalFacilities.hasSolar}
                  onChange={() => onChange('electricalFacilities', 'hasSolar', false)}
                  name="hasSolar"
                  value="false"
                />
              }
              label="No"
            />
            {Boolean(errors.hasSolar) && <Typography color="error">{errors.hasSolar}</Typography>}
          </Box>
          <TextField
            label="Solar Setup used for"
            value={electricalFacilities.solarUsage}
            onChange={(e) => {
              const value = e.target.value;
              onChange('electricalFacilities', 'solarUsage', value);
              validate('solarUsage', value);
            }}
            fullWidth
            error={Boolean(errors.solarUsage)}
            helperText={errors.solarUsage}
          />
          <TextField
            select
            label="Current Condition of Solar System"
            value={electricalFacilities.solarCondition}
            onChange={(e) => {
              const value = e.target.value;
              onChange('electricalFacilities', 'solarCondition', value);
              validate('solarCondition', value);
            }}
            fullWidth
            error={Boolean(errors.solarCondition)}
            helperText={errors.solarCondition}
          >
            <MenuItem value="">Select</MenuItem>
            <MenuItem value="Functional">Functional</MenuItem>
            <MenuItem value="Needs Maintenance">Needs Maintenance</MenuItem>
            <MenuItem value="Not Working">Not Working</MenuItem>
          </TextField>
          <TextField
            label="Additional Comments or Issues"
            multiline
            rows={4}
            value={electricalFacilities.additionalComments}
            onChange={(e) => {
              const value = e.target.value;
              onChange('electricalFacilities', 'additionalComments', value);
            }}
            fullWidth
          />
          <TextField
            label="Estimated Budget"
            type="number"
            value={electricalFacilities.estimatedBudget}
            onChange={(e) => {
              const value = e.target.value;
              onChange('electricalFacilities', 'estimatedBudget', parseInt(value) || 0);
              validate('estimatedBudget', value);
            }}
            fullWidth
            error={Boolean(errors.estimatedBudget)}
            helperText={errors.estimatedBudget}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default ElectricalFacilitiesForm; 