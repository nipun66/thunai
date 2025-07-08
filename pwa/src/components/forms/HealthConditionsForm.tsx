import React, { useState } from 'react';

type HealthCondition = {
  memberName: string;
  healthCondition: string;
  placeOfTreatment: string;
  additionalDetails: string;
  estimatedBudget: number;
};

type Props = {
  householdData: any;
  onChange: (section: string, value: any) => void;
};

const defaultCondition: HealthCondition = {
  memberName: '',
  healthCondition: '',
  placeOfTreatment: '',
  additionalDetails: '',
  estimatedBudget: 0,
};

const HealthConditionsForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [newCondition, setNewCondition] = useState<HealthCondition>(defaultCondition);

  const addCondition = () => {
    if (!newCondition.memberName || !newCondition.healthCondition) return;
    onChange('healthConditions', [...(householdData.healthConditions || []), newCondition]);
    setNewCondition(defaultCondition);
  };

  return (
    <div className="form-section">
      <h2>🩺 Family Members' Health Conditions</h2>
      <div className="add-condition-form">
        <h3>Add Health Condition</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Name of Family Member *</label>
            <input
              type="text"
              value={newCondition.memberName}
              onChange={(e) => setNewCondition(prev => ({ ...prev, memberName: e.target.value }))}
              placeholder="Enter member name"
            />
          </div>
          <div className="form-group">
            <label>Health Condition *</label>
            <input
              type="text"
              value={newCondition.healthCondition}
              onChange={(e) => setNewCondition(prev => ({ ...prev, healthCondition: e.target.value }))}
              placeholder="Describe health condition"
            />
          </div>
          <div className="form-group">
            <label>Place of Treatment</label>
            <input
              type="text"
              value={newCondition.placeOfTreatment}
              onChange={(e) => setNewCondition(prev => ({ ...prev, placeOfTreatment: e.target.value }))}
              placeholder="Enter hospital or treatment center"
            />
          </div>
          <div className="form-group full-width">
            <label>Additional Details</label>
            <textarea
              value={newCondition.additionalDetails}
              onChange={(e) => setNewCondition(prev => ({ ...prev, additionalDetails: e.target.value }))}
              placeholder="Any additional notes"
            />
          </div>
          <div className="form-group">
            <label>Estimated Budget (if applicable)</label>
            <input
              type="number"
              value={newCondition.estimatedBudget}
              onChange={(e) => setNewCondition(prev => ({ ...prev, estimatedBudget: parseInt(e.target.value) || 0 }))}
              placeholder="Enter estimated budget"
              min="0"
            />
          </div>
        </div>
        <button type="button" onClick={addCondition} className="add-btn">
          ➕ Add Health Condition
        </button>
      </div>
      {householdData.healthConditions && householdData.healthConditions.length > 0 && (
        <div className="conditions-list">
          <h3>Added Health Conditions ({householdData.healthConditions.length})</h3>
          <div className="conditions-grid">
            {householdData.healthConditions.map((cond: HealthCondition, idx: number) => (
              <div key={idx} className="condition-card">
                <h4>{cond.memberName}</h4>
                <p><strong>Condition:</strong> {cond.healthCondition}</p>
                <p><strong>Treatment:</strong> {cond.placeOfTreatment}</p>
                <p><strong>Budget:</strong> {cond.estimatedBudget}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthConditionsForm; 