import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { FormValidator } from './validation';

type SanitationFacility = {
  hasToilet: boolean;
  hasBathroom: boolean;
  allUseToilet: boolean;
  usesPublicToilet: boolean;
  satisfiedWithPublic: boolean;
  publicToiletQuality: string;
  distanceToWater: number;
  toiletTankType: string;
  toiletClosetType: string;
  toiletRoofMaterial: string;
  toiletWallType: string;
  toiletDoorType: string;
  toiletFloorType: string;
  waterAvailability: string;
  additionalNotes: string;
  estimatedBudget: number;
};

type HouseholdData = {
  sanitationFacilities: SanitationFacility;
};

type Props = {
  householdData: HouseholdData;
  onChange: (section: string, field: string, value: any) => void;
};

const SanitationFacilitiesForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState({
    hasToilet: '', hasBathroom: '', allUseToilet: '', usesPublicToilet: '', satisfiedWithPublic: '', publicToiletQuality: '', distanceToWater: '', toiletTankType: '', toiletClosetType: '', toiletRoofMaterial: '', toiletWallType: '', toiletDoorType: '', toiletFloorType: '', waterAvailability: '', additionalNotes: '', estimatedBudget: ''
  });

  const validate = (field: keyof SanitationFacility, value: any) => {
    let error = '';
    if (field === 'hasToilet') error = FormValidator.validateBoolean(value) || '';
    if (field === 'hasBathroom') error = FormValidator.validateBoolean(value) || '';
    if (field === 'allUseToilet') error = FormValidator.validateBoolean(value) || '';
    if (field === 'usesPublicToilet') error = FormValidator.validateBoolean(value) || '';
    if (field === 'satisfiedWithPublic') error = FormValidator.validateBoolean(value) || '';
    if (field === 'publicToiletQuality') error = FormValidator.validateDropdown(value) || '';
    if (field === 'distanceToWater') error = FormValidator.validateNumber(value, { min: 0, max: 10000, integer: true }) || '';
    if (field === 'toiletTankType') error = FormValidator.validateDropdown(value) || '';
    if (field === 'toiletClosetType') error = FormValidator.validateDropdown(value) || '';
    if (field === 'toiletRoofMaterial') error = FormValidator.validateDropdown(value) || '';
    if (field === 'toiletWallType') error = FormValidator.validateDropdown(value) || '';
    if (field === 'toiletDoorType') error = FormValidator.validateDropdown(value) || '';
    if (field === 'toiletFloorType') error = FormValidator.validateDropdown(value) || '';
    if (field === 'waterAvailability') error = FormValidator.validateDropdown(value) || '';
    if (field === 'additionalNotes') error = FormValidator.validateTextarea(FormValidator.sanitize(value), { required: false, minLength: 0, maxLength: 200 }) || '';
    if (field === 'estimatedBudget') error = FormValidator.validateNumber(value, { min: 0, max: 1000000, integer: true }) || '';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };

  const handleChange = (field: keyof SanitationFacility, value: any) => {
    const sanitizedValue = FormValidator.sanitize(value);
    onChange('sanitationFacilities', field, sanitizedValue);
    validate(field, sanitizedValue);
  };

  const handleBooleanChange = (field: keyof SanitationFacility, value: boolean) => {
    onChange('sanitationFacilities', field, value);
    validate(field, value);
  };

  const handleNumberChange = (field: keyof SanitationFacility, value: number) => {
    onChange('sanitationFacilities', field, value);
    validate(field, value);
  };

  const handleDropdownChange = (field: keyof SanitationFacility, value: string) => {
    onChange('sanitationFacilities', field, value);
    validate(field, value);
  };

  return (
    <div className="form-section">
      <h2>🚽 Sanitation and Bathroom Facilities</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>Is there a toilet in the house?</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="hasToilet"
                checked={householdData.sanitationFacilities.hasToilet}
                onChange={() => handleBooleanChange('hasToilet', true)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="hasToilet"
                checked={!householdData.sanitationFacilities.hasToilet}
                onChange={() => handleBooleanChange('hasToilet', false)}
              />
              No
            </label>
          </div>
          {Boolean(errors.hasToilet) && <p className="error-text">{errors.hasToilet}</p>}
        </div>
        <div className="form-group">
          <label>Is there a bathroom in the house?</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="hasBathroom"
                checked={householdData.sanitationFacilities.hasBathroom}
                onChange={() => handleBooleanChange('hasBathroom', true)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="hasBathroom"
                checked={!householdData.sanitationFacilities.hasBathroom}
                onChange={() => handleBooleanChange('hasBathroom', false)}
              />
              No
            </label>
          </div>
          {Boolean(errors.hasBathroom) && <p className="error-text">{errors.hasBathroom}</p>}
        </div>
        <div className="form-group">
          <label>Do all family members use the toilet?</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="allUseToilet"
                checked={householdData.sanitationFacilities.allUseToilet}
                onChange={() => handleBooleanChange('allUseToilet', true)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="allUseToilet"
                checked={!householdData.sanitationFacilities.allUseToilet}
                onChange={() => handleBooleanChange('allUseToilet', false)}
              />
              No
            </label>
          </div>
          {Boolean(errors.allUseToilet) && <p className="error-text">{errors.allUseToilet}</p>}
        </div>
        <div className="form-group">
          <label>Is the family using a public/shared toilet?</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="usesPublicToilet"
                checked={householdData.sanitationFacilities.usesPublicToilet}
                onChange={() => handleBooleanChange('usesPublicToilet', true)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="usesPublicToilet"
                checked={!householdData.sanitationFacilities.usesPublicToilet}
                onChange={() => handleBooleanChange('usesPublicToilet', false)}
              />
              No
            </label>
          </div>
          {Boolean(errors.usesPublicToilet) && <p className="error-text">{errors.usesPublicToilet}</p>}
        </div>
        <div className="form-group">
          <label>Are family members satisfied with the public toilet?</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="satisfiedWithPublic"
                checked={householdData.sanitationFacilities.satisfiedWithPublic}
                onChange={() => handleBooleanChange('satisfiedWithPublic', true)}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="satisfiedWithPublic"
                checked={!householdData.sanitationFacilities.satisfiedWithPublic}
                onChange={() => handleBooleanChange('satisfiedWithPublic', false)}
              />
              No
            </label>
          </div>
          {Boolean(errors.satisfiedWithPublic) && <p className="error-text">{errors.satisfiedWithPublic}</p>}
        </div>
        <div className="form-group">
          <label>Quality of public/shared toilet used</label>
          <select
            value={householdData.sanitationFacilities.publicToiletQuality}
            onChange={(e) => handleDropdownChange('publicToiletQuality', e.target.value)}
          >
            <option value="">Select Quality</option>
            <option value="Good">Good</option>
            <option value="Satisfactory">Satisfactory</option>
            <option value="Poor">Poor</option>
            <option value="Very Poor">Very Poor</option>
          </select>
          {Boolean(errors.publicToiletQuality) && <p className="error-text">{errors.publicToiletQuality}</p>}
        </div>
        <div className="form-group">
          <label>Distance from toilet tank to nearest water source (meters)</label>
          <input
            type="number"
            value={householdData.sanitationFacilities.distanceToWater}
            onChange={(e) => handleNumberChange('distanceToWater', parseInt(e.target.value) || 0)}
            placeholder="Enter distance in meters"
            min="0"
          />
          {Boolean(errors.distanceToWater) && <p className="error-text">{errors.distanceToWater}</p>}
        </div>
        <div className="form-group">
          <label>Toilet Tank Type</label>
          <select
            value={householdData.sanitationFacilities.toiletTankType}
            onChange={(e) => handleDropdownChange('toiletTankType', e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="Single Pit">Single Pit</option>
            <option value="Twin Pit">Twin Pit</option>
            <option value="Septic Tank">Septic Tank</option>
          </select>
          {Boolean(errors.toiletTankType) && <p className="error-text">{errors.toiletTankType}</p>}
        </div>
        <div className="form-group">
          <label>Toilet Closet Type</label>
          <select
            value={householdData.sanitationFacilities.toiletClosetType}
            onChange={(e) => handleDropdownChange('toiletClosetType', e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="Indian">Indian</option>
            <option value="European">European</option>
          </select>
          {Boolean(errors.toiletClosetType) && <p className="error-text">{errors.toiletClosetType}</p>}
        </div>
        <div className="form-group">
          <label>Roof Material</label>
          <select
            value={householdData.sanitationFacilities.toiletRoofMaterial}
            onChange={(e) => handleDropdownChange('toiletRoofMaterial', e.target.value)}
          >
            <option value="">Select Material</option>
            <option value="Concrete">Concrete</option>
            <option value="Tile">Tile</option>
            <option value="Sheet">Sheet</option>
            <option value="Others">Others</option>
          </select>
          {Boolean(errors.toiletRoofMaterial) && <p className="error-text">{errors.toiletRoofMaterial}</p>}
        </div>
        <div className="form-group">
          <label>Wall Type</label>
          <select
            value={householdData.sanitationFacilities.toiletWallType}
            onChange={(e) => handleDropdownChange('toiletWallType', e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="Tile">Tile</option>
            <option value="Concrete">Concrete</option>
            <option value="Temporary">Temporary</option>
          </select>
          {Boolean(errors.toiletWallType) && <p className="error-text">{errors.toiletWallType}</p>}
        </div>
        <div className="form-group">
          <label>Door Type</label>
          <select
            value={householdData.sanitationFacilities.toiletDoorType}
            onChange={(e) => handleDropdownChange('toiletDoorType', e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="Wooden">Wooden</option>
            <option value="PVC">PVC</option>
            <option value="GI">GI</option>
            <option value="Sheet">Sheet</option>
            <option value="Temporary">Temporary</option>
          </select>
          {Boolean(errors.toiletDoorType) && <p className="error-text">{errors.toiletDoorType}</p>}
        </div>
        <div className="form-group">
          <label>Floor Type</label>
          <select
            value={householdData.sanitationFacilities.toiletFloorType}
            onChange={(e) => handleDropdownChange('toiletFloorType', e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="Tile">Tile</option>
            <option value="Cement">Cement</option>
            <option value="Concrete">Concrete</option>
            <option value="Temporary">Temporary</option>
          </select>
          {Boolean(errors.toiletFloorType) && <p className="error-text">{errors.toiletFloorType}</p>}
        </div>
        <div className="form-group">
          <label>Water Availability</label>
          <select
            value={householdData.sanitationFacilities.waterAvailability}
            onChange={(e) => handleDropdownChange('waterAvailability', e.target.value)}
          >
            <option value="">Select</option>
            <option value="Inside">Inside</option>
            <option value="Nearby">Nearby</option>
            <option value="Far Away">Far Away</option>
            <option value="Needs to be carried">Needs to be carried</option>
          </select>
          {Boolean(errors.waterAvailability) && <p className="error-text">{errors.waterAvailability}</p>}
        </div>
        <div className="form-group full-width">
          <label>Additional Notes</label>
          <textarea
            value={householdData.sanitationFacilities.additionalNotes}
            onChange={(e) => handleChange('additionalNotes', e.target.value)}
            placeholder="Describe toilet/bathroom condition"
          />
          {Boolean(errors.additionalNotes) && <p className="error-text">{errors.additionalNotes}</p>}
        </div>
        <div className="form-group">
          <label>Estimated Budget</label>
          <input
            type="number"
            value={householdData.sanitationFacilities.estimatedBudget}
            onChange={(e) => handleNumberChange('estimatedBudget', parseInt(e.target.value) || 0)}
            placeholder="Enter estimated budget"
            min="0"
          />
          {Boolean(errors.estimatedBudget) && <p className="error-text">{errors.estimatedBudget}</p>}
        </div>
      </div>
    </div>
  );
};

export default SanitationFacilitiesForm; 