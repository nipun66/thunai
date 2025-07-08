import React, { useState } from 'react';

type PhoneConnectivity = {
  hasPhone: boolean;
  mobileNumbers: string;
  landlineNumber: string;
};

type Props = {
  householdData: any; // Accept full HouseholdData for consistency
  onChange: (section: string, value: any) => void;
};

const PhoneConnectivityForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<any>({});
  const validate = (field: string, value: any) => {
    let error = '';
    if (field === 'phoneType' && !value) error = 'Phone type is required';
    if (field === 'connectionCount' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid number of connections';
    setErrors((prev: any) => ({ ...prev, [field]: error }));
    return error === '';
  };
  const phoneConnectivity = householdData.phoneConnectivity || { hasPhone: false, mobileNumbers: '', landlineNumber: '' };

  const handleChange = (field: keyof PhoneConnectivity, value: any) => {
    onChange('phoneConnectivity', { ...phoneConnectivity, [field]: value });
  };

  return (
    <div className="form-section">
      <h2>📞 Phone Connectivity</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>Does the household have a phone?</label>
          <div>
            <label>
              <input
                type="radio"
                name="hasPhone"
                checked={phoneConnectivity.hasPhone === true}
                onChange={() => handleChange('hasPhone', true)}
              />
              Yes
            </label>
            <label style={{ marginLeft: '1em' }}>
              <input
                type="radio"
                name="hasPhone"
                checked={phoneConnectivity.hasPhone === false}
                onChange={() => handleChange('hasPhone', false)}
              />
              No
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Mobile Phone Number(s)</label>
          <input
            type="text"
            value={phoneConnectivity.mobileNumbers}
            onChange={e => handleChange('mobileNumbers', e.target.value)}
            placeholder="Enter 10-digit number(s), comma-separated if multiple"
            pattern="^([0-9]{10})(,[0-9]{10})*$"
            disabled={!phoneConnectivity.hasPhone}
          />
        </div>
        <div className="form-group">
          <label>Landline Number</label>
          <input
            type="text"
            value={phoneConnectivity.landlineNumber}
            onChange={e => handleChange('landlineNumber', e.target.value)}
            placeholder="E.g., 04931-XXXXXX"
            disabled={!phoneConnectivity.hasPhone}
          />
        </div>
      </div>
    </div>
  );
};

export default PhoneConnectivityForm; 