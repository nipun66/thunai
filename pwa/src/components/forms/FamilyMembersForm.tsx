import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { FormValidator } from './validation';

type FamilyMember = {
  name: string;
  relationship: string;
  gender: string;
  age: number;
  educationLevel: string;
  vocationalKnowledge: string;
  occupationSector: string;
  maritalStatus: string;
  hasBankAccount: boolean;
  hasAadhaar: boolean;
  pension: string;
  additionalDetails: string;
};

type FamilyMemberError = Partial<Record<keyof FamilyMember, string>>;

type HouseholdData = {
  members: FamilyMember[];
};

type Props = {
  householdData: HouseholdData;
  setHouseholdData: (data: HouseholdData) => void;
};

const defaultMember: FamilyMember = {
  name: '',
  relationship: '',
  gender: '',
  age: 0,
  educationLevel: '',
  vocationalKnowledge: '',
  occupationSector: '',
  maritalStatus: '',
  hasBankAccount: false,
  hasAadhaar: false,
  pension: '',
  additionalDetails: '',
};

const FamilyMembersForm: React.FC<Props> = ({ householdData, setHouseholdData }) => {
  const [newMember, setNewMember] = useState<FamilyMember>(defaultMember);
  const [errors, setErrors] = useState<Required<FamilyMemberError>>({
    name: '', relationship: '', gender: '', age: '', educationLevel: '', vocationalKnowledge: '', occupationSector: '', maritalStatus: '', hasBankAccount: '', hasAadhaar: '', pension: '', additionalDetails: ''
  });

  const safeData = householdData || { members: [] };
  const members: FamilyMember[] = safeData.members || [];

  const validate = (field: keyof FamilyMember, value: any) => {
    let error = '';
    if (field === 'name') error = FormValidator.validateName(FormValidator.sanitize(value)) || '';
    if (field === 'age') error = FormValidator.validateNumber(value, { min: 0, max: 120, integer: true }) || '';
    if (field === 'gender') error = FormValidator.validateDropdown(value) || '';
    if (field === 'relationship') error = FormValidator.validateDropdown(value) || '';
    if (field === 'educationLevel') error = FormValidator.validateDropdown(value, false) || '';
    if (field === 'vocationalKnowledge') error = FormValidator.validateText(FormValidator.sanitize(value), { required: false, minLength: 0, maxLength: 100 }) || '';
    if (field === 'occupationSector') error = FormValidator.validateDropdown(value, false) || '';
    if (field === 'maritalStatus') error = FormValidator.validateDropdown(value, false) || '';
    if (field === 'hasBankAccount') error = FormValidator.validateDropdown(value ? 'Yes' : 'No', false) || '';
    if (field === 'hasAadhaar') error = FormValidator.validateDropdown(value ? 'Yes' : 'No', false) || '';
    if (field === 'pension') error = FormValidator.validateText(FormValidator.sanitize(value), { required: false, minLength: 0, maxLength: 100 }) || '';
    if (field === 'additionalDetails') error = FormValidator.validateTextarea(FormValidator.sanitize(value), { required: false, minLength: 0, maxLength: 200 }) || '';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };

  const validateAll = () => {
    let valid = true;
    (Object.keys(newMember) as (keyof FamilyMember)[]).forEach((field) => {
      if (!validate(field, newMember[field])) valid = false;
    });
    return valid;
  };

  const resetErrors: Required<FamilyMemberError> = {
    name: '', relationship: '', gender: '', age: '', educationLevel: '', vocationalKnowledge: '', occupationSector: '', maritalStatus: '', hasBankAccount: '', hasAadhaar: '', pension: '', additionalDetails: ''
  };

  const addFamilyMember = () => {
    if (!validateAll()) return;
    // If setHouseholdData does not accept a function, use the direct update form:
    setHouseholdData({
      ...householdData,
      members: [...(Array.isArray(householdData.members) ? householdData.members : []), newMember],
    });
    setNewMember(defaultMember);
    setErrors(resetErrors);
  };

  return (
    <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, maxWidth: 900, mx: 'auto', mt: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={2} color="primary.main">
        👥 Family Member Details
      </Typography>
      <Box mb={3}>
        <Typography variant="h6" fontWeight={600} mb={1}>Add New Family Member</Typography>
        <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr 1fr' }} gap={2}>
          <TextField
            label="Name"
            value={newMember.name ?? ''}
            onChange={(e) => {
              const val = FormValidator.sanitize(e.target.value);
              setNewMember(prev => ({ ...prev, name: val }));
              validate('name', val);
            }}
            onBlur={e => validate('name', FormValidator.sanitize(e.target.value))}
            error={Boolean(errors.name)}
            helperText={errors.name || 'Enter member name'}
            required
            fullWidth
            // Removed pattern attribute to avoid browser regex errors
          />
          <TextField
            select
            label="Relationship with Head"
            value={newMember.relationship ?? ''}
            onChange={(e) => { setNewMember(prev => ({ ...prev, relationship: e.target.value })); validate('relationship', e.target.value); }}
            onBlur={e => validate('relationship', e.target.value)}
            error={Boolean(errors.relationship)}
            helperText={errors.relationship || 'Select relationship'}
            required
            fullWidth
          >
            <MenuItem value="">Select Relationship</MenuItem>
            <MenuItem value="Self">Self (Head)</MenuItem>
            <MenuItem value="Spouse">Spouse</MenuItem>
            <MenuItem value="Son">Son</MenuItem>
            <MenuItem value="Daughter">Daughter</MenuItem>
            <MenuItem value="Parent">Parent</MenuItem>
            <MenuItem value="Sibling">Sibling</MenuItem>
            <MenuItem value="Grandchild">Grandchild</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
          <TextField
            select
            label="Gender"
            value={newMember.gender ?? ''}
            onChange={(e) => { setNewMember(prev => ({ ...prev, gender: e.target.value })); validate('gender', e.target.value); }}
            onBlur={e => validate('gender', e.target.value)}
            error={Boolean(errors.gender)}
            helperText={errors.gender || 'Select gender'}
            required
            fullWidth
          >
            <MenuItem value="">Select Gender</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Transgender">Transgender</MenuItem>
          </TextField>
          <TextField
            label="Age (as of Jan 1, 2025)"
            type="number"
            inputProps={{ min: 0, max: 120, step: 1, 'aria-label': 'Age' }}
            value={newMember.age === 0 ? '' : newMember.age}
            onChange={(e) => {
              const val = e.target.value === '' ? 0 : parseInt(e.target.value);
              setNewMember(prev => ({ ...prev, age: Number.isNaN(val) ? 0 : val }));
              validate('age', Number.isNaN(val) ? 0 : val);
            }}
            onBlur={e => {
              const val = e.target.value === '' ? 0 : parseInt(e.target.value);
              validate('age', Number.isNaN(val) ? 0 : val);
            }}
            error={Boolean(errors.age)}
            helperText={errors.age || 'Enter age'}
            required
            fullWidth
          />
          <TextField
            select
            label="General Education Level"
            value={newMember.educationLevel ?? ''}
            onChange={(e) => { setNewMember(prev => ({ ...prev, educationLevel: e.target.value })); validate('educationLevel', e.target.value); }}
            onBlur={e => validate('educationLevel', e.target.value)}
            error={Boolean(errors.educationLevel)}
            helperText={errors.educationLevel || 'Select education level'}
            fullWidth
          >
            <MenuItem value="">Select Education Level</MenuItem>
            <MenuItem value="Illiterate">Illiterate</MenuItem>
            <MenuItem value="Anganwadi/Preschool">Anganwadi/Preschool</MenuItem>
            <MenuItem value="Informal LP">Informal LP</MenuItem>
            <MenuItem value="Informal UP">Informal UP</MenuItem>
            <MenuItem value="Secondary">Secondary</MenuItem>
            <MenuItem value="Higher Secondary">Higher Secondary</MenuItem>
            <MenuItem value="Degree">Degree</MenuItem>
            <MenuItem value="Postgraduate">Postgraduate</MenuItem>
            <MenuItem value="Vocational">Vocational</MenuItem>
            <MenuItem value="Others">Others</MenuItem>
          </TextField>
          <TextField
            label="Vocational/Practical Knowledge"
            value={newMember.vocationalKnowledge ?? ''}
            onChange={(e) => { setNewMember(prev => ({ ...prev, vocationalKnowledge: e.target.value })); validate('vocationalKnowledge', e.target.value); }}
            onBlur={e => validate('vocationalKnowledge', e.target.value)}
            error={Boolean(errors.vocationalKnowledge)}
            helperText={errors.vocationalKnowledge || 'Enter vocational knowledge'}
            fullWidth
          />
          <TextField
            select
            label="Occupation Sector"
            value={newMember.occupationSector ?? ''}
            onChange={(e) => { setNewMember(prev => ({ ...prev, occupationSector: e.target.value })); validate('occupationSector', e.target.value); }}
            onBlur={e => validate('occupationSector', e.target.value)}
            error={Boolean(errors.occupationSector)}
            helperText={errors.occupationSector || 'Select occupation sector'}
            fullWidth
          >
            <MenuItem value="">Select Occupation Sector</MenuItem>
            <MenuItem value="Agriculture">Agriculture</MenuItem>
            <MenuItem value="Service">Service</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
          <TextField
            select
            label="Marital Status"
            value={newMember.maritalStatus ?? ''}
            onChange={(e) => { setNewMember(prev => ({ ...prev, maritalStatus: e.target.value })); validate('maritalStatus', e.target.value); }}
            onBlur={e => validate('maritalStatus', e.target.value)}
            error={Boolean(errors.maritalStatus)}
            helperText={errors.maritalStatus || 'Select marital status'}
            fullWidth
          >
            <MenuItem value="">Select Marital Status</MenuItem>
            <MenuItem value="Single">Single</MenuItem>
            <MenuItem value="Married">Married</MenuItem>
            <MenuItem value="Widowed">Widowed</MenuItem>
            <MenuItem value="Divorced">Divorced</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
          <TextField
            select
            label="Bank Account"
            value={newMember.hasBankAccount ? 'Yes' : 'No'}
            onChange={(e) => setNewMember(prev => ({ ...prev, hasBankAccount: e.target.value === 'Yes' }))}
            fullWidth
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
          <TextField
            select
            label="Aadhaar"
            value={newMember.hasAadhaar ? 'Yes' : 'No'}
            onChange={(e) => setNewMember(prev => ({ ...prev, hasAadhaar: e.target.value === 'Yes' }))}
            fullWidth
          >
            <MenuItem value="Yes">Yes</MenuItem>
            <MenuItem value="No">No</MenuItem>
          </TextField>
          <TextField
            label="Pension"
            value={newMember.pension ?? ''}
            onChange={(e) => setNewMember(prev => ({ ...prev, pension: e.target.value }))}
            fullWidth
          />
          <TextField
            label="Additional Details"
            value={newMember.additionalDetails ?? ''}
            onChange={(e) => setNewMember(prev => ({ ...prev, additionalDetails: e.target.value }))}
            fullWidth
          />
        </Box>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={addFamilyMember} sx={{ fontWeight: 600 }}>
            Add Family Member
          </Button>
        </Box>
      </Box>
      <Box>
        <Typography variant="h6" fontWeight={600} mb={1}>Current Family Members</Typography>
        {/* Table or list of current members can be rendered here */}
      </Box>
    </Paper>
  );
};

export default FamilyMembersForm; 