import React, { useState } from 'react';

interface MigrantWorker {
  name: string;
  place: string;
  workSector: string;
  skillsExpertise: string;
  employmentDuration: number;
  additionalDetails: string;
}

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
  const [errors, setErrors] = useState<any[]>([]);

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
    <div>
      <h2>Migrant Worker Details</h2>
      {workers.length === 0 && <p>No migrant workers added yet.</p>}
      {workers.map((worker, idx) => (
        <div key={idx} style={{ border: '1px solid #ccc', padding: 12, marginBottom: 12 }}>
          <label>
            Name:
            <input type="text" value={worker.name} onChange={e => handleWorkerChange(idx, 'name', e.target.value)} onBlur={e => validate(idx, 'name', e.target.value)} required />
            {errors[idx]?.name && <span className="error">{errors[idx].name}</span>}
          </label>
          <br />
          <label>
            Place:
            <input type="text" value={worker.place} onChange={e => handleWorkerChange(idx, 'place', e.target.value)} onBlur={e => validate(idx, 'place', e.target.value)} required />
            {errors[idx]?.place && <span className="error">{errors[idx].place}</span>}
          </label>
          <br />
          <label>
            Work Sector:
            <input type="text" value={worker.workSector} onChange={e => handleWorkerChange(idx, 'workSector', e.target.value)} onBlur={e => validate(idx, 'workSector', e.target.value)} required />
            {errors[idx]?.workSector && <span className="error">{errors[idx].workSector}</span>}
          </label>
          <br />
          <label>
            Skills/Expertise:
            <input type="text" value={worker.skillsExpertise} onChange={e => handleWorkerChange(idx, 'skillsExpertise', e.target.value)} onBlur={e => validate(idx, 'skillsExpertise', e.target.value)} required />
            {errors[idx]?.skillsExpertise && <span className="error">{errors[idx].skillsExpertise}</span>}
          </label>
          <br />
          <label>
            Employment Duration (months):
            <input type="number" min={0} value={worker.employmentDuration} onChange={e => {
              const val = e.target.value;
              if (/^\d*$/.test(val)) handleWorkerChange(idx, 'employmentDuration', val === '' ? '' : parseInt(val));
            }} onBlur={e => validate(idx, 'employmentDuration', e.target.value)} required />
            {errors[idx]?.employmentDuration && <span className="error">{errors[idx].employmentDuration}</span>}
          </label>
          <br />
          <label>
            Additional Details:
            <input type="text" value={worker.additionalDetails} onChange={e => handleWorkerChange(idx, 'additionalDetails', e.target.value)} />
          </label>
          <br />
          <button type="button" onClick={() => removeWorker(idx)} style={{ color: 'red' }}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={addWorker}>Add Migrant Worker</button>
    </div>
  );
};

export default MigrantWorkerForm; 