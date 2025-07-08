import React, { useState } from 'react';

type CultivationMode = {
  preferredMethod: string;
};

type Props = {
  householdData: any;
  onChange: (section: string, field: string, value: any) => void;
};

const CultivationModeForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<any>({});
  const validate = (field: string, value: any) => {
    let error = '';
    if (field === 'preferredMethod' && !value) error = 'Preferred method is required';
    setErrors((prev: any) => ({ ...prev, [field]: error }));
    return error === '';
  };
  return (
    <div>
      <h2>Cultivation Mode</h2>
      <label>Preferred Method:
        <input type="text" value={householdData.cultivationMode.preferredMethod} onChange={e => { onChange('cultivationMode', 'preferredMethod', e.target.value); validate('preferredMethod', e.target.value); }} onBlur={e => validate('preferredMethod', e.target.value)} required />
        {errors.preferredMethod && <span className="error">{errors.preferredMethod}</span>}
      </label>
    </div>
  );
};
export default CultivationModeForm; 