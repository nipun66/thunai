import React, { useState } from 'react';

type AgriculturalLand = {
  landType: string;
  totalCultivatedArea: number;
  unusedArea: number;
  highWaterArea: number;
  mediumWaterArea: number;
  irrigationSources: string[];
  additionalRemarks: string;
};

type Props = {
  householdData: any;
  onChange: (section: string, field: string, value: any) => void;
};

const AgriculturalLandForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<any>({});
  const validate = (field: string, value: any) => {
    let error = '';
    if (field === 'landType' && !value) error = 'Land type is required';
    if (field === 'area' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid area';
    setErrors((prev: any) => ({ ...prev, [field]: error }));
    return error === '';
  };
  return (
    <div>
      <h2>Agricultural Land</h2>
      <label>Land Type:
        <input type="text" value={householdData.agriculturalLand.landType} onChange={e => { onChange('agriculturalLand', 'landType', e.target.value); validate('landType', e.target.value); }} onBlur={e => validate('landType', e.target.value)} required />
        {errors.landType && <span className="error">{errors.landType}</span>}
      </label>
      <label>Total Cultivated Area (in acres):
        <input type="number" min={0} value={householdData.agriculturalLand.totalCultivatedArea} onChange={e => { onChange('agriculturalLand', 'totalCultivatedArea', e.target.value === '' ? '' : parseFloat(e.target.value)); validate('totalCultivatedArea', e.target.value); }} onBlur={e => validate('totalCultivatedArea', e.target.value)} required />
        {errors.totalCultivatedArea && <span className="error">{errors.totalCultivatedArea}</span>}
      </label>
    </div>
  );
};
export default AgriculturalLandForm; 