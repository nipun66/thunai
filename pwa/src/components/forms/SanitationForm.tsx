import React, { useState } from 'react';

interface Props {
  householdData: {
    toiletType: string;
    toiletCount: number;
    wasteDisposal: string;
  };
  onChange: (field: string, value: any) => void;
}

const SanitationForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<any>({});
  const validate = (field: string, value: any) => {
    let error = '';
    if (field === 'toiletType' && !value) error = 'Toilet type is required';
    if (field === 'toiletCount' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid number of toilets';
    if (field === 'wasteDisposal' && !value) error = 'Waste disposal method is required';
    setErrors((prev: any) => ({ ...prev, [field]: error }));
    return error === '';
  };

  return (
    <div>
      <h2>Sanitation</h2>
      <label>Toilet Type:
        <input type="text" value={householdData.toiletType} onChange={e => { onChange('toiletType', e.target.value); validate('toiletType', e.target.value); }} onBlur={e => validate('toiletType', e.target.value)} required />
        {errors.toiletType && <span className="error">{errors.toiletType}</span>}
      </label>
      <label>Number of Toilets:
        <input type="number" min={0} value={householdData.toiletCount} onChange={e => { onChange('toiletCount', e.target.value === '' ? '' : parseInt(e.target.value)); validate('toiletCount', e.target.value); }} onBlur={e => validate('toiletCount', e.target.value)} required />
        {errors.toiletCount && <span className="error">{errors.toiletCount}</span>}
      </label>
      <label>Waste Disposal Method:
        <input type="text" value={householdData.wasteDisposal} onChange={e => { onChange('wasteDisposal', e.target.value); validate('wasteDisposal', e.target.value); }} onBlur={e => validate('wasteDisposal', e.target.value)} required />
        {errors.wasteDisposal && <span className="error">{errors.wasteDisposal}</span>}
      </label>
    </div>
  );
};
export default SanitationForm; 