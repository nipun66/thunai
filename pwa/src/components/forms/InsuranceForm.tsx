import React, { useState } from 'react';

type InsuranceError = {
  insuranceType?: string;
  policyNumber?: string;
  premium?: string;
};

type InsuranceData = {
  insuranceType: string;
  policyNumber: string;
  premium: number;
};

type Props = {
  householdData: InsuranceData;
  onChange: (field: string, value: any) => void;
};

const InsuranceForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<InsuranceError>({});
  const validate = (field: keyof InsuranceError, value: any) => {
    let error = '';
    if (field === 'insuranceType' && !value) error = 'Insurance type is required';
    if (field === 'policyNumber' && !value) error = 'Policy number is required';
    if (field === 'premium' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid premium';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };
  const validateAll = () => {
    let valid = true;
    (['insuranceType', 'policyNumber', 'premium'] as (keyof InsuranceError)[]).forEach((field) => {
      if (!validate(field, householdData[field])) valid = false;
    });
    return valid;
  };

  return (
    <div>
      <h2>Insurance</h2>
      <label>Insurance Type:
        <input type="text" value={householdData.insuranceType} onChange={e => { onChange('insuranceType', e.target.value); validate('insuranceType', e.target.value); }} onBlur={e => validate('insuranceType', e.target.value)} required />
        {Boolean(errors.insuranceType) && <span className="error">{errors.insuranceType}</span>}
      </label>
      <label>Policy Number:
        <input type="text" value={householdData.policyNumber} onChange={e => { onChange('policyNumber', e.target.value); validate('policyNumber', e.target.value); }} onBlur={e => validate('policyNumber', e.target.value)} required />
        {Boolean(errors.policyNumber) && <span className="error">{errors.policyNumber}</span>}
      </label>
      <label>Premium:
        <input type="number" min={0} value={householdData.premium} onChange={e => { onChange('premium', e.target.value === '' ? '' : parseFloat(e.target.value)); validate('premium', e.target.value); }} onBlur={e => validate('premium', e.target.value)} required />
        {Boolean(errors.premium) && <span className="error">{errors.premium}</span>}
      </label>
    </div>
  );
};
export default InsuranceForm; 