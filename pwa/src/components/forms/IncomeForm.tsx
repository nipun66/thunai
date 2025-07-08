import React, { useState } from 'react';

type IncomeError = {
  incomeSource?: string;
  annualIncome?: string;
};

type IncomeData = {
  incomeSource: string;
  annualIncome: number;
};

type Props = {
  householdData: IncomeData;
  onChange: (field: string, value: any) => void;
};

const IncomeForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<IncomeError>({});
  const validate = (field: keyof IncomeError, value: any) => {
    let error = '';
    if (field === 'incomeSource' && !value) error = 'Income source is required';
    if (field === 'annualIncome' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid annual income';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };
  const validateAll = () => {
    let valid = true;
    (['incomeSource', 'annualIncome'] as (keyof IncomeError)[]).forEach((field) => {
      if (!validate(field, householdData[field])) valid = false;
    });
    return valid;
  };

  return (
    <div>
      <h2>Income</h2>
      <label>Income Source:
        <input type="text" value={householdData.incomeSource} onChange={e => { onChange('incomeSource', e.target.value); validate('incomeSource', e.target.value); }} onBlur={e => validate('incomeSource', e.target.value)} required />
        {Boolean(errors.incomeSource) && <span className="error">{errors.incomeSource}</span>}
      </label>
      <label>Annual Income:
        <input type="number" min={0} value={householdData.annualIncome} onChange={e => { onChange('annualIncome', e.target.value === '' ? '' : parseFloat(e.target.value)); validate('annualIncome', e.target.value); }} onBlur={e => validate('annualIncome', e.target.value)} required />
        {Boolean(errors.annualIncome) && <span className="error">{errors.annualIncome}</span>}
      </label>
    </div>
  );
};
export default IncomeForm; 