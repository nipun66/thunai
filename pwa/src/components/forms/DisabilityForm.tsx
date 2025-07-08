import React, { useState } from 'react';

interface Props {
  householdData: {
    disabilityType: string;
    personName: string;
    percentage: number;
  };
  onChange: (field: string, value: any) => void;
}

const DisabilityForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<any>({});
  const validate = (field: string, value: any) => {
    let error = '';
    if (field === 'disabilityType' && !value) error = 'Disability type is required';
    if (field === 'personName' && !value) error = 'Person name is required';
    if (field === 'percentage' && (value === '' || isNaN(value) || value < 0 || value > 100)) error = 'Enter a valid percentage (0-100)';
    setErrors((prev: any) => ({ ...prev, [field]: error }));
    return error === '';
  };

  return (
    <div>
      <h2>Disability</h2>
      <label>Disability Type:
        <input type="text" value={householdData.disabilityType} onChange={e => { onChange('disabilityType', e.target.value); validate('disabilityType', e.target.value); }} onBlur={e => validate('disabilityType', e.target.value)} required />
        {errors.disabilityType && <span className="error">{errors.disabilityType}</span>}
      </label>
      <label>Person Name:
        <input type="text" value={householdData.personName} onChange={e => { onChange('personName', e.target.value); validate('personName', e.target.value); }} onBlur={e => validate('personName', e.target.value)} required />
        {errors.personName && <span className="error">{errors.personName}</span>}
      </label>
      <label>Percentage:
        <input type="number" min={0} max={100} value={householdData.percentage} onChange={e => { onChange('percentage', e.target.value === '' ? '' : parseFloat(e.target.value)); validate('percentage', e.target.value); }} onBlur={e => validate('percentage', e.target.value)} required />
        {errors.percentage && <span className="error">{errors.percentage}</span>}
      </label>
    </div>
  );
};
export default DisabilityForm; 