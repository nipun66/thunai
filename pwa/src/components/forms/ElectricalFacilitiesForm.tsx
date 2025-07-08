import React, { useState } from 'react';

type ElectricalFacility = {
  isElectrified: boolean;
  hasConnection: boolean;
  wiringComplete: string;
  wiringSafe: string;
  cookingFuel: string;
  stoveType: string;
  bulbsCount: number;
  bulbTypes: string[];
  hasSolar: boolean;
  solarUsage: string;
  solarCondition: string;
  additionalComments: string;
  estimatedBudget: number;
};

type Props = {
  householdData: any;
  onChange: (section: string, field: string, value: any) => void;
};

const ElectricalFacilitiesForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<any>({});
  const safeData = householdData || {};
  const electricalFacilities = safeData.electricalFacilities || {};

  const validate = (field: string, value: any) => {
    let error = '';
    if (field === 'isElectrified' && value === undefined) error = 'Required';
    if (field === 'hasConnection' && value === undefined) error = 'Required';
    if (field === 'wiringComplete' && !value) error = 'Required';
    if (field === 'wiringSafe' && !value) error = 'Required';
    if (field === 'cookingFuel' && !value) error = 'Required';
    if (field === 'stoveType' && !value) error = 'Required';
    if (field === 'bulbsCount' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid number';
    if (field === 'bulbTypes' && value.length === 0) error = 'Select at least one bulb type';
    if (field === 'hasSolar' && value === undefined) error = 'Required';
    if (field === 'solarUsage' && !value) error = 'Required';
    if (field === 'solarCondition' && !value) error = 'Required';
    if (field === 'estimatedBudget' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid number';
    setErrors((prev: any) => ({ ...prev, [field]: error }));
    return error === '';
  };

  return (
    <div className="form-section">
      <h2>💡 Electrical and Lighting Facilities</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>Is the house electrified?</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="isElectrified"
                checked={electricalFacilities.isElectrified}
                onChange={() => onChange('electricalFacilities', 'isElectrified', true)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="isElectrified"
                checked={!electricalFacilities.isElectrified}
                onChange={() => onChange('electricalFacilities', 'isElectrified', false)}
              />
              No
            </label>
            {errors.isElectrified && <p className="error-message">{errors.isElectrified}</p>}
          </div>
        </div>
        <div className="form-group">
          <label>Is there an electricity connection?</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="hasConnection"
                checked={electricalFacilities.hasConnection}
                onChange={() => onChange('electricalFacilities', 'hasConnection', true)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="hasConnection"
                checked={!electricalFacilities.hasConnection}
                onChange={() => onChange('electricalFacilities', 'hasConnection', false)}
              />
              No
            </label>
            {errors.hasConnection && <p className="error-message">{errors.hasConnection}</p>}
          </div>
        </div>
        <div className="form-group">
          <label>Is wiring complete?</label>
          <select
            value={electricalFacilities.wiringComplete}
            onChange={(e) => onChange('electricalFacilities', 'wiringComplete', e.target.value)}
          >
            <option value="">Select</option>
            <option value="Fully Wired">Fully Wired</option>
            <option value="Partially Wired">Partially Wired</option>
          </select>
          {errors.wiringComplete && <p className="error-message">{errors.wiringComplete}</p>}
        </div>
        <div className="form-group">
          <label>Is wiring safe?</label>
          <select
            value={electricalFacilities.wiringSafe}
            onChange={(e) => onChange('electricalFacilities', 'wiringSafe', e.target.value)}
          >
            <option value="">Select</option>
            <option value="Safe">Safe</option>
            <option value="Unsafe">Unsafe</option>
            <option value="Requires Rewiring">Requires Rewiring</option>
          </select>
          {errors.wiringSafe && <p className="error-message">{errors.wiringSafe}</p>}
        </div>
        <div className="form-group">
          <label>Cooking Fuel Used</label>
          <select
            value={electricalFacilities.cookingFuel}
            onChange={(e) => onChange('electricalFacilities', 'cookingFuel', e.target.value)}
          >
            <option value="">Select</option>
            <option value="LPG">LPG</option>
            <option value="Firewood">Firewood</option>
            <option value="Kerosene">Kerosene</option>
            <option value="Induction">Induction</option>
            <option value="Biogas">Biogas</option>
            <option value="Others">Others</option>
          </select>
          {errors.cookingFuel && <p className="error-message">{errors.cookingFuel}</p>}
        </div>
        <div className="form-group">
          <label>Type of Stove Used</label>
          <select
            value={electricalFacilities.stoveType}
            onChange={(e) => onChange('electricalFacilities', 'stoveType', e.target.value)}
          >
            <option value="">Select</option>
            <option value="Single Burner">Single Burner</option>
            <option value="Double Burner">Double Burner</option>
            <option value="Traditional Stove">Traditional Stove</option>
            <option value="Others">Others</option>
          </select>
          {errors.stoveType && <p className="error-message">{errors.stoveType}</p>}
        </div>
        <div className="form-group">
          <label>Number of Bulbs</label>
          <input
            type="number"
            value={electricalFacilities.bulbsCount}
            onChange={(e) => onChange('electricalFacilities', 'bulbsCount', parseInt(e.target.value) || 0)}
            placeholder="Enter number of bulbs"
            min="0"
          />
          {errors.bulbsCount && <p className="error-message">{errors.bulbsCount}</p>}
        </div>
        <div className="form-group">
          <label>Types of Bulbs Used</label>
          <select
            multiple
            value={electricalFacilities.bulbTypes}
            onChange={(e) => {
              const options = Array.from(e.target.selectedOptions, option => option.value);
              onChange('electricalFacilities', 'bulbTypes', options);
            }}
          >
            <option value="Incandescent">Incandescent</option>
            <option value="CFL">CFL</option>
            <option value="LED">LED</option>
          </select>
          {errors.bulbTypes && <p className="error-message">{errors.bulbTypes}</p>}
        </div>
        <div className="form-group">
          <label>Is there a solar energy system?</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="hasSolar"
                checked={electricalFacilities.hasSolar}
                onChange={() => onChange('electricalFacilities', 'hasSolar', true)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="hasSolar"
                checked={!electricalFacilities.hasSolar}
                onChange={() => onChange('electricalFacilities', 'hasSolar', false)}
              />
              No
            </label>
            {errors.hasSolar && <p className="error-message">{errors.hasSolar}</p>}
          </div>
        </div>
        <div className="form-group">
          <label>Solar Setup used for</label>
          <input
            type="text"
            value={electricalFacilities.solarUsage}
            onChange={(e) => onChange('electricalFacilities', 'solarUsage', e.target.value)}
            placeholder="Describe solar usage"
          />
          {errors.solarUsage && <p className="error-message">{errors.solarUsage}</p>}
        </div>
        <div className="form-group">
          <label>Current Condition of Solar System</label>
          <select
            value={electricalFacilities.solarCondition}
            onChange={(e) => onChange('electricalFacilities', 'solarCondition', e.target.value)}
          >
            <option value="">Select</option>
            <option value="Functional">Functional</option>
            <option value="Needs Maintenance">Needs Maintenance</option>
            <option value="Not Working">Not Working</option>
          </select>
          {errors.solarCondition && <p className="error-message">{errors.solarCondition}</p>}
        </div>
        <div className="form-group">
          <label>Additional Comments or Issues</label>
          <textarea
            value={electricalFacilities.additionalComments}
            onChange={(e) => onChange('electricalFacilities', 'additionalComments', e.target.value)}
            placeholder="Describe any issues or comments"
          />
        </div>
        <div className="form-group">
          <label>Estimated Budget</label>
          <input
            type="number"
            value={electricalFacilities.estimatedBudget}
            onChange={(e) => onChange('electricalFacilities', 'estimatedBudget', parseInt(e.target.value) || 0)}
            placeholder="Enter estimated budget"
            min="0"
          />
          {errors.estimatedBudget && <p className="error-message">{errors.estimatedBudget}</p>}
        </div>
      </div>
    </div>
  );
};

export default ElectricalFacilitiesForm; 