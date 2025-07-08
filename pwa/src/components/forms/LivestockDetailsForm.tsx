import React, { useState } from 'react';

type LivestockDetail = {
  animalCategory: string;
  animalCount: number;
  breedType: string;
  estimatedIncome: number;
  additionalSupport: string;
  interestTraining: boolean;
};

type Props = {
  householdData: any;
  onChange: (section: string, value: any) => void;
};

const defaultLivestock: LivestockDetail = {
  animalCategory: '',
  animalCount: 0,
  breedType: '',
  estimatedIncome: 0,
  additionalSupport: '',
  interestTraining: false,
};

const LivestockDetailsForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [newLivestock, setNewLivestock] = useState<LivestockDetail>(defaultLivestock);
  const [errors, setErrors] = useState<any>({});

  const validate = (field: string, value: any) => {
    let error = '';
    if (field === 'animalCategory' && !value) error = 'Animal category is required';
    if (field === 'animalCount' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid count';
    if (field === 'breedType' && !value) error = 'Breed type is required';
    if (field === 'estimatedIncome' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid estimated income';
    if (field === 'additionalSupport' && !value) error = 'Additional support description is required';
    setErrors((prev: any) => ({ ...prev, [field]: error }));
    return error === '';
  };

  const addLivestock = () => {
    if (!newLivestock.animalCategory) {
      setErrors(prev => ({ ...prev, animalCategory: 'Animal category is required' }));
      return;
    }
    if (newLivestock.animalCount === 0) {
      setErrors(prev => ({ ...prev, animalCount: 'Number of animals must be at least 1' }));
      return;
    }
    if (!newLivestock.breedType) {
      setErrors(prev => ({ ...prev, breedType: 'Breed type is required' }));
      return;
    }
    if (newLivestock.estimatedIncome === 0) {
      setErrors(prev => ({ ...prev, estimatedIncome: 'Estimated income must be greater than 0' }));
      return;
    }
    if (!newLivestock.additionalSupport) {
      setErrors(prev => ({ ...prev, additionalSupport: 'Additional support description is required' }));
      return;
    }
    if (!newLivestock.interestTraining) {
      setErrors(prev => ({ ...prev, interestTraining: 'Interest in training is required' }));
      return;
    }

    onChange('livestockDetails', [...(householdData.livestockDetails || []), newLivestock]);
    setNewLivestock(defaultLivestock);
    setErrors({}); // Clear errors after successful addition
  };

  return (
    <div className="form-section">
      <h2>🐄 Livestock and Poultry Details</h2>
      <div className="add-livestock-form">
        <h3>Add Livestock Detail</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Animal Category *</label>
            <select
              value={newLivestock.animalCategory}
              onChange={(e) => {
                setNewLivestock(prev => ({ ...prev, animalCategory: e.target.value }));
                validate('animalCategory', e.target.value);
              }}
              onBlur={(e) => validate('animalCategory', e.target.value)}
            >
              <option value="">Select Category</option>
              <option value="Chicken">Chicken</option>
              <option value="Goat">Goat</option>
              <option value="Cow">Cow</option>
              <option value="Buffalo">Buffalo</option>
              <option value="Bull">Bull</option>
              <option value="Others">Others</option>
            </select>
            {errors.animalCategory && <span className="error">{errors.animalCategory}</span>}
          </div>
          <div className="form-group">
            <label>Number of Animals</label>
            <input
              type="number"
              value={newLivestock.animalCount}
              onChange={(e) => {
                setNewLivestock(prev => ({ ...prev, animalCount: parseInt(e.target.value) || 0 }));
                validate('animalCount', e.target.value);
              }}
              onBlur={(e) => validate('animalCount', e.target.value)}
              placeholder="Enter count"
              min="1"
            />
            {errors.animalCount && <span className="error">{errors.animalCount}</span>}
          </div>
          <div className="form-group">
            <label>Breed Type</label>
            <select
              value={newLivestock.breedType}
              onChange={(e) => {
                setNewLivestock(prev => ({ ...prev, breedType: e.target.value }));
                validate('breedType', e.target.value);
              }}
              onBlur={(e) => validate('breedType', e.target.value)}
            >
              <option value="">Select Breed</option>
              <option value="Indigenous (Local)">Indigenous (Local)</option>
              <option value="Hybrid / Crossbreed">Hybrid / Crossbreed</option>
            </select>
            {errors.breedType && <span className="error">{errors.breedType}</span>}
          </div>
          <div className="form-group">
            <label>Estimated Annual Income</label>
            <input
              type="number"
              value={newLivestock.estimatedIncome}
              onChange={(e) => {
                setNewLivestock(prev => ({ ...prev, estimatedIncome: parseInt(e.target.value) || 0 }));
                validate('estimatedIncome', e.target.value);
              }}
              onBlur={(e) => validate('estimatedIncome', e.target.value)}
              placeholder="Enter estimated income"
              min="1"
            />
            {errors.estimatedIncome && <span className="error">{errors.estimatedIncome}</span>}
          </div>
          <div className="form-group full-width">
            <label>Additional Support Needed</label>
            <textarea
              value={newLivestock.additionalSupport}
              onChange={(e) => {
                setNewLivestock(prev => ({ ...prev, additionalSupport: e.target.value }));
                validate('additionalSupport', e.target.value);
              }}
              onBlur={(e) => validate('additionalSupport', e.target.value)}
              placeholder="Describe support needed"
            />
            {errors.additionalSupport && <span className="error">{errors.additionalSupport}</span>}
          </div>
          <div className="form-group">
            <label>Interest in Agricultural / Animal Husbandry Training</label>
            <input
              type="checkbox"
              checked={newLivestock.interestTraining}
              onChange={(e) => {
                setNewLivestock(prev => ({ ...prev, interestTraining: e.target.checked }));
                validate('interestTraining', e.target.checked);
              }}
              onBlur={(e) => validate('interestTraining', e.target.checked)}
            />
            {errors.interestTraining && <span className="error">{errors.interestTraining}</span>}
          </div>
        </div>
        <button type="button" onClick={addLivestock} className="add-btn">
          ➕ Add Livestock Detail
        </button>
      </div>
      {householdData.livestockDetails && householdData.livestockDetails.length > 0 && (
        <div className="livestock-list">
          <h3>Added Livestock Details ({householdData.livestockDetails.length})</h3>
          <div className="livestock-grid">
            {householdData.livestockDetails.map((ls: LivestockDetail, idx: number) => (
              <div key={idx} className="livestock-card">
                <h4>{ls.animalCategory}</h4>
                <p><strong>Count:</strong> {ls.animalCount}</p>
                <p><strong>Breed:</strong> {ls.breedType}</p>
                <p><strong>Income:</strong> {ls.estimatedIncome}</p>
                <p><strong>Support:</strong> {ls.additionalSupport}</p>
                <p><strong>Training:</strong> {ls.interestTraining ? 'Yes' : 'No'}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LivestockDetailsForm; 