import React, { useState } from 'react';

interface Props {
  householdData: {
    animalType: string;
    count: number;
    annualIncome: number;
  };
  onChange: (field: string, value: any) => void;
}

const AnimalHusbandryForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<any>({});
  const validate = (field: string, value: any) => {
    let error = '';
    if (field === 'animalType' && !value) error = 'Animal type is required';
    if (field === 'count' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid count';
    if (field === 'annualIncome' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid annual income';
    setErrors((prev: any) => ({ ...prev, [field]: error }));
    return error === '';
  };

  return (
    <div>
      <h2>Animal Husbandry</h2>
      <label>Animal Type:
        <input type="text" value={householdData.animalType} onChange={e => { onChange('animalType', e.target.value); validate('animalType', e.target.value); }} onBlur={e => validate('animalType', e.target.value)} required />
        {errors.animalType && <span className="error">{errors.animalType}</span>}
      </label>
      <label>Count:
        <input type="number" min={0} value={householdData.count} onChange={e => { onChange('count', e.target.value === '' ? '' : parseInt(e.target.value)); validate('count', e.target.value); }} onBlur={e => validate('count', e.target.value)} required />
        {errors.count && <span className="error">{errors.count}</span>}
      </label>
      <label>Annual Income:
        <input type="number" min={0} value={householdData.annualIncome} onChange={e => { onChange('annualIncome', e.target.value === '' ? '' : parseFloat(e.target.value)); validate('annualIncome', e.target.value); }} onBlur={e => validate('annualIncome', e.target.value)} required />
        {errors.annualIncome && <span className="error">{errors.annualIncome}</span>}
      </label>
    </div>
  );
};
export default AnimalHusbandryForm; 