import React, { useState } from 'react';
import { FormValidator } from './validation';

type HealthCondition = {
  memberName: string;
  healthCondition: string;
  placeOfTreatment: string;
  additionalDetails: string;
  estimatedBudget: number;
};

type HouseholdData = {
  healthConditions?: HealthCondition[];
};

type Props = {
  householdData: HouseholdData;
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
  const [errors, setErrors] = useState({
    memberName: '', healthCondition: '', placeOfTreatment: '', additionalDetails: '', estimatedBudget: ''
  });

  const addCondition = () => {
    if (!newCondition.memberName || !newCondition.healthCondition) return;
    onChange('healthConditions', [...(householdData.healthConditions || []), newCondition]);
    setNewCondition(defaultCondition);
  };

  const validate = (field: keyof HealthCondition, value: any) => {
    let error = '';
    if (field === 'memberName') error = FormValidator.validateName(FormValidator.sanitize(value)) || '';
    if (field === 'healthCondition') error = FormValidator.validateText(FormValidator.sanitize(value), { minLength: 2, maxLength: 100 }) || '';
    if (field === 'placeOfTreatment') error = FormValidator.validateText(FormValidator.sanitize(value), { minLength: 2, maxLength: 100 }) || '';
    if (field === 'additionalDetails') error = FormValidator.validateTextarea(FormValidator.sanitize(value), { required: false, minLength: 0, maxLength: 200 }) || '';
    if (field === 'estimatedBudget') error = FormValidator.validateNumber(value, { min: 0, max: 1000000, integer: true }) || '';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
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
              onChange={(e) => {
                const value = e.target.value;
                setNewCondition(prev => ({ ...prev, memberName: value }));
                validate('memberName', value);
              }}
              placeholder="Enter member name"
            />
            {Boolean(errors.memberName) && <p className="error-text">{errors.memberName}</p>}
          </div>
          <div className="form-group">
            <label>Health Condition *</label>
            <input
              type="text"
              value={newCondition.healthCondition}
              onChange={(e) => {
                const value = e.target.value;
                setNewCondition(prev => ({ ...prev, healthCondition: value }));
                validate('healthCondition', value);
              }}
              placeholder="Describe health condition"
            />
            {Boolean(errors.healthCondition) && <p className="error-text">{errors.healthCondition}</p>}
          </div>
          <div className="form-group">
            <label>Place of Treatment</label>
            <input
              type="text"
              value={newCondition.placeOfTreatment}
              onChange={(e) => {
                const value = e.target.value;
                setNewCondition(prev => ({ ...prev, placeOfTreatment: value }));
                validate('placeOfTreatment', value);
              }}
              placeholder="Enter hospital or treatment center"
            />
            {Boolean(errors.placeOfTreatment) && <p className="error-text">{errors.placeOfTreatment}</p>}
          </div>
          <div className="form-group full-width">
            <label>Additional Details</label>
            <textarea
              value={newCondition.additionalDetails}
              onChange={(e) => {
                const value = e.target.value;
                setNewCondition(prev => ({ ...prev, additionalDetails: value }));
                validate('additionalDetails', value);
              }}
              placeholder="Any additional notes"
            />
            {Boolean(errors.additionalDetails) && <p className="error-text">{errors.additionalDetails}</p>}
          </div>
          <div className="form-group">
            <label>Estimated Budget (if applicable)</label>
            <input
              type="number"
              value={newCondition.estimatedBudget}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 0;
                setNewCondition(prev => ({ ...prev, estimatedBudget: value }));
                validate('estimatedBudget', value);
              }}
              placeholder="Enter estimated budget"
              min="0"
            />
            {Boolean(errors.estimatedBudget) && <p className="error-text">{errors.estimatedBudget}</p>}
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