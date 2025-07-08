import React, { useState } from 'react';
import { FormValidator } from './validation';

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

type WaterSourceError = Partial<Record<keyof WaterSource, string>>;

type HouseholdData = {
  waterSources: WaterSource;
};

type Props = {
  householdData: HouseholdData;
  onChange: (section: string, field: string, value: any) => void;
};

const WaterSourceForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<Required<WaterSourceError>>({
    hasConservation: '', conservationMethods: '', hasStorageTank: '', sourceType: '', ownership: '', availability: '', quality: '', collectionMethod: '', additionalRemarks: '', estimatedBudget: ''
  });
  const safeData = householdData || { waterSources: {} as WaterSource };
  const waterSources: WaterSource = safeData.waterSources;

  // Validation logic
  const validate = (field: keyof WaterSource, value: any) => {
    let error = '';
    if (field === 'hasConservation') error = FormValidator.validateBoolean(value) || '';
    if (field === 'conservationMethods') error = FormValidator.validateTextarea(FormValidator.sanitize(value), { required: false, minLength: 0, maxLength: 200 }) || '';
    if (field === 'hasStorageTank') error = FormValidator.validateBoolean(value) || '';
    if (field === 'sourceType') error = FormValidator.validateDropdown(value) || '';
    if (field === 'ownership') error = FormValidator.validateDropdown(value) || '';
    if (field === 'availability') error = FormValidator.validateDropdown(value) || '';
    if (field === 'quality') error = FormValidator.validateDropdown(value) || '';
    if (field === 'collectionMethod') error = FormValidator.validateDropdown(value) || '';
    if (field === 'additionalRemarks') error = FormValidator.validateTextarea(FormValidator.sanitize(value), { required: false, minLength: 0, maxLength: 200 }) || '';
    if (field === 'estimatedBudget') error = FormValidator.validateNumber(value, { min: 0, max: 1000000, integer: true }) || '';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };

  const validateAll = () => {
    let valid = true;
    (Object.keys(waterSources) as (keyof WaterSource)[]).forEach((field) => {
      if (!validate(field, waterSources[field])) valid = false;
    });
    return valid;
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
                checked={waterSources.hasConservation}
                onChange={() => onChange('waterSources', 'hasConservation', true)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="hasConservation"
                checked={!waterSources.hasConservation}
                onChange={() => onChange('waterSources', 'hasConservation', false)}
              />
              No
            </label>
          </div>
        </div>
        <div className="form-group full-width">
          <label>If Yes, specify methods</label>
          <textarea
            value={waterSources.conservationMethods}
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
                checked={waterSources.hasStorageTank}
                onChange={() => onChange('waterSources', 'hasStorageTank', true)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="hasStorageTank"
                checked={!waterSources.hasStorageTank}
                onChange={() => onChange('waterSources', 'hasStorageTank', false)}
              />
              No
            </label>
          </div>
        </div>
        <div className="form-group">
          <label>Type of Water Source</label>
          <select
            value={waterSources.sourceType}
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
          {Boolean(errors.sourceType) && <span className="error">{errors.sourceType}</span>}
        </div>
        <div className="form-group">
          <label>Ownership of Source</label>
          <select
            value={waterSources.ownership}
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
          {Boolean(errors.ownership) && <span className="error">{errors.ownership}</span>}
        </div>
        <div className="form-group">
          <label>Water Availability</label>
          <select
            value={waterSources.availability}
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
          {Boolean(errors.availability) && <span className="error">{errors.availability}</span>}
        </div>
        <div className="form-group">
          <label>Water Quality</label>
          <select
            value={waterSources.quality}
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
          {Boolean(errors.quality) && <span className="error">{errors.quality}</span>}
        </div>
        <div className="form-group">
          <label>Water Collection Method</label>
          <select
            value={waterSources.collectionMethod}
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
          {Boolean(errors.collectionMethod) && <span className="error">{errors.collectionMethod}</span>}
        </div>
        <div className="form-group full-width">
          <label>Additional Remarks</label>
          <textarea
            value={waterSources.additionalRemarks}
            onChange={(e) => onChange('waterSources', 'additionalRemarks', e.target.value)}
            placeholder="Any remarks about water source or management"
          />
        </div>
        <div className="form-group">
          <label>Estimated Budget (if any)</label>
          <input
            type="number"
            value={waterSources.estimatedBudget}
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
          {Boolean(errors.estimatedBudget) && <span className="error">{errors.estimatedBudget}</span>}
        </div>
      </div>
    </div>
  );
};

export default WaterSourceForm; 