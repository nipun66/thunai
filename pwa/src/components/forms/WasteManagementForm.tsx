import React from 'react';

type WasteManagement = {
  solidWasteFacility: string;
  liquidWasteFacility: string;
  wastewaterHandling: string;
  additionalRemarks: string;
  estimatedBudget: number;
};

type Props = {
  householdData: any;
  onChange: (section: string, field: string, value: any) => void;
};

const WasteManagementForm: React.FC<Props> = ({ householdData, onChange }) => (
  <div className="form-section">
    <h2>🗑️ Waste Management Details</h2>
    <div className="form-grid">
      <div className="form-group">
        <label>Current Solid Waste Disposal Facility Available</label>
        <input
          type="text"
          value={householdData.wasteManagement.solidWasteFacility}
          onChange={(e) => onChange('wasteManagement', 'solidWasteFacility', e.target.value)}
          placeholder="Describe solid waste facility"
        />
      </div>
      <div className="form-group">
        <label>Current Liquid Waste Disposal Facility Available</label>
        <input
          type="text"
          value={householdData.wasteManagement.liquidWasteFacility}
          onChange={(e) => onChange('wasteManagement', 'liquidWasteFacility', e.target.value)}
          placeholder="Describe liquid waste facility"
        />
      </div>
      <div className="form-group">
        <label>Household Waste Water Handling Options</label>
        <input
          type="text"
          value={householdData.wasteManagement.wastewaterHandling}
          onChange={(e) => onChange('wasteManagement', 'wastewaterHandling', e.target.value)}
          placeholder="Describe waste water handling"
        />
      </div>
      <div className="form-group full-width">
        <label>Additional Remarks</label>
        <textarea
          value={householdData.wasteManagement.additionalRemarks}
          onChange={(e) => onChange('wasteManagement', 'additionalRemarks', e.target.value)}
          placeholder="Any remarks about waste management"
        />
      </div>
      <div className="form-group">
        <label>Estimated Budget for Improvements</label>
        <input
          type="number"
          value={householdData.wasteManagement.estimatedBudget}
          onChange={(e) => onChange('wasteManagement', 'estimatedBudget', parseInt(e.target.value) || 0)}
          placeholder="Enter estimated budget"
          min="0"
        />
      </div>
    </div>
  </div>
);

export default WasteManagementForm; 