import React, { useState } from 'react';

interface Props {
  householdData: {
    source: string;
    distance: number;
    quality: string;
  };
  onChange: (field: string, value: any) => void;
}

const DrinkingWaterForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<any>({});
  const validate = (field: string, value: any) => {
    let error = '';
    if (field === 'source' && !value) error = 'Source is required';
    if (field === 'distance' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid distance';
    if (field === 'quality' && !value) error = 'Quality is required';
    setErrors((prev: any) => ({ ...prev, [field]: error }));
    return error === '';
  };

  return (
    <div>
      <h2>Drinking Water</h2>
      <label>Source:
        <input type="text" value={householdData.source} onChange={e => { onChange('source', e.target.value); validate('source', e.target.value); }} onBlur={e => validate('source', e.target.value)} required />
        {errors.source && <span className="error">{errors.source}</span>}
      </label>
      <label>Distance (in meters):
        <input type="number" min={0} value={householdData.distance} onChange={e => { onChange('distance', e.target.value === '' ? '' : parseFloat(e.target.value)); validate('distance', e.target.value); }} onBlur={e => validate('distance', e.target.value)} required />
        {errors.distance && <span className="error">{errors.distance}</span>}
      </label>
      <label>Quality:
        <input type="text" value={householdData.quality} onChange={e => { onChange('quality', e.target.value); validate('quality', e.target.value); }} onBlur={e => validate('quality', e.target.value)} required />
        {errors.quality && <span className="error">{errors.quality}</span>}
      </label>
    </div>
  );
};
export default DrinkingWaterForm; 