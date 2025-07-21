import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { FormValidator } from './validation';

type BasicHouseholdInfoError = {
  headOfHousehold?: string;
  householdSize?: string;
  address?: string;
};

type BasicHouseholdInfoData = {
  headOfHousehold: string;
  householdSize: number;
  address: string;
};

type Props = {
  householdData: BasicHouseholdInfoData;
  onChange: (field: string, value: any) => void;
};

const BasicHouseholdInfoForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<Required<BasicHouseholdInfoError>>({ headOfHousehold: '', householdSize: '', address: '' });

  // Validation logic
  const validate = (field: keyof BasicHouseholdInfoError, value: any) => {
    let error = '';
    if (field === 'headOfHousehold') error = FormValidator.validateName(FormValidator.sanitize(value)) || '';
    if (field === 'householdSize') error = FormValidator.validateNumber(value, { min: 1, max: 30, integer: true }) || '';
    if (field === 'address') error = FormValidator.validateText(FormValidator.sanitize(value), { minLength: 5, maxLength: 200 }) || '';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };

  const validateAll = () => {
    let valid = true;
    (['headOfHousehold', 'householdSize', 'address'] as (keyof BasicHouseholdInfoError)[]).forEach((field) => {
      if (!validate(field, householdData[field])) valid = false;
    });
    return valid;
  };

  return (
    <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, maxWidth: 500, mx: 'auto', mt: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={2} color="primary.main">
        Basic Household Info
      </Typography>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Head of Household"
          value={householdData.headOfHousehold ?? ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const val = FormValidator.sanitize(e.target.value);
            onChange('headOfHousehold', val);
            validate('headOfHousehold', val);
          }}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => validate('headOfHousehold', FormValidator.sanitize(e.target.value))}
          error={Boolean(errors.headOfHousehold)}
          helperText={errors.headOfHousehold || 'Enter the name of the head of household'}
          required
          fullWidth
          // Fixed pattern: only letters, spaces, apostrophes, hyphens
          inputProps={{ pattern: "[a-zA-Z\s'-]+", minLength: 2, maxLength: 50, 'aria-label': 'Head of Household' }}
        />
        <TextField
          label="Household Size"
          type="number"
          inputProps={{ min: 1, max: 30, step: 1, 'aria-label': 'Household Size' }}
          value={householdData.householdSize === 0 ? '' : householdData.householdSize}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const val = e.target.value === '' ? '' : parseInt(e.target.value);
            onChange('householdSize', val);
            validate('householdSize', val);
          }}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => validate('householdSize', e.target.value)}
          error={Boolean(errors.householdSize)}
          helperText={errors.householdSize || 'Enter the total number of people in the household'}
          required
          fullWidth
        />
        <TextField
          label="Address"
          value={householdData.address ?? ''}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const val = FormValidator.sanitize(e.target.value);
            onChange('address', val);
            validate('address', val);
          }}
          onBlur={(e: React.FocusEvent<HTMLInputElement>) => validate('address', FormValidator.sanitize(e.target.value))}
          error={Boolean(errors.address)}
          helperText={errors.address || 'Enter the full address'}
          required
          fullWidth
          inputProps={{ minLength: 5, maxLength: 200, 'aria-label': 'Address' }}
        />
      </Box>
    </Paper>
  );
};

export default BasicHouseholdInfoForm; 