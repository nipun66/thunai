import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

interface MigrantWorker {
  name: string;
  place: string;
  workSector: string;
  skillsExpertise: string;
  employmentDuration: number;
  additionalDetails: string;
}

type MigrantWorkerError = Partial<Record<keyof MigrantWorker, string>>;

interface Props {
  householdData: { migrantWorkers: MigrantWorker[] };
  onChange: (field: string, value: any) => void;
}

const emptyWorker: MigrantWorker = {
  name: '',
  place: '',
  workSector: '',
  skillsExpertise: '',
  employmentDuration: 0,
  additionalDetails: '',
};

const MigrantWorkerForm: React.FC<Props> = ({ householdData, onChange }) => {
  const workers = householdData.migrantWorkers || [];
  const [errors, setErrors] = useState<MigrantWorkerError[]>([]);

  const validate = (idx: number, field: keyof MigrantWorker, value: any) => {
    let error = '';
    if (field === 'name' && !value) error = 'Name is required';
    if (field === 'place' && !value) error = 'Place is required';
    if (field === 'workSector' && !value) error = 'Work sector is required';
    if (field === 'skillsExpertise' && !value) error = 'Skills/Expertise is required';
    if (field === 'employmentDuration' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid duration';
    setErrors(prev => {
      const newErrors = [...prev];
      if (!newErrors[idx]) newErrors[idx] = {};
      newErrors[idx][field] = error;
      return newErrors;
    });
    return error === '';
  };

  const validateAll = (worker: MigrantWorker) => {
    let valid = true;
    (Object.keys(worker) as (keyof MigrantWorker)[]).forEach((field) => {
      if (!validate(0, field, worker[field])) valid = false;
    });
    return valid;
  };

  const handleWorkerChange = (idx: number, field: keyof MigrantWorker, value: any) => {
    const updated = workers.map((w, i) => i === idx ? { ...w, [field]: value } : w);
    onChange('migrantWorkers', updated);
    validate(idx, field, value);
  };

  const addWorker = () => {
    onChange('migrantWorkers', [...workers, { ...emptyWorker }]);
    setErrors(prev => [...prev, {}]);
  };

  const removeWorker = (idx: number) => {
    const updated = workers.filter((_, i) => i !== idx);
    onChange('migrantWorkers', updated);
    setErrors(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, maxWidth: 700, mx: 'auto', mt: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={2} color="primary.main">
        Migrant Worker Details
      </Typography>
      {workers.length === 0 && <Typography color="text.secondary">No migrant workers added yet.</Typography>}
      {workers.map((worker, idx) => (
        <Box key={idx} sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2, mb: 2 }}>
          <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={2}>
            <TextField
              label="Name"
              value={worker.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleWorkerChange(idx, 'name', e.target.value)}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => validate(idx, 'name', e.target.value)}
              error={!!errors[idx]?.name}
              helperText={errors[idx]?.name || 'Enter name'}
              required
              fullWidth
            />
            <TextField
              label="Place"
              value={worker.place}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleWorkerChange(idx, 'place', e.target.value)}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => validate(idx, 'place', e.target.value)}
              error={!!errors[idx]?.place}
              helperText={errors[idx]?.place || 'Enter place'}
              required
              fullWidth
            />
            <TextField
              label="Work Sector"
              value={worker.workSector}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleWorkerChange(idx, 'workSector', e.target.value)}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => validate(idx, 'workSector', e.target.value)}
              error={!!errors[idx]?.workSector}
              helperText={errors[idx]?.workSector || 'Enter work sector'}
              required
              fullWidth
            />
            <TextField
              label="Skills/Expertise"
              value={worker.skillsExpertise}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleWorkerChange(idx, 'skillsExpertise', e.target.value)}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => validate(idx, 'skillsExpertise', e.target.value)}
              error={!!errors[idx]?.skillsExpertise}
              helperText={errors[idx]?.skillsExpertise || 'Enter skills/expertise'}
              required
              fullWidth
            />
            <TextField
              label="Employment Duration (months)"
              type="number"
              inputProps={{ min: 0 }}
              value={worker.employmentDuration}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { const val = e.target.value; if (/^\d*$/.test(val)) handleWorkerChange(idx, 'employmentDuration', val === '' ? '' : parseInt(val)); }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => validate(idx, 'employmentDuration', e.target.value)}
              error={!!errors[idx]?.employmentDuration}
              helperText={errors[idx]?.employmentDuration || 'Enter duration in months'}
              required
              fullWidth
            />
            <TextField
              label="Additional Details"
              value={worker.additionalDetails}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleWorkerChange(idx, 'additionalDetails', e.target.value)}
              fullWidth
            />
          </Box>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button variant="outlined" color="error" onClick={() => removeWorker(idx)}>
              Remove
            </Button>
          </Box>
        </Box>
      ))}
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={addWorker} sx={{ fontWeight: 600 }}>
          Add Migrant Worker
        </Button>
      </Box>
    </Paper>
  );
};

export default MigrantWorkerForm; 