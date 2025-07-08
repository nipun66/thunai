import React, { useState } from 'react';
import { FormValidator } from './validation';

type DrinkingWaterError = {
  waterSource?: string;
  waterQuality?: string;
  waterAvailability?: string;
  additionalDetails?: string;
};

type DrinkingWaterData = {
  waterSource: string;
  waterQuality: string;
  waterAvailability: number;
  additionalDetails: string;
};

type Props = {
  householdData: DrinkingWaterData;
  onChange: (field: string, value: any) => void;
};

const DrinkingWaterForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState({
    waterSource: '', waterQuality: '', waterAvailability: '', additionalDetails: ''
  });
  const validate = (field: keyof DrinkingWaterData, value: any) => {
    let error = '';
    if (field === 'waterSource') error = FormValidator.validateDropdown(value) || '';
    if (field === 'waterQuality') error = FormValidator.validateDropdown(value) || '';
    if (field === 'waterAvailability') error = FormValidator.validateDropdown(value) || '';
    if (field === 'additionalDetails') error = FormValidator.validateTextarea(FormValidator.sanitize(value), { required: false, minLength: 0, maxLength: 200 }) || '';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };
  const validateAll = () => {
    let valid = true;
    (['waterSource', 'waterAvailability', 'waterQuality', 'additionalDetails'] as (keyof DrinkingWaterError)[]).forEach((field) => {
      if (!validate(field, householdData[field])) valid = false;
    });
    return valid;
  };

  return (
    <div>
      <h2>Drinking Water</h2>
      <label>Source:
        <input type="text" value={householdData.waterSource} onChange={e => { onChange('waterSource', e.target.value); validate('waterSource', e.target.value); }} onBlur={e => validate('waterSource', e.target.value)} required />
        {Boolean(errors.waterSource) && <span className="error">{errors.waterSource}</span>}
      </label>
      <label>Distance (in meters):
        <input type="number" min={0} value={householdData.waterAvailability} onChange={e => { onChange('waterAvailability', e.target.value === '' ? '' : parseFloat(e.target.value)); validate('waterAvailability', e.target.value); }} onBlur={e => validate('waterAvailability', e.target.value)} required />
        {Boolean(errors.waterAvailability) && <span className="error">{errors.waterAvailability}</span>}
      </label>
      <label>Quality:
        <input type="text" value={householdData.waterQuality} onChange={e => { onChange('waterQuality', e.target.value); validate('waterQuality', e.target.value); }} onBlur={e => validate('waterQuality', e.target.value)} required />
        {Boolean(errors.waterQuality) && <span className="error">{errors.waterQuality}</span>}
      </label>
      <label>Additional Details:
        <textarea value={householdData.additionalDetails} onChange={e => { onChange('additionalDetails', e.target.value); validate('additionalDetails', e.target.value); }} onBlur={e => validate('additionalDetails', e.target.value)} />
        {Boolean(errors.additionalDetails) && <span className="error">{errors.additionalDetails}</span>}
      </label>
    </div>
  );
};
export default DrinkingWaterForm; 