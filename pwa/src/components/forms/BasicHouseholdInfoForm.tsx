import React, { useState } from 'react';

type Props = {
  householdData: any;
  onChange: (field: string, value: any) => void;
};

const BasicHouseholdInfoForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<any>({});

  // Validation logic
  const validate = (field: string, value: any) => {
    let error = '';
    if (field === 'headOfHousehold' && !value) error = 'Head of household is required';
    if (field === 'householdSize' && (value === '' || isNaN(value) || value < 1)) error = 'Enter a valid household size';
    if (field === 'address' && !value) error = 'Address is required';
    setErrors((prev: any) => ({ ...prev, [field]: error }));
    return error === '';
  };

  return (
    <div className="form-section">
      <h2>Basic Household Info</h2>
      <label>Head of Household:
        <input type="text" value={householdData.headOfHousehold} onChange={e => { onChange('headOfHousehold', e.target.value); validate('headOfHousehold', e.target.value); }} onBlur={e => validate('headOfHousehold', e.target.value)} required />
        {errors.headOfHousehold && <span className="error">{errors.headOfHousehold}</span>}
      </label>
      <label>Household Size:
        <input type="number" min={1} value={householdData.householdSize} onChange={e => { onChange('householdSize', e.target.value === '' ? '' : parseInt(e.target.value)); validate('householdSize', e.target.value); }} onBlur={e => validate('householdSize', e.target.value)} required />
        {errors.householdSize && <span className="error">{errors.householdSize}</span>}
      </label>
      <label>Address:
        <input type="text" value={householdData.address} onChange={e => { onChange('address', e.target.value); validate('address', e.target.value); }} onBlur={e => validate('address', e.target.value)} required />
        {errors.address && <span className="error">{errors.address}</span>}
      </label>
    </div>
  );
};

export default BasicHouseholdInfoForm; 