import React, { useState } from 'react';

type PhoneConnectivityError = {
  hasPhone?: string;
  mobileNumbers?: string;
  landlineNumber?: string;
};

type PhoneConnectivity = {
  hasPhone: boolean;
  mobileNumbers: string;
  landlineNumber: string;
};

type HouseholdData = {
  phoneConnectivity: PhoneConnectivity;
};

type Props = {
  householdData: HouseholdData;
  onChange: (section: string, value: any) => void;
};

const PhoneConnectivityForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<PhoneConnectivityError>({});
  const validate = (field: keyof PhoneConnectivityError, value: any) => {
    let error = '';
    if (field === 'hasPhone' && typeof value !== 'boolean') error = 'Phone status is required';
    if (field === 'mobileNumbers' && value && !/^((\+91)?[0-9]{10})(,(\+91)?[0-9]{10})*$/.test(value)) error = 'Enter valid 10-digit numbers, comma-separated, optional +91';
    if (field === 'landlineNumber' && value && !/^[0-9\-]{6,20}$/.test(value)) error = 'Enter a valid landline number (digits and dash only)';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };
  const validateAll = () => {
    let valid = true;
    (['hasPhone', 'mobileNumbers', 'landlineNumber'] as (keyof PhoneConnectivityError)[]).forEach((field) => {
      if (!validate(field, phoneConnectivity[field])) valid = false;
    });
    return valid;
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
                onChange={() => { handleChange('hasPhone', true); validate('hasPhone', true); }}
              />
              Yes
            </label>
            <label style={{ marginLeft: '1em' }}>
              <input
                type="radio"
                name="hasPhone"
                checked={phoneConnectivity.hasPhone === false}
                onChange={() => { handleChange('hasPhone', false); validate('hasPhone', false); }}
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
            onChange={e => { handleChange('mobileNumbers', e.target.value); validate('mobileNumbers', e.target.value); }}
            placeholder="Enter 10-digit number(s), comma-separated if multiple, optional +91"
            pattern="^((\\+91)?[0-9]{10})(,(\\+91)?[0-9]{10})*$"
            disabled={!phoneConnectivity.hasPhone}
          />
          {Boolean(errors.mobileNumbers) && <span className="error">{errors.mobileNumbers}</span>}
        </div>
        <div className="form-group">
          <label>Landline Number</label>
          <input
            type="text"
            value={phoneConnectivity.landlineNumber}
            onChange={e => { handleChange('landlineNumber', e.target.value); validate('landlineNumber', e.target.value); }}
            placeholder="E.g., 04931-XXXXXX"
            pattern="^[0-9\\-]{6,20}$"
            disabled={!phoneConnectivity.hasPhone}
          />
          {Boolean(errors.landlineNumber) && <span className="error">{errors.landlineNumber}</span>}
        </div>
      </div>
    </div>
  );
};

export default PhoneConnectivityForm; 