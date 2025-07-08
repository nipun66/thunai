import React, { useState } from 'react';

type TraditionalFarming = {
  practicesTraditional: boolean;
  traditionalCropDetails: string;
  lastPracticedSeason: string;
  interestResume: boolean;
  resumeMode: string;
  additionalSupport: string;
  revivalBudget: number;
};

type Props = {
  householdData: any;
  onChange: (section: string, field: string, value: any) => void;
};

const TraditionalFarmingForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<any>({});
  const validate = (field: string, value: any) => {
    let error = '';
    if (field === 'cropType' && !value) error = 'Crop type is required';
    if (field === 'area' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid area';
    setErrors((prev: any) => ({ ...prev, [field]: error }));
    return error === '';
  };
  return (
    <div>
      <h2>Traditional Farming</h2>
      <label>Crop Type:
        <input type="text" value={householdData.cropType} onChange={e => { onChange('cropType', e.target.value); validate('cropType', e.target.value); }} onBlur={e => validate('cropType', e.target.value)} required />
        {errors.cropType && <span className="error">{errors.cropType}</span>}
      </label>
      <label>Area (in acres):
        <input type="number" min={0} value={householdData.area} onChange={e => { onChange('area', e.target.value === '' ? '' : parseFloat(e.target.value)); validate('area', e.target.value); }} onBlur={e => validate('area', e.target.value)} required />
        {errors.area && <span className="error">{errors.area}</span>}
      </label>
    </div>
  );
};
export default TraditionalFarmingForm; 