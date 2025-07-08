import React, { useState } from 'react';
import { FormValidator } from './validation';

type CultivationModeError = {
  preferredMethod?: string;
};

type CultivationMode = {
  preferredMethod: string;
};

type HouseholdData = {
  cultivationMode: CultivationMode;
};

type Props = {
  householdData: HouseholdData;
  onChange: (section: string, field: string, value: any) => void;
};

const CultivationModeForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState({
    preferredMethod: ''
  });
  const validate = (field: keyof CultivationMode, value: any) => {
    let error = '';
    if (field === 'preferredMethod') error = FormValidator.validateDropdown(value) || '';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };
  const validateAll = () => {
    let valid = true;
    (['preferredMethod'] as (keyof CultivationModeError)[]).forEach((field) => {
      if (!validate(field, householdData.cultivationMode[field])) valid = false;
    });
    return valid;
  };
  const methodOptions = [
    '',
    'Organic',
    'Conventional',
    'Mixed',
    'Other',
  ];
  const resetErrors = { preferredMethod: '' };
  return (
    <div>
      <h2>Cultivation Mode</h2>
      <label>Preferred Method:
        <select value={householdData.cultivationMode.preferredMethod} onChange={e => {
          onChange('cultivationMode', 'preferredMethod', e.target.value);
          validate('preferredMethod', e.target.value);
        }} onBlur={e => validate('preferredMethod', e.target.value)} required>
          {methodOptions.map(opt => (
            <option key={opt} value={opt}>{opt || 'Select Method'}</option>
          ))}
        </select>
        {Boolean(errors.preferredMethod) && <span className="error">{errors.preferredMethod}</span>}
      </label>
    </div>
  );
};
export default CultivationModeForm; 