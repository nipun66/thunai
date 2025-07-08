import React, { useState } from 'react';
import { FormValidator } from './validation';

type CashCrop = {
  cropName: string;
  number: number;
  olderThan3Years: boolean;
  annualIncome: number;
  additionalDetails: string;
};

type HouseholdData = {
  cashCrops?: CashCrop[];
  // ...other fields
};

type Props = {
  householdData: HouseholdData;
  onChange: (section: string, value: any) => void;
};

type CashCropError = Partial<Record<keyof CashCrop, string>>;

const defaultCrop: CashCrop = {
  cropName: '',
  number: 0,
  olderThan3Years: false,
  annualIncome: 0,
  additionalDetails: '',
};

const CashCropsForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState({
    cropName: '', cropNumber: '', olderThan3Years: '', annualIncome: '', additionalDetails: ''
  });
  const validate = (field: keyof CashCrop, value: any) => {
    let error = '';
    if (field === 'cropName') error = FormValidator.validateText(FormValidator.sanitize(value), { minLength: 2, maxLength: 100 }) || '';
    if (field === 'number') error = FormValidator.validateNumber(value, { min: 0, max: 10000, integer: true }) || '';
    if (field === 'olderThan3Years') error = FormValidator.validateBoolean(value) || '';
    if (field === 'annualIncome') error = FormValidator.validateNumber(value, { min: 0, max: 1000000, integer: true }) || '';
    if (field === 'additionalDetails') error = FormValidator.validateTextarea(FormValidator.sanitize(value), { required: false, minLength: 0, maxLength: 200 }) || '';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };

  const validateAll = () => {
    let valid = true;
    (Object.keys(newCrop) as (keyof CashCrop)[]).forEach((field) => {
      if (!validate(field, newCrop[field])) valid = false;
    });
    return valid;
  };

  const [newCrop, setNewCrop] = useState<CashCrop>(defaultCrop);
  const safeData = householdData || {};
  const cashCrops: CashCrop[] = safeData.cashCrops || [];

  const addCrop = () => {
    if (!validateAll()) return;
    onChange('cashCrops', [...cashCrops, newCrop]);
    setNewCrop(defaultCrop);
    setErrors({ cropName: '', cropNumber: '', olderThan3Years: '', annualIncome: '', additionalDetails: '' });
  };

  return (
    <div className="form-section">
      <h2>💰 Cash Crops</h2>
      <div className="add-crop-form">
        <h3>Add Cash Crop</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Name of Cash Crop *</label>
            <input
              type="text"
              value={newCrop.cropName}
              onChange={(e) => setNewCrop(prev => ({ ...prev, cropName: e.target.value }))}
              placeholder="Enter crop name"
            />
            {Boolean(errors.cropName) && <p className="error-message">{errors.cropName}</p>}
          </div>
          <div className="form-group">
            <label>Number</label>
            <input
              type="number"
              value={newCrop.number}
              onChange={(e) => setNewCrop(prev => ({ ...prev, number: parseInt(e.target.value) || 0 }))}
              placeholder="Enter number"
              min="0"
            />
            {Boolean(errors.cropNumber) && <p className="error-message">{errors.cropNumber}</p>}
          </div>
          <div className="form-group">
            <label>Are any crops older than 3 years?</label>
            <input
              type="checkbox"
              checked={newCrop.olderThan3Years}
              onChange={(e) => setNewCrop(prev => ({ ...prev, olderThan3Years: e.target.checked }))}
            />
            {Boolean(errors.olderThan3Years) && <p className="error-message">{errors.olderThan3Years}</p>}
          </div>
          <div className="form-group">
            <label>Income Received (Annually)</label>
            <input
              type="number"
              value={newCrop.annualIncome}
              onChange={(e) => setNewCrop(prev => ({ ...prev, annualIncome: parseInt(e.target.value) || 0 }))}
              placeholder="Enter annual income"
              min="0"
            />
            {Boolean(errors.annualIncome) && <p className="error-message">{errors.annualIncome}</p>}
          </div>
          <div className="form-group full-width">
            <label>Additional Details</label>
            <textarea
              value={newCrop.additionalDetails}
              onChange={(e) => setNewCrop(prev => ({ ...prev, additionalDetails: e.target.value }))}
              placeholder="Any additional details"
            />
            {Boolean(errors.additionalDetails) && <p className="error-message">{errors.additionalDetails}</p>}
          </div>
        </div>
        <button type="button" onClick={addCrop} className="add-btn">
          ➕ Add Cash Crop
        </button>
      </div>
      {cashCrops.length > 0 && (
        <div className="crops-list">
          <h3>Added Cash Crops ({cashCrops.length})</h3>
          <div className="crops-grid">
            {cashCrops.map((crop: CashCrop, idx: number) => (
              <div key={idx} className="crop-card">
                <h4>{crop.cropName}</h4>
                <p><strong>Number:</strong> {crop.number}</p>
                <p><strong>Older than 3 years:</strong> {crop.olderThan3Years ? 'Yes' : 'No'}</p>
                <p><strong>Annual Income:</strong> {crop.annualIncome}</p>
                <p><strong>Details:</strong> {crop.additionalDetails}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CashCropsForm; 