import React, { useState } from 'react';
import { FormValidator } from './validation';

type AgriculturalLandError = {
  landType?: string;
  totalCultivatedArea?: string;
};

type AgriculturalLand = {
  landType: string;
  totalCultivatedArea: number;
  unusedLandArea: number;
  highWaterArea: number;
  mediumWaterArea: number;
  irrigationSources: string[];
  additionalRemarks: string;
};

type HouseholdData = {
  agriculturalLand: AgriculturalLand;
};

type Props = {
  householdData: HouseholdData;
  onChange: (section: string, field: string, value: any) => void;
};

const AgriculturalLandForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState({
    landType: '', totalCultivatedArea: '', unusedLandArea: '', highWaterArea: '', mediumWaterArea: '', irrigationSources: '', additionalRemarks: ''
  });
  const validate = (field: keyof AgriculturalLand, value: any) => {
    let error = '';
    if (field === 'landType') error = FormValidator.validateDropdown(value) || '';
    if (field === 'totalCultivatedArea') error = FormValidator.validateNumber(value, { min: 0, max: 1000, integer: false }) || '';
    if (field === 'unusedLandArea') error = FormValidator.validateNumber(value, { min: 0, max: 1000, integer: false }) || '';
    if (field === 'highWaterArea') error = FormValidator.validateNumber(value, { min: 0, max: 1000, integer: false }) || '';
    if (field === 'mediumWaterArea') error = FormValidator.validateNumber(value, { min: 0, max: 1000, integer: false }) || '';
    if (field === 'irrigationSources') error = FormValidator.validateMultiSelect(value) || '';
    if (field === 'additionalRemarks') error = FormValidator.validateTextarea(FormValidator.sanitize(value), { required: false, minLength: 0, maxLength: 200 }) || '';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };

  const validateAll = () => {
    let valid = true;
    (['landType', 'totalCultivatedArea'] as (keyof AgriculturalLandError)[]).forEach((field) => {
      if (!validate(field, householdData.agriculturalLand[field])) valid = false;
    });
    return valid;
  };

  const landTypeOptions = [
    '',
    'Wetland',
    'Garden Land',
    'Dry Land',
    'Other',
  ];
  return (
    <div>
      <h2>Agricultural Land</h2>
      <label>Land Type:
        <select value={householdData.agriculturalLand.landType} onChange={e => { onChange('agriculturalLand', 'landType', e.target.value); validate('landType', e.target.value); }} onBlur={e => validate('landType', e.target.value)} required>
          {landTypeOptions.map(type => (
            <option key={type} value={type}>{type || 'Select Land Type'}</option>
          ))}
        </select>
        {Boolean(errors.landType) && <span className="error">{errors.landType}</span>}
      </label>
      <label>Total Cultivated Area (in acres):
        <input type="number" min={0} step="0.01" value={householdData.agriculturalLand.totalCultivatedArea} onChange={e => { onChange('agriculturalLand', 'totalCultivatedArea', e.target.value === '' ? '' : parseFloat(e.target.value)); validate('totalCultivatedArea', e.target.value); }} onBlur={e => validate('totalCultivatedArea', e.target.value)} required />
        {Boolean(errors.totalCultivatedArea) && <span className="error">{errors.totalCultivatedArea}</span>}
      </label>
    </div>
  );
};
export default AgriculturalLandForm; 