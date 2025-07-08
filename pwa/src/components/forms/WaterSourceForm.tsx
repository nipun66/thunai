import React, { useState } from 'react';

type WaterSource = {
  hasConservation: boolean;
  conservationMethods: string;
  hasStorageTank: boolean;
  sourceType: string;
  ownership: string;
  availability: string;
  quality: string;
  collectionMethod: string;
  additionalRemarks: string;
  estimatedBudget: number;
};

type Props = {
  householdData: any;
  onChange: (section: string, field: string, value: any) => void;
};

const WaterSourceForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<any>({});

  // Validation logic
  const validate = (field: string, value: any) => {
    let error = '';
    if (field === 'sourceType' && !value) error = 'Source type is required';
    if (field === 'ownership' && !value) error = 'Ownership is required';
    if (field === 'availability' && !value) error = 'Availability is required';
    if (field === 'quality' && !value) error = 'Quality is required';
    if (field === 'collectionMethod' && !value) error = 'Collection method is required';
    if (field === 'estimatedBudget' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid estimated budget';
    setErrors((prev: any) => ({ ...prev, [field]: error }));
    return error === '';
  };

  return (
    <div className="form-section">
      <h2>💧 Water Source and Management</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>Has the household adopted any water conservation methods?</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="hasConservation"
                checked={householdData.waterSources.hasConservation}
                onChange={() => onChange('waterSources', 'hasConservation', true)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="hasConservation"
                checked={!householdData.waterSources.hasConservation}
                onChange={() => onChange('waterSources', 'hasConservation', false)}
              />
              No
            </label>
          </div>
        </div>
        <div className="form-group full-width">
          <label>If Yes, specify methods</label>
          <textarea
            value={householdData.waterSources.conservationMethods}
            onChange={(e) => onChange('waterSources', 'conservationMethods', e.target.value)}
            placeholder="e.g., rainwater harvesting, bunding, etc."
          />
        </div>
        <div className="form-group">
          <label>Is there a water storage tank in the house?</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="hasStorageTank"
                checked={householdData.waterSources.hasStorageTank}
                onChange={() => onChange('waterSources', 'hasStorageTank', true)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="hasStorageTank"
                checked={!householdData.waterSources.hasStorageTank}
                onChange={() => onChange('waterSources', 'hasStorageTank', false)}
              />
              No
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Type of Water Source</label>
          <select
            value={householdData.waterSources.sourceType}
            onChange={(e) => {
              onChange('waterSources', 'sourceType', e.target.value);
              validate('sourceType', e.target.value);
            }}
            onBlur={e => validate('sourceType', e.target.value)}
          >
            <option value="">Select Source</option>
            <option value="Open Well">Open Well</option>
            <option value="Water Connection">Water Connection</option>
            <option value="Public Tap">Public Tap</option>
            <option value="Spring">Spring</option>
            <option value="Stream">Stream</option>
            <option value="River">River</option>
            <option value="Pond">Pond</option>
            <option value="Dam">Dam</option>
            <option value="Rainwater">Rainwater</option>
            <option value="Others">Others</option>
          </select>
          {errors.sourceType && <span className="error">{errors.sourceType}</span>}
        </div>
        <div className="form-group">
          <label>Ownership of Source</label>
          <select
            value={householdData.waterSources.ownership}
            onChange={(e) => {
              onChange('waterSources', 'ownership', e.target.value);
              validate('ownership', e.target.value);
            }}
            onBlur={e => validate('ownership', e.target.value)}
          >
            <option value="">Select Ownership</option>
            <option value="Own">Own</option>
            <option value="Neighbor's">Neighbor's</option>
            <option value="Government">Government</option>
            <option value="Forest Department">Forest Department</option>
          </select>
          {errors.ownership && <span className="error">{errors.ownership}</span>}
        </div>
        <div className="form-group">
          <label>Water Availability</label>
          <select
            value={householdData.waterSources.availability}
            onChange={(e) => {
              onChange('waterSources', 'availability', e.target.value);
              validate('availability', e.target.value);
            }}
            onBlur={e => validate('availability', e.target.value)}
          >
            <option value="">Select Availability</option>
            <option value="Year-round">Year-round</option>
            <option value="Only during rainy season">Only during rainy season</option>
            <option value="6 months">6 months</option>
            <option value="3 months">3 months</option>
          </select>
          {errors.availability && <span className="error">{errors.availability}</span>}
        </div>
        <div className="form-group">
          <label>Water Quality</label>
          <select
            value={householdData.waterSources.quality}
            onChange={(e) => {
              onChange('waterSources', 'quality', e.target.value);
              validate('quality', e.target.value);
            }}
            onBlur={e => validate('quality', e.target.value)}
          >
            <option value="">Select Quality</option>
            <option value="Good">Good</option>
            <option value="Salty/Brackish">Salty/Brackish</option>
            <option value="Has Odor">Has Odor</option>
            <option value="Others">Others</option>
          </select>
          {errors.quality && <span className="error">{errors.quality}</span>}
        </div>
        <div className="form-group">
          <label>Water Collection Method</label>
          <select
            value={householdData.waterSources.collectionMethod}
            onChange={(e) => {
              onChange('waterSources', 'collectionMethod', e.target.value);
              validate('collectionMethod', e.target.value);
            }}
            onBlur={e => validate('collectionMethod', e.target.value)}
          >
            <option value="">Select Method</option>
            <option value="Pipe">Pipe</option>
            <option value="Collected in containers">Collected in containers</option>
            <option value="Rainwater filtered via cloth">Rainwater filtered via cloth</option>
          </select>
          {errors.collectionMethod && <span className="error">{errors.collectionMethod}</span>}
        </div>
        <div className="form-group full-width">
          <label>Additional Remarks</label>
          <textarea
            value={householdData.waterSources.additionalRemarks}
            onChange={(e) => onChange('waterSources', 'additionalRemarks', e.target.value)}
            placeholder="Any remarks about water source or management"
          />
        </div>
        <div className="form-group">
          <label>Estimated Budget (if any)</label>
          <input
            type="number"
            value={householdData.waterSources.estimatedBudget}
            onChange={e => {
              const val = e.target.value;
              if (/^\d*$/.test(val)) {
                onChange('waterSources', 'estimatedBudget', val === '' ? '' : parseInt(val));
                validate('estimatedBudget', val === '' ? '' : parseInt(val));
              }
            }}
            onBlur={e => validate('estimatedBudget', e.target.value)}
            placeholder="Enter estimated budget"
            min="0"
            required
          />
          {errors.estimatedBudget && <span className="error">{errors.estimatedBudget}</span>}
        </div>
      </div>
    </div>
  );
};

export default WaterSourceForm; 