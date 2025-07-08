import React, { useState } from 'react';
import { FormValidator } from './validation';

type DisabilityError = {
  memberName?: string;
  disabilityType?: string;
  disabilityPercent?: string;
  additionalDetails?: string;
};

type DisabilityData = {
  memberName: string;
  disabilityType: string;
  disabilityPercent: number;
  additionalDetails: string;
};

type Props = {
  householdData: DisabilityData;
  onChange: (field: string, value: any) => void;
};

const DisabilityForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState({
    memberName: '', disabilityType: '', disabilityPercent: '', additionalDetails: ''
  });
  const validate = (field: keyof DisabilityData, value: any) => {
    let error = '';
    if (field === 'memberName') error = FormValidator.validateName(FormValidator.sanitize(value)) || '';
    if (field === 'disabilityType') error = FormValidator.validateDropdown(value) || '';
    if (field === 'disabilityPercent') error = FormValidator.validateNumber(value, { min: 0, max: 100, integer: true }) || '';
    if (field === 'additionalDetails') error = FormValidator.validateTextarea(FormValidator.sanitize(value), { required: false, minLength: 0, maxLength: 200 }) || '';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };
  const validateAll = () => {
    let valid = true;
    (['disabilityType', 'memberName', 'disabilityPercent'] as (keyof DisabilityError)[]).forEach((field) => {
      if (!validate(field, householdData[field])) valid = false;
    });
    return valid;
  };

  return (
    <div>
      <h2>Disability</h2>
      <label>Disability Type:
        <input type="text" value={householdData.disabilityType} onChange={e => { onChange('disabilityType', e.target.value); validate('disabilityType', e.target.value); }} onBlur={e => validate('disabilityType', e.target.value)} required />
        {Boolean(errors.disabilityType) && <span className="error">{errors.disabilityType}</span>}
      </label>
      <label>Member Name:
        <input type="text" value={householdData.memberName} onChange={e => { onChange('memberName', e.target.value); validate('memberName', e.target.value); }} onBlur={e => validate('memberName', e.target.value)} required />
        {Boolean(errors.memberName) && <span className="error">{errors.memberName}</span>}
      </label>
      <label>Percentage:
        <input type="number" min={0} max={100} value={householdData.disabilityPercent} onChange={e => { onChange('disabilityPercent', e.target.value === '' ? '' : parseFloat(e.target.value)); validate('disabilityPercent', e.target.value); }} onBlur={e => validate('disabilityPercent', e.target.value)} required />
        {Boolean(errors.disabilityPercent) && <span className="error">{errors.disabilityPercent}</span>}
      </label>
      <label>Additional Details:
        <textarea value={householdData.additionalDetails} onChange={e => { onChange('additionalDetails', e.target.value); validate('additionalDetails', e.target.value); }} onBlur={e => validate('additionalDetails', e.target.value)} />
        {Boolean(errors.additionalDetails) && <span className="error">{errors.additionalDetails}</span>}
      </label>
    </div>
  );
};
export default DisabilityForm; 