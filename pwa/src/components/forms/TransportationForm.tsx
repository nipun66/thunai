import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';

type TransportationFacility = {
  accessPathType: string;
  distanceToMainRoad: number;
  pathCondition: string;
  vehicleOwned: string;
  additionalNotes: string;
};

type HouseholdData = {
  transportation?: {
    vehicleType: string;
    vehicleCount: number;
  };
  // ...other fields
};

type Props = {
  householdData: HouseholdData;
  onChange: (section: string, field: string, value: any) => void;
};

type TransportationError = {
  vehicleType?: string;
  vehicleCount?: string;
};

const TransportationForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<TransportationError>({});
  const safeData = householdData || {};
  const transportation = safeData.transportation || { vehicleType: '', vehicleCount: 0 };
  const vehicleType = transportation.vehicleType || '';
  const vehicleCount = transportation.vehicleCount ?? '';

  type TransportationField = 'vehicleType' | 'vehicleCount';

  const validate = (field: TransportationField, value: any) => {
    let error = '';
    if (field === 'vehicleType' && !value) error = 'Vehicle type is required';
    if (field === 'vehicleCount' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid number of vehicles';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };

  const validateAll = () => {
    let valid = true;
    (['vehicleType', 'vehicleCount'] as TransportationField[]).forEach((field) => {
      if (!validate(field, transportation[field])) valid = false;
    });
    return valid;
  };

  const vehicleTypes = [
    '',
    'Bicycle',
    'Motorcycle',
    'Car',
    'Auto',
    'Tractor',
    'None',
  ];

  return (
    <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, maxWidth: 700, mx: 'auto', mt: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={2} color="primary.main">
        🚗 Transportation
      </Typography>
      <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={2}>
        <TextField
          select
          label="Vehicle Type"
          value={vehicleType}
          onChange={e => { onChange('transportation', 'vehicleType', e.target.value); validate('vehicleType', e.target.value); }}
          onBlur={e => validate('vehicleType', e.target.value)}
          error={Boolean(errors.vehicleType)}
          helperText={errors.vehicleType || 'Select vehicle type'}
          required
          fullWidth
        >
          {vehicleTypes.map((type) => (
            <MenuItem key={type} value={type}>{type || 'Select Vehicle Type'}</MenuItem>
          ))}
        </TextField>
        <TextField
          label="Number of Vehicles"
          type="number"
          inputProps={{ min: 0 }}
          value={vehicleCount}
          onChange={e => { onChange('transportation', 'vehicleCount', e.target.value === '' ? '' : parseInt(e.target.value)); validate('vehicleCount', e.target.value); }}
          onBlur={e => validate('vehicleCount', e.target.value)}
          error={Boolean(errors.vehicleCount)}
          helperText={errors.vehicleCount || 'Enter number of vehicles'}
          required
          fullWidth
        />
      </Box>
    </Paper>
  );
};
export default TransportationForm; 