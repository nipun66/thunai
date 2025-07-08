import React, { useState } from 'react';

type WasteManagement = {
  solidWasteFacility: string;
  liquidWasteFacility: string;
  wastewaterHandling: string;
  additionalRemarks: string;
  estimatedBudget: number;
};

type HouseholdData = {
  wasteManagement: WasteManagement;
};

type Props = {
  householdData: HouseholdData;
  onChange: (section: string, field: string, value: any) => void;
};

const WasteManagementForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState({
    solidWasteFacility: '', liquidWasteFacility: '', wastewaterHandling: '', additionalRemarks: '', estimatedBudget: ''
  });
  const validate = (field: keyof WasteManagement, value: any) => {
    let error = '';
    if (field === 'solidWasteFacility') error = value ? '' : 'Required';
    if (field === 'liquidWasteFacility') error = value ? '' : 'Required';
    if (field === 'wastewaterHandling') error = value ? '' : 'Required';
    if (field === 'additionalRemarks') error = '';
    if (field === 'estimatedBudget') error = isNaN(value) || value < 0 ? 'Enter a valid budget' : '';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };
  return (
    <div className="form-section">
      <h2>🗑️ Waste Management Details</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>Current Solid Waste Disposal Facility Available</label>
          <input
            type="text"
            value={householdData.wasteManagement.solidWasteFacility}
            onChange={e => { onChange('wasteManagement', 'solidWasteFacility', e.target.value); validate('solidWasteFacility', e.target.value); }}
            placeholder="Describe solid waste facility"
          />
          {Boolean(errors.solidWasteFacility) && <span className="error">{errors.solidWasteFacility}</span>}
        </div>
        <div className="form-group">
          <label>Current Liquid Waste Disposal Facility Available</label>
          <input
            type="text"
            value={householdData.wasteManagement.liquidWasteFacility}
            onChange={e => { onChange('wasteManagement', 'liquidWasteFacility', e.target.value); validate('liquidWasteFacility', e.target.value); }}
            placeholder="Describe liquid waste facility"
          />
          {Boolean(errors.liquidWasteFacility) && <span className="error">{errors.liquidWasteFacility}</span>}
        </div>
        <div className="form-group">
          <label>Household Waste Water Handling Options</label>
          <input
            type="text"
            value={householdData.wasteManagement.wastewaterHandling}
            onChange={e => { onChange('wasteManagement', 'wastewaterHandling', e.target.value); validate('wastewaterHandling', e.target.value); }}
            placeholder="Describe waste water handling"
          />
          {Boolean(errors.wastewaterHandling) && <span className="error">{errors.wastewaterHandling}</span>}
        </div>
        <div className="form-group full-width">
          <label>Additional Remarks</label>
          <textarea
            value={householdData.wasteManagement.additionalRemarks}
            onChange={e => { onChange('wasteManagement', 'additionalRemarks', e.target.value); validate('additionalRemarks', e.target.value); }}
            placeholder="Any remarks about waste management"
          />
          {Boolean(errors.additionalRemarks) && <span className="error">{errors.additionalRemarks}</span>}
        </div>
        <div className="form-group">
          <label>Estimated Budget for Improvements</label>
          <input
            type="number"
            value={householdData.wasteManagement.estimatedBudget}
            onChange={e => { onChange('wasteManagement', 'estimatedBudget', parseInt(e.target.value) || 0); validate('estimatedBudget', e.target.value); }}
            placeholder="Enter estimated budget"
            min="0"
          />
          {Boolean(errors.estimatedBudget) && <span className="error">{errors.estimatedBudget}</span>}
        </div>
      </div>
    </div>
  );
};

export default WasteManagementForm; 