import React, { useState } from 'react';

type HealthError = {
  healthIssue?: string;
  affectedCount?: string;
  treatmentReceived?: string;
};

type HealthData = {
  healthIssue: string;
  affectedCount: number;
  treatmentReceived: string;
};

type Props = {
  householdData: HealthData;
  onChange: (field: string, value: any) => void;
};

const HealthForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<HealthError>({});
  const validate = (field: keyof HealthError, value: any) => {
    let error = '';
    if (field === 'healthIssue' && !value) error = 'Health issue is required';
    if (field === 'affectedCount' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid number of affected';
    if (field === 'treatmentReceived' && !value) error = 'Treatment received is required';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };
  const validateAll = () => {
    let valid = true;
    (['healthIssue', 'affectedCount', 'treatmentReceived'] as (keyof HealthError)[]).forEach((field) => {
      if (!validate(field, householdData[field])) valid = false;
    });
    return valid;
  };

  return (
    <div>
      <h2>Health</h2>
      <label>Health Issue:
        <input type="text" value={householdData.healthIssue} onChange={e => { onChange('healthIssue', e.target.value); validate('healthIssue', e.target.value); }} onBlur={e => validate('healthIssue', e.target.value)} required />
        {errors.healthIssue && <span className="error">{errors.healthIssue}</span>}
      </label>
      <label>Number of Affected:
        <input type="number" min={0} value={householdData.affectedCount} onChange={e => { onChange('affectedCount', e.target.value === '' ? '' : parseInt(e.target.value)); validate('affectedCount', e.target.value); }} onBlur={e => validate('affectedCount', e.target.value)} required />
        {errors.affectedCount && <span className="error">{errors.affectedCount}</span>}
      </label>
      <label>Treatment Received:
        <input type="text" value={householdData.treatmentReceived} onChange={e => { onChange('treatmentReceived', e.target.value); validate('treatmentReceived', e.target.value); }} onBlur={e => validate('treatmentReceived', e.target.value)} required />
        {errors.treatmentReceived && <span className="error">{errors.treatmentReceived}</span>}
      </label>
    </div>
  );
};
export default HealthForm; 