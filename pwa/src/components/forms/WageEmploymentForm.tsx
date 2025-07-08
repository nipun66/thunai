import React, { useState } from 'react';

type WageEmploymentError = {
  employerType?: string;
  wageAmount?: string;
};

type WageEmployment = {
  employerType: string;
  wageAmount: number;
  workdays202324: number;
  distanceToJob: number;
  paymentMode: string;
  workAvailability: string;
  workAreaSector: string;
};

type HouseholdData = {
  wageEmployment: WageEmployment;
};

type Props = {
  householdData: HouseholdData;
  onChange: (section: string, field: string, value: any) => void;
};

const WageEmploymentForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<WageEmploymentError>({});
  const validate = (field: keyof WageEmploymentError, value: any) => {
    let error = '';
    if (field === 'employerType' && (!value || !/^[a-zA-Z ]+$/.test(value))) error = 'Employer type is required and must be letters only';
    if (field === 'wageAmount' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid wage amount';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };
  const validateAll = () => {
    let valid = true;
    (['employerType', 'wageAmount'] as (keyof WageEmploymentError)[]).forEach((field) => {
      if (!validate(field, householdData.wageEmployment[field])) valid = false;
    });
    return valid;
  };
  return (
    <div>
      <h2>Wage Employment</h2>
      <label>Employer Type:
        <input type="text" value={householdData.wageEmployment.employerType} onChange={e => { onChange('employerType', e.target.value); validate('employerType', e.target.value); }} onBlur={e => validate('employerType', e.target.value)} required />
        {Boolean(errors.employerType) && <span className="error">{errors.employerType}</span>}
      </label>
      <label>Wage Amount:
        <input type="number" min={0} value={householdData.wageEmployment.wageAmount} onChange={e => { onChange('wageAmount', e.target.value === '' ? '' : parseFloat(e.target.value)); validate('wageAmount', e.target.value); }} onBlur={e => validate('wageAmount', e.target.value)} required />
        {Boolean(errors.wageAmount) && <span className="error">{errors.wageAmount}</span>}
      </label>
    </div>
  );
};
export default WageEmploymentForm; 