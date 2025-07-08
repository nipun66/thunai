import React, { useState } from 'react';

type WageEmployment = {
  workdays202324: number;
  distanceToJob: number;
  paymentMode: string;
  workAvailability: string;
  workAreaSector: string;
};

type Props = {
  householdData: any;
  onChange: (section: string, field: string, value: any) => void;
};

const WageEmploymentForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<any>({});
  const validate = (field: string, value: any) => {
    let error = '';
    if (field === 'employerType' && !value) error = 'Employer type is required';
    if (field === 'wageAmount' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid wage amount';
    setErrors((prev: any) => ({ ...prev, [field]: error }));
    return error === '';
  };
  return (
    <div>
      <h2>Wage Employment</h2>
      <label>Employer Type:
        <input type="text" value={householdData.employerType} onChange={e => { onChange('employerType', e.target.value); validate('employerType', e.target.value); }} onBlur={e => validate('employerType', e.target.value)} required />
        {errors.employerType && <span className="error">{errors.employerType}</span>}
      </label>
      <label>Wage Amount:
        <input type="number" min={0} value={householdData.wageAmount} onChange={e => { onChange('wageAmount', e.target.value === '' ? '' : parseFloat(e.target.value)); validate('wageAmount', e.target.value); }} onBlur={e => validate('wageAmount', e.target.value)} required />
        {errors.wageAmount && <span className="error">{errors.wageAmount}</span>}
      </label>
    </div>
  );
};
export default WageEmploymentForm; 