import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import { FormValidator } from './validation';

type Entitlement = {
  landOwnershipDocument: boolean;
  rationCardAvailable: boolean;
  rationCardType: string;
  healthInsurance: boolean;
  employeeCard: boolean;
  homelessSupportScheme: boolean;
  remarks: string;
};

type EntitlementsError = {
  entitlementType?: string;
  entitlementId?: string;
  yearReceived?: string;
};

type EntitlementsData = {
  entitlementType: string;
  entitlementId: string;
  yearReceived: number;
};

type Props = {
  householdData: { entitlements: EntitlementsData };
  onChange: (section: string, field: string, value: any) => void;
};

const EntitlementsForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState({
    entitlementType: '', entitlementId: '', yearReceived: ''
  });
  const entitlementTypes = [
    '',
    'Ration Card',
    'Health Insurance',
    'Employee Card',
    'Homeless Support Scheme',
    'Land Ownership Document',
    'Other',
  ];
  const currentYear = new Date().getFullYear();
  const validate = (field: keyof EntitlementsData, value: any) => {
    let error = '';
    if (field === 'entitlementType') error = FormValidator.validateDropdown(value) || '';
    if (field === 'entitlementId') error = !/^[a-zA-Z0-9\-]+$/.test(value) ? 'Entitlement ID must be alphanumeric' : (!value ? 'Entitlement ID is required' : '');
    if (field === 'yearReceived') {
      const num = Number(value);
      const currentYear = new Date().getFullYear();
      if (!value) error = 'Year is required';
      else if (isNaN(num) || num < 1900 || num > currentYear) error = `Enter a valid year (${1900}-${currentYear})`;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };
  const validateAll = () => {
    let valid = true;
    (['entitlementType', 'entitlementId', 'yearReceived'] as (keyof EntitlementsError)[]).forEach((field) => {
      if (!validate(field, householdData.entitlements[field])) valid = false;
    });
    return valid;
  };
  return (
    <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, maxWidth: 700, mx: 'auto', mt: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={2} color="primary.main">
        Entitlements
      </Typography>
      <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={2}>
        <TextField
          select
          label="Entitlement Type"
          value={householdData.entitlements.entitlementType ?? ''}
          onChange={e => { onChange('entitlements', 'entitlementType', e.target.value); validate('entitlementType', e.target.value); }}
          onBlur={e => validate('entitlementType', e.target.value)}
          error={!!errors.entitlementType}
          helperText={errors.entitlementType || 'Select entitlement type'}
          required
          fullWidth
        >
          {entitlementTypes.map(type => (
            <MenuItem key={type} value={type}>{type || 'Select Entitlement Type'}</MenuItem>
          ))}
        </TextField>
        <TextField
          label="Entitlement ID"
          value={householdData.entitlements.entitlementId}
          onChange={e => { onChange('entitlements', 'entitlementId', e.target.value); validate('entitlementId', e.target.value); }}
          onBlur={e => validate('entitlementId', e.target.value)}
          error={!!errors.entitlementId}
          helperText={errors.entitlementId || 'Enter alphanumeric ID'}
          required
          fullWidth
        />
        <TextField
          label="Year Received"
          type="number"
          inputProps={{ min: 1900, max: currentYear }}
          value={householdData.entitlements.yearReceived}
          onChange={e => { onChange('entitlements', 'yearReceived', e.target.value === '' ? '' : parseInt(e.target.value)); validate('yearReceived', e.target.value); }}
          onBlur={e => validate('yearReceived', e.target.value)}
          error={!!errors.yearReceived}
          helperText={errors.yearReceived || `Enter year (${1900}-${currentYear})`}
          required
          fullWidth
        />
      </Box>
    </Paper>
  );
};
export default EntitlementsForm; 