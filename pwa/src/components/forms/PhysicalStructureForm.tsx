import React, { useState } from 'react';

type HousingDetail = {
  completionStatus: string;
  ageOfHouse: number;
  currentCondition: string;
  roofMaterial: string;
  roofCondition: string;
  roofBudget: number;
  wallMaterial: string;
  wallCondition: string;
  wallBudget: number;
  floorMaterial: string;
  floorNeedsRepair: boolean;
  floorBudget: number;
  doorCondition: string;
  goodDoorsCount: number;
  windowCondition: string;
  goodWindowsCount: number;
  doorWindowBudget: number;
  kitchenVentilation: string;
  kitchenAppliances: string[];
  kitchenBudget: number;
};

type Props = {
  householdData: { housingDetails: HousingDetail };
  onChange: (section: string, field: keyof HousingDetail, value: any) => void;
};

const PhysicalStructureForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<Partial<Record<keyof HousingDetail, string>>>({});

  const validate = (field: keyof HousingDetail, value: any) => {
    let error = '';
    if (field === 'completionStatus' && !value) error = 'Completion status is required';
    if (field === 'ageOfHouse' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid age';
    if (field === 'currentCondition' && !value) error = 'Current condition is required';
    if (field === 'roofMaterial' && !value) error = 'Roof material is required';
    if (field === 'roofCondition' && !value) error = 'Roof condition is required';
    if (field === 'roofBudget' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid budget';
    if (field === 'wallMaterial' && !value) error = 'Wall material is required';
    if (field === 'wallCondition' && !value) error = 'Wall condition is required';
    if (field === 'wallBudget' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid budget';
    if (field === 'floorMaterial' && !value) error = 'Floor material is required';
    if (field === 'floorNeedsRepair' && typeof value !== 'boolean') error = 'Floor needs repair must be a boolean';
    if (field === 'floorBudget' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid budget';
    if (field === 'doorCondition' && !value) error = 'Door condition is required';
    if (field === 'goodDoorsCount' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid number of good doors';
    if (field === 'windowCondition' && !value) error = 'Window condition is required';
    if (field === 'goodWindowsCount' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid number of good windows';
    if (field === 'doorWindowBudget' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid budget for doors/windows';
    if (field === 'kitchenVentilation' && !value) error = 'Kitchen ventilation is required';
    if (field === 'kitchenAppliances' && (!Array.isArray(value) || value.length === 0)) error = 'At least one kitchen appliance is required';
    if (field === 'kitchenBudget' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid budget for kitchen';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };

  return (
    <div className="form-section">
      <h2>🏗️ Physical Structure Details</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>Completion Status</label>
          <select
            value={householdData.housingDetails.completionStatus}
            onChange={e => { onChange('housingDetails', 'completionStatus', e.target.value); validate('completionStatus', e.target.value); }}
            onBlur={e => validate('completionStatus', e.target.value)}
            required
          >
            <option value="">Select Status</option>
            <option value="Completed">Completed</option>
            <option value="Not Started">Not Started</option>
            <option value="Under Construction">Under Construction</option>
          </select>
          {errors.completionStatus && <span className="error">{errors.completionStatus}</span>}
        </div>
        <div className="form-group">
          <label>Age of House (Years)</label>
          <input
            type="number"
            value={householdData.housingDetails.ageOfHouse}
            onChange={(e) => onChange('housingDetails', 'ageOfHouse', parseInt(e.target.value) || 0)}
            onBlur={e => validate('ageOfHouse', e.target.value)}
            placeholder="Enter age of house"
            min="0"
            required
          />
          {errors.ageOfHouse && <span className="error">{errors.ageOfHouse}</span>}
        </div>
        <div className="form-group">
          <label>Current Condition</label>
          <select
            value={householdData.housingDetails.currentCondition}
            onChange={(e) => onChange('housingDetails', 'currentCondition', e.target.value)}
            onBlur={e => validate('currentCondition', e.target.value)}
            required
          >
            <option value="">Select Condition</option>
            <option value="New/Good">New/Good</option>
            <option value="Old/Good">Old/Good</option>
            <option value="Needs Repair">Needs Repair</option>
            <option value="Dilapidated">Dilapidated</option>
          </select>
          {errors.currentCondition && <span className="error">{errors.currentCondition}</span>}
        </div>
        <div className="form-group">
          <label>Roof Material</label>
          <select
            value={householdData.housingDetails.roofMaterial}
            onChange={(e) => onChange('housingDetails', 'roofMaterial', e.target.value)}
            onBlur={e => validate('roofMaterial', e.target.value)}
            required
          >
            <option value="">Select Roof Material</option>
            <option value="Concrete">Concrete</option>
            <option value="Tile">Tile</option>
            <option value="Asbestos Sheet">Asbestos Sheet</option>
            <option value="GI/Aluminum">GI/Aluminum</option>
            <option value="Plastic Sheet">Plastic Sheet</option>
            <option value="Palm Leaf">Palm Leaf</option>
            <option value="Other">Other</option>
          </select>
          {errors.roofMaterial && <span className="error">{errors.roofMaterial}</span>}
        </div>
        <div className="form-group">
          <label>Roof Condition</label>
          <select
            value={householdData.housingDetails.roofCondition}
            onChange={(e) => onChange('housingDetails', 'roofCondition', e.target.value)}
            onBlur={e => validate('roofCondition', e.target.value)}
            required
          >
            <option value="">Select Condition</option>
            <option value="Good">Good</option>
            <option value="Needs Minor Repairs">Needs Minor Repairs</option>
            <option value="Dilapidated">Dilapidated</option>
          </select>
          {errors.roofCondition && <span className="error">{errors.roofCondition}</span>}
        </div>
        <div className="form-group">
          <label>Estimated Roof Budget</label>
          <input
            type="number"
            value={householdData.housingDetails.roofBudget}
            onChange={(e) => onChange('housingDetails', 'roofBudget', parseInt(e.target.value) || 0)}
            onBlur={e => validate('roofBudget', e.target.value)}
            placeholder="Enter estimated budget for roof"
            min="0"
            required
          />
          {errors.roofBudget && <span className="error">{errors.roofBudget}</span>}
        </div>
        <div className="form-group">
          <label>Wall Material</label>
          <select
            value={householdData.housingDetails.wallMaterial}
            onChange={(e) => onChange('housingDetails', 'wallMaterial', e.target.value)}
            onBlur={e => validate('wallMaterial', e.target.value)}
            required
          >
            <option value="">Select Wall Material</option>
            <option value="Cement Blocks">Cement Blocks</option>
            <option value="Bricks">Bricks</option>
            <option value="Mud Blocks">Mud Blocks</option>
            <option value="Bamboo">Bamboo</option>
            <option value="Clay">Clay</option>
            <option value="Others">Others</option>
          </select>
          {errors.wallMaterial && <span className="error">{errors.wallMaterial}</span>}
        </div>
        <div className="form-group">
          <label>Wall Condition</label>
          <select
            value={householdData.housingDetails.wallCondition}
            onChange={(e) => onChange('housingDetails', 'wallCondition', e.target.value)}
            onBlur={e => validate('wallCondition', e.target.value)}
            required
          >
            <option value="">Select Condition</option>
            <option value="Stable">Stable</option>
            <option value="Repairable">Repairable</option>
            <option value="Needs Major Repairs">Needs Major Repairs</option>
          </select>
          {errors.wallCondition && <span className="error">{errors.wallCondition}</span>}
        </div>
        <div className="form-group">
          <label>Estimated Wall Budget</label>
          <input
            type="number"
            value={householdData.housingDetails.wallBudget}
            onChange={(e) => onChange('housingDetails', 'wallBudget', parseInt(e.target.value) || 0)}
            onBlur={e => validate('wallBudget', e.target.value)}
            placeholder="Enter estimated budget for wall"
            min="0"
            required
          />
          {errors.wallBudget && <span className="error">{errors.wallBudget}</span>}
        </div>
        <div className="form-group">
          <label>Floor Material</label>
          <select
            value={householdData.housingDetails.floorMaterial}
            onChange={(e) => onChange('housingDetails', 'floorMaterial', e.target.value)}
            onBlur={e => validate('floorMaterial', e.target.value)}
            required
          >
            <option value="">Select Floor Material</option>
            <option value="Granite/Marble">Granite/Marble</option>
            <option value="Cement">Cement</option>
            <option value="Rough Finish">Rough Finish</option>
            <option value="Mud Floor">Mud Floor</option>
            <option value="Others">Others</option>
          </select>
          {errors.floorMaterial && <span className="error">{errors.floorMaterial}</span>}
        </div>
        <div className="form-group">
          <label>Floor Needs Repair</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="floorRepair"
                checked={householdData.housingDetails.floorNeedsRepair}
                onChange={() => onChange('housingDetails', 'floorNeedsRepair', true)}
                onBlur={() => validate('floorNeedsRepair', true)}
                required
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="floorRepair"
                checked={!householdData.housingDetails.floorNeedsRepair}
                onChange={() => onChange('housingDetails', 'floorNeedsRepair', false)}
                onBlur={() => validate('floorNeedsRepair', false)}
                required
              />
              No
            </label>
          </div>
          {errors.floorNeedsRepair && <span className="error">{errors.floorNeedsRepair}</span>}
        </div>
        <div className="form-group">
          <label>Estimated Floor Budget</label>
          <input
            type="number"
            value={householdData.housingDetails.floorBudget}
            onChange={(e) => onChange('housingDetails', 'floorBudget', parseInt(e.target.value) || 0)}
            onBlur={e => validate('floorBudget', e.target.value)}
            placeholder="Enter estimated budget for floor"
            min="0"
            required
          />
          {errors.floorBudget && <span className="error">{errors.floorBudget}</span>}
        </div>
        <div className="form-group">
          <label>Door Condition</label>
          <select
            value={householdData.housingDetails.doorCondition}
            onChange={(e) => onChange('housingDetails', 'doorCondition', e.target.value)}
            onBlur={e => validate('doorCondition', e.target.value)}
            required
          >
            <option value="">Select Door Condition</option>
            <option value="Good">Good</option>
            <option value="Needs Repair">Needs Repair</option>
            <option value="Dilapidated">Dilapidated</option>
            <option value="Temporary Setup">Temporary Setup</option>
          </select>
          {errors.doorCondition && <span className="error">{errors.doorCondition}</span>}
        </div>
        <div className="form-group">
          <label>Number of Good Doors</label>
          <input
            type="number"
            value={householdData.housingDetails.goodDoorsCount}
            onChange={(e) => onChange('housingDetails', 'goodDoorsCount', parseInt(e.target.value) || 0)}
            onBlur={e => validate('goodDoorsCount', e.target.value)}
            placeholder="Enter number of good doors"
            min="0"
            required
          />
          {errors.goodDoorsCount && <span className="error">{errors.goodDoorsCount}</span>}
        </div>
        <div className="form-group">
          <label>Window Condition</label>
          <select
            value={householdData.housingDetails.windowCondition}
            onChange={(e) => onChange('housingDetails', 'windowCondition', e.target.value)}
            onBlur={e => validate('windowCondition', e.target.value)}
            required
          >
            <option value="">Select Window Condition</option>
            <option value="Good">Good</option>
            <option value="Needs Repair">Needs Repair</option>
            <option value="Dilapidated">Dilapidated</option>
            <option value="Temporary Setup">Temporary Setup</option>
          </select>
          {errors.windowCondition && <span className="error">{errors.windowCondition}</span>}
        </div>
        <div className="form-group">
          <label>Number of Good Windows</label>
          <input
            type="number"
            value={householdData.housingDetails.goodWindowsCount}
            onChange={(e) => onChange('housingDetails', 'goodWindowsCount', parseInt(e.target.value) || 0)}
            onBlur={e => validate('goodWindowsCount', e.target.value)}
            placeholder="Enter number of good windows"
            min="0"
            required
          />
          {errors.goodWindowsCount && <span className="error">{errors.goodWindowsCount}</span>}
        </div>
        <div className="form-group">
          <label>Estimated Door/Window Budget</label>
          <input
            type="number"
            value={householdData.housingDetails.doorWindowBudget}
            onChange={(e) => onChange('housingDetails', 'doorWindowBudget', parseInt(e.target.value) || 0)}
            onBlur={e => validate('doorWindowBudget', e.target.value)}
            placeholder="Enter estimated budget for doors/windows"
            min="0"
            required
          />
          {errors.doorWindowBudget && <span className="error">{errors.doorWindowBudget}</span>}
        </div>
        <div className="form-group">
          <label>Kitchen Ventilation</label>
          <select
            value={householdData.housingDetails.kitchenVentilation}
            onChange={(e) => onChange('housingDetails', 'kitchenVentilation', e.target.value)}
            onBlur={e => validate('kitchenVentilation', e.target.value)}
            required
          >
            <option value="">Select Ventilation</option>
            <option value="Good">Good</option>
            <option value="Needs Repair">Needs Repair</option>
            <option value="Poor">Poor</option>
            <option value="None">None</option>
          </select>
          {errors.kitchenVentilation && <span className="error">{errors.kitchenVentilation}</span>}
        </div>
        <div className="form-group">
          <label>Available Appliances</label>
          <select
            multiple
            value={householdData.housingDetails.kitchenAppliances}
            onChange={(e) => {
              const options = Array.from(e.target.selectedOptions, option => option.value);
              onChange('housingDetails', 'kitchenAppliances', options);
            }}
            onBlur={e => validate('kitchenAppliances', e.target.value)}
            required
          >
            <option value="Mixer">Mixer</option>
            <option value="Fridge">Fridge</option>
            <option value="Oven">Oven</option>
            <option value="Grinder">Grinder</option>
            <option value="Pressure Cooker">Pressure Cooker</option>
            <option value="Others">Others</option>
          </select>
          {errors.kitchenAppliances && <span className="error">{errors.kitchenAppliances}</span>}
        </div>
        <div className="form-group">
          <label>Estimated Kitchen Budget</label>
          <input
            type="number"
            value={householdData.housingDetails.kitchenBudget}
            onChange={(e) => onChange('housingDetails', 'kitchenBudget', parseInt(e.target.value) || 0)}
            onBlur={e => validate('kitchenBudget', e.target.value)}
            placeholder="Enter estimated budget for kitchen"
            min="0"
            required
          />
          {errors.kitchenBudget && <span className="error">{errors.kitchenBudget}</span>}
        </div>
      </div>
    </div>
  );
};

export default PhysicalStructureForm; 