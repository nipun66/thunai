import React, { useState } from 'react';

type CashCrop = {
  cropName: string;
  number: number;
  olderThan3Years: boolean;
  annualIncome: number;
  additionalDetails: string;
};

type Props = {
  householdData: any;
  onChange: (section: string, value: any) => void;
};

const defaultCrop: CashCrop = {
  cropName: '',
  number: 0,
  olderThan3Years: false,
  annualIncome: 0,
  additionalDetails: '',
};

const CashCropsForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<any>({});
  const validate = (field: string, value: any) => {
    let error = '';
    if (field === 'cropType' && !value) error = 'Crop type is required';
    if (field === 'area' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid area';
    if (field === 'annualIncome' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid income';
    setErrors((prev: any) => ({ ...prev, [field]: error }));
    return error === '';
  };
  const [newCrop, setNewCrop] = useState<CashCrop>(defaultCrop);
  const safeData = householdData || {};
  const cashCrops: CashCrop[] = safeData.cashCrops || [];

  const addCrop = () => {
    if (!newCrop.cropName) return;
    onChange('cashCrops', [...cashCrops, newCrop]);
    setNewCrop(defaultCrop);
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
          </div>
          <div className="form-group">
            <label>Are any crops older than 3 years?</label>
            <input
              type="checkbox"
              checked={newCrop.olderThan3Years}
              onChange={(e) => setNewCrop(prev => ({ ...prev, olderThan3Years: e.target.checked }))}
            />
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
          </div>
          <div className="form-group full-width">
            <label>Additional Details</label>
            <textarea
              value={newCrop.additionalDetails}
              onChange={(e) => setNewCrop(prev => ({ ...prev, additionalDetails: e.target.value }))}
              placeholder="Any additional details"
            />
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