import React, { useState } from 'react';

type TraditionalFarmingError = {
  cropType?: string;
  area?: string;
};

type TraditionalFarming = {
  practicesTraditional: boolean;
  traditionalCropDetails: string;
  lastPracticedSeason: string;
  interestResume: boolean;
  resumeMode: string;
  additionalSupport: string;
  revivalBudget: number;
  cropType: string;
  area: number;
};

type HouseholdData = {
  traditionalFarming: TraditionalFarming;
};

type Props = {
  householdData: HouseholdData;
  onChange: (section: string, field: string, value: any) => void;
};

const TraditionalFarmingForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<TraditionalFarmingError>({});
  const validate = (field: keyof TraditionalFarmingError, value: any) => {
    let error = '';
    if (field === 'cropType' && (!value || !/^[a-zA-Z ]+$/.test(value))) error = 'Crop type is required and must be letters only';
    if (field === 'area' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid area';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };
  const validateAll = () => {
    let valid = true;
    (['cropType', 'area'] as (keyof TraditionalFarmingError)[]).forEach((field) => {
      if (!validate(field, householdData.traditionalFarming[field])) valid = false;
    });
    return valid;
  };
  return (
    <div>
      <h2>Traditional Farming</h2>
      <label>Crop Type:
        <input type="text" value={householdData.traditionalFarming.cropType} onChange={e => { onChange('traditionalFarming', 'cropType', e.target.value); validate('cropType', e.target.value); }} onBlur={e => validate('cropType', e.target.value)} required />
        {Boolean(errors.cropType) && <span className="error">{errors.cropType}</span>}
      </label>
      <label>Area (in acres):
        <input type="number" min={0} value={householdData.traditionalFarming.area} onChange={e => { onChange('traditionalFarming', 'area', e.target.value === '' ? '' : parseFloat(e.target.value)); validate('area', e.target.value); }} onBlur={e => validate('area', e.target.value)} required />
        {Boolean(errors.area) && <span className="error">{errors.area}</span>}
      </label>
    </div>
  );
};
export default TraditionalFarmingForm; 