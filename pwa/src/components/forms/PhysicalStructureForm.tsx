import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { FormValidator } from './validation';

type HousingDetail = {
  completionStatus: string;
  ageOfHouse: number;
  currentCondition: string;
  roofMaterial: string;
  roofCondition: string;
  roofBudget: number;
  wallMaterial: string;
  wallCondition: string;
  wallBudget: number;
  floorMaterial: string;
  floorNeedsRepair: boolean;
  floorBudget: number;
  doorCondition: string;
  goodDoorsCount: number;
  windowCondition: string;
  goodWindowsCount: number;
  doorWindowBudget: number;
  kitchenVentilation: string;
  kitchenAppliances: string[];
  kitchenBudget: number;
};

type Props = {
  householdData: { housingDetails: HousingDetail };
  onChange: (section: string, field: keyof HousingDetail, value: any) => void;
};

const PhysicalStructureForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<Required<Partial<Record<keyof HousingDetail, string>>>>({
    completionStatus: '', ageOfHouse: '', currentCondition: '', roofMaterial: '', roofCondition: '', roofBudget: '', wallMaterial: '', wallCondition: '', wallBudget: '', floorMaterial: '', floorNeedsRepair: '', floorBudget: '', doorCondition: '', goodDoorsCount: '', windowCondition: '', goodWindowsCount: '', doorWindowBudget: '', kitchenVentilation: '', kitchenAppliances: '', kitchenBudget: ''
  });

  const validate = (field: keyof HousingDetail, value: any) => {
    let error = '';
    if (field === 'completionStatus') error = FormValidator.validateDropdown(value) || '';
    if (field === 'ageOfHouse') error = FormValidator.validateNumber(value, { min: 0, max: 200, integer: true }) || '';
    if (field === 'currentCondition') error = FormValidator.validateDropdown(value) || '';
    if (field === 'roofMaterial') error = FormValidator.validateDropdown(value) || '';
    if (field === 'roofCondition') error = FormValidator.validateDropdown(value) || '';
    if (field === 'roofBudget') error = FormValidator.validateNumber(value, { min: 0, max: 1000000, integer: true }) || '';
    if (field === 'wallMaterial') error = FormValidator.validateDropdown(value) || '';
    if (field === 'wallCondition') error = FormValidator.validateDropdown(value) || '';
    if (field === 'wallBudget') error = FormValidator.validateNumber(value, { min: 0, max: 1000000, integer: true }) || '';
    if (field === 'floorMaterial') error = FormValidator.validateDropdown(value) || '';
    if (field === 'floorNeedsRepair') error = FormValidator.validateBoolean(value) || '';
    if (field === 'floorBudget') error = FormValidator.validateNumber(value, { min: 0, max: 1000000, integer: true }) || '';
    if (field === 'doorCondition') error = FormValidator.validateDropdown(value) || '';
    if (field === 'goodDoorsCount') error = FormValidator.validateNumber(value, { min: 0, max: 20, integer: true }) || '';
    if (field === 'windowCondition') error = FormValidator.validateDropdown(value) || '';
    if (field === 'goodWindowsCount') error = FormValidator.validateNumber(value, { min: 0, max: 20, integer: true }) || '';
    if (field === 'doorWindowBudget') error = FormValidator.validateNumber(value, { min: 0, max: 1000000, integer: true }) || '';
    if (field === 'kitchenVentilation') error = FormValidator.validateDropdown(value) || '';
    if (field === 'kitchenAppliances') error = FormValidator.validateMultiSelect(value) || '';
    if (field === 'kitchenBudget') error = FormValidator.validateNumber(value, { min: 0, max: 1000000, integer: true }) || '';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };

  return (
    <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, maxWidth: 900, mx: 'auto', mt: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={2} color="primary.main">
        🏗️ Physical Structure Details
      </Typography>
      <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={2}>
        <TextField
          select
          label="Completion Status"
          value={householdData.housingDetails.completionStatus}
          onChange={(e) => { onChange('housingDetails', 'completionStatus', e.target.value); validate('completionStatus', e.target.value); }}
          onBlur={e => validate('completionStatus', e.target.value)}
          error={Boolean(errors.completionStatus)}
          helperText={errors.completionStatus || 'Select completion status'}
          required
          fullWidth
        >
          <MenuItem value="">Select Status</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Not Started">Not Started</MenuItem>
          <MenuItem value="Under Construction">Under Construction</MenuItem>
        </TextField>
        <TextField
          label="Age of House (Years)"
          type="number"
          inputProps={{ min: 0 }}
          value={householdData.housingDetails.ageOfHouse}
          onChange={(e) => onChange('housingDetails', 'ageOfHouse', parseInt(e.target.value) || 0)}
          onBlur={e => validate('ageOfHouse', e.target.value)}
          error={Boolean(errors.ageOfHouse)}
          helperText={errors.ageOfHouse || 'Enter age of house'}
          required
          fullWidth
        />
        <TextField
          select
          label="Current Condition"
          value={householdData.housingDetails.currentCondition}
          onChange={(e) => onChange('housingDetails', 'currentCondition', e.target.value)}
          onBlur={e => validate('currentCondition', e.target.value)}
          error={Boolean(errors.currentCondition)}
          helperText={errors.currentCondition || 'Select current condition'}
          required
          fullWidth
        >
          <MenuItem value="">Select Condition</MenuItem>
          <MenuItem value="New/Good">New/Good</MenuItem>
          <MenuItem value="Old/Good">Old/Good</MenuItem>
          <MenuItem value="Needs Repair">Needs Repair</MenuItem>
          <MenuItem value="Dilapidated">Dilapidated</MenuItem>
        </TextField>
        <TextField
          select
          label="Roof Material"
          value={householdData.housingDetails.roofMaterial}
          onChange={(e) => onChange('housingDetails', 'roofMaterial', e.target.value)}
          onBlur={e => validate('roofMaterial', e.target.value)}
          error={Boolean(errors.roofMaterial)}
          helperText={errors.roofMaterial || 'Select roof material'}
          required
          fullWidth
        >
          <MenuItem value="">Select Roof Material</MenuItem>
          <MenuItem value="Concrete">Concrete</MenuItem>
          <MenuItem value="Tile">Tile</MenuItem>
          <MenuItem value="Asbestos Sheet">Asbestos Sheet</MenuItem>
          <MenuItem value="GI/Aluminum">GI/Aluminum</MenuItem>
          <MenuItem value="Plastic Sheet">Plastic Sheet</MenuItem>
          <MenuItem value="Palm Leaf">Palm Leaf</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>
        <TextField
          select
          label="Roof Condition"
          value={householdData.housingDetails.roofCondition}
          onChange={(e) => onChange('housingDetails', 'roofCondition', e.target.value)}
          onBlur={e => validate('roofCondition', e.target.value)}
          error={Boolean(errors.roofCondition)}
          helperText={errors.roofCondition || 'Select roof condition'}
          required
          fullWidth
        >
          <MenuItem value="">Select Condition</MenuItem>
          <MenuItem value="Good">Good</MenuItem>
          <MenuItem value="Needs Minor Repairs">Needs Minor Repairs</MenuItem>
          <MenuItem value="Dilapidated">Dilapidated</MenuItem>
        </TextField>
        <TextField
          label="Estimated Roof Budget"
          type="number"
          inputProps={{ min: 0 }}
          value={householdData.housingDetails.roofBudget}
          onChange={(e) => onChange('housingDetails', 'roofBudget', parseInt(e.target.value) || 0)}
          onBlur={e => validate('roofBudget', e.target.value)}
          error={Boolean(errors.roofBudget)}
          helperText={errors.roofBudget || 'Enter estimated budget for roof'}
          required
          fullWidth
        />
        <TextField
          select
          label="Wall Material"
          value={householdData.housingDetails.wallMaterial}
          onChange={(e) => onChange('housingDetails', 'wallMaterial', e.target.value)}
          onBlur={e => validate('wallMaterial', e.target.value)}
          error={Boolean(errors.wallMaterial)}
          helperText={errors.wallMaterial || 'Select wall material'}
          required
          fullWidth
        >
          <MenuItem value="">Select Wall Material</MenuItem>
          <MenuItem value="Cement Blocks">Cement Blocks</MenuItem>
          <MenuItem value="Bricks">Bricks</MenuItem>
          <MenuItem value="Mud Blocks">Mud Blocks</MenuItem>
          <MenuItem value="Bamboo">Bamboo</MenuItem>
          <MenuItem value="Clay">Clay</MenuItem>
          <MenuItem value="Others">Others</MenuItem>
        </TextField>
        <TextField
          select
          label="Wall Condition"
          value={householdData.housingDetails.wallCondition}
          onChange={(e) => onChange('housingDetails', 'wallCondition', e.target.value)}
          onBlur={e => validate('wallCondition', e.target.value)}
          error={Boolean(errors.wallCondition)}
          helperText={errors.wallCondition || 'Select wall condition'}
          required
          fullWidth
        >
          <MenuItem value="">Select Condition</MenuItem>
          <MenuItem value="Stable">Stable</MenuItem>
          <MenuItem value="Repairable">Repairable</MenuItem>
          <MenuItem value="Needs Major Repairs">Needs Major Repairs</MenuItem>
        </TextField>
        <TextField
          label="Estimated Wall Budget"
          type="number"
          inputProps={{ min: 0 }}
          value={householdData.housingDetails.wallBudget}
          onChange={(e) => onChange('housingDetails', 'wallBudget', parseInt(e.target.value) || 0)}
          onBlur={e => validate('wallBudget', e.target.value)}
          error={Boolean(errors.wallBudget)}
          helperText={errors.wallBudget || 'Enter estimated budget for wall'}
          required
          fullWidth
        />
        <TextField
          select
          label="Floor Material"
          value={householdData.housingDetails.floorMaterial}
          onChange={(e) => onChange('housingDetails', 'floorMaterial', e.target.value)}
          onBlur={e => validate('floorMaterial', e.target.value)}
          error={Boolean(errors.floorMaterial)}
          helperText={errors.floorMaterial || 'Select floor material'}
          required
          fullWidth
        >
          <MenuItem value="">Select Floor Material</MenuItem>
          <MenuItem value="Granite/Marble">Granite/Marble</MenuItem>
          <MenuItem value="Cement">Cement</MenuItem>
          <MenuItem value="Rough Finish">Rough Finish</MenuItem>
          <MenuItem value="Mud Floor">Mud Floor</MenuItem>
          <MenuItem value="Others">Others</MenuItem>
        </TextField>
        <FormControl component="fieldset" required error={Boolean(errors.floorNeedsRepair)} sx={{ gridColumn: 'span 2' }}>
          <FormLabel component="legend">Floor Needs Repair</FormLabel>
          <RadioGroup
            row
            value={householdData.housingDetails.floorNeedsRepair ? 'yes' : 'no'}
            onChange={e => {
              const val = e.target.value === 'yes';
              onChange('housingDetails', 'floorNeedsRepair', val);
              validate('floorNeedsRepair', val);
            }}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
          {errors.floorNeedsRepair && <Typography color="error">{errors.floorNeedsRepair}</Typography>}
        </FormControl>
        <TextField
          label="Estimated Floor Budget"
          type="number"
          inputProps={{ min: 0 }}
          value={householdData.housingDetails.floorBudget}
          onChange={(e) => onChange('housingDetails', 'floorBudget', parseInt(e.target.value) || 0)}
          onBlur={e => validate('floorBudget', e.target.value)}
          error={Boolean(errors.floorBudget)}
          helperText={errors.floorBudget || 'Enter estimated budget for floor'}
          required
          fullWidth
        />
        <TextField
          select
          label="Door Condition"
          value={householdData.housingDetails.doorCondition}
          onChange={(e) => onChange('housingDetails', 'doorCondition', e.target.value)}
          onBlur={e => validate('doorCondition', e.target.value)}
          error={Boolean(errors.doorCondition)}
          helperText={errors.doorCondition || 'Select door condition'}
          required
          fullWidth
        >
          <MenuItem value="">Select Door Condition</MenuItem>
          <MenuItem value="Good">Good</MenuItem>
          <MenuItem value="Needs Repair">Needs Repair</MenuItem>
          <MenuItem value="Dilapidated">Dilapidated</MenuItem>
          <MenuItem value="Temporary Setup">Temporary Setup</MenuItem>
        </TextField>
        <TextField
          label="Number of Good Doors"
          type="number"
          inputProps={{ min: 0 }}
          value={householdData.housingDetails.goodDoorsCount}
          onChange={(e) => onChange('housingDetails', 'goodDoorsCount', parseInt(e.target.value) || 0)}
          onBlur={e => validate('goodDoorsCount', e.target.value)}
          error={Boolean(errors.goodDoorsCount)}
          helperText={errors.goodDoorsCount || 'Enter number of good doors'}
          required
          fullWidth
        />
        <TextField
          select
          label="Window Condition"
          value={householdData.housingDetails.windowCondition}
          onChange={(e) => onChange('housingDetails', 'windowCondition', e.target.value)}
          onBlur={e => validate('windowCondition', e.target.value)}
          error={Boolean(errors.windowCondition)}
          helperText={errors.windowCondition || 'Select window condition'}
          required
          fullWidth
        >
          <MenuItem value="">Select Window Condition</MenuItem>
          <MenuItem value="Good">Good</MenuItem>
          <MenuItem value="Needs Repair">Needs Repair</MenuItem>
          <MenuItem value="Dilapidated">Dilapidated</MenuItem>
          <MenuItem value="Temporary Setup">Temporary Setup</MenuItem>
        </TextField>
        <TextField
          label="Number of Good Windows"
          type="number"
          inputProps={{ min: 0 }}
          value={householdData.housingDetails.goodWindowsCount}
          onChange={(e) => onChange('housingDetails', 'goodWindowsCount', parseInt(e.target.value) || 0)}
          onBlur={e => validate('goodWindowsCount', e.target.value)}
          error={Boolean(errors.goodWindowsCount)}
          helperText={errors.goodWindowsCount || 'Enter number of good windows'}
          required
          fullWidth
        />
        <TextField
          label="Estimated Door/Window Budget"
          type="number"
          inputProps={{ min: 0 }}
          value={householdData.housingDetails.doorWindowBudget}
          onChange={(e) => onChange('housingDetails', 'doorWindowBudget', parseInt(e.target.value) || 0)}
          onBlur={e => validate('doorWindowBudget', e.target.value)}
          error={Boolean(errors.doorWindowBudget)}
          helperText={errors.doorWindowBudget || 'Enter estimated budget for doors/windows'}
          required
          fullWidth
        />
        <TextField
          select
          label="Kitchen Ventilation"
          value={householdData.housingDetails.kitchenVentilation}
          onChange={(e) => onChange('housingDetails', 'kitchenVentilation', e.target.value)}
          onBlur={e => validate('kitchenVentilation', e.target.value)}
          error={Boolean(errors.kitchenVentilation)}
          helperText={errors.kitchenVentilation || 'Select kitchen ventilation'}
          required
          fullWidth
        >
          <MenuItem value="">Select Ventilation</MenuItem>
          <MenuItem value="Good">Good</MenuItem>
          <MenuItem value="Needs Repair">Needs Repair</MenuItem>
          <MenuItem value="Poor">Poor</MenuItem>
          <MenuItem value="None">None</MenuItem>
        </TextField>
        {/* Replace this TextField for kitchenAppliances with a native select */}
        <FormControl fullWidth required error={Boolean(errors.kitchenAppliances)} sx={{ gridColumn: 'span 2' }}>
          <FormLabel>Available Appliances</FormLabel>
          <select
            multiple
            value={householdData.housingDetails.kitchenAppliances}
            onChange={e => {
              const options = Array.from(e.target.selectedOptions, option => option.value);
              onChange('housingDetails', 'kitchenAppliances', options);
            }}
            onBlur={e => validate('kitchenAppliances', Array.from(e.target.selectedOptions, option => option.value))}
            style={{ minHeight: 80, padding: 8, borderRadius: 4, borderColor: errors.kitchenAppliances ? 'red' : undefined }}
          >
            <option value="Mixer">Mixer</option>
            <option value="Fridge">Fridge</option>
            <option value="Oven">Oven</option>
            <option value="Grinder">Grinder</option>
            <option value="Pressure Cooker">Pressure Cooker</option>
            <option value="Others">Others</option>
          </select>
          {errors.kitchenAppliances && <Typography color="error">{errors.kitchenAppliances}</Typography>}
        </FormControl>
        <TextField
          label="Estimated Kitchen Budget"
          type="number"
          inputProps={{ min: 0 }}
          value={householdData.housingDetails.kitchenBudget}
          onChange={(e) => onChange('housingDetails', 'kitchenBudget', parseInt(e.target.value) || 0)}
          onBlur={e => validate('kitchenBudget', e.target.value)}
          error={Boolean(errors.kitchenBudget)}
          helperText={errors.kitchenBudget || 'Enter estimated budget for kitchen'}
          required
          fullWidth
        />
      </Box>
    </Paper>
  );
};

export default PhysicalStructureForm; 