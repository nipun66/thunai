import React, { useState } from 'react';

type LivelihoodOpportunity = {
  memberName: string;
  age: number;
  workSkillInterest: string;
  supportRequired: string;
  expectedIncome: number;
};

type Props = {
  householdData: any;
  onChange: (section: string, value: any) => void;
};

const defaultOpportunity: LivelihoodOpportunity = {
  memberName: '',
  age: 0,
  workSkillInterest: '',
  supportRequired: '',
  expectedIncome: 0,
};

const LivelihoodOpportunitiesForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [newOpportunity, setNewOpportunity] = useState<LivelihoodOpportunity>(defaultOpportunity);
  const [errors, setErrors] = useState<any>({});

  const validate = (field: string, value: any) => {
    let error = '';
    if (field === 'memberName' && !value) error = 'Name is required';
    if (field === 'age' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid age';
    if (field === 'workSkillInterest' && !value) error = 'Work/Skill type is required';
    if (field === 'supportRequired' && !value) error = 'Support required is required';
    if (field === 'expectedIncome' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid expected income';
    setErrors((prev: any) => ({ ...prev, [field]: error }));
    return error === '';
  };

  const addOpportunity = () => {
    if (!newOpportunity.memberName || !newOpportunity.workSkillInterest) return;
    onChange('livelihoodOpportunities', [...(householdData.livelihoodOpportunities || []), newOpportunity]);
    setNewOpportunity(defaultOpportunity);
  };

  return (
    <div className="form-section">
      <h2>💡 Potential New Livelihood Opportunities</h2>
      <div className="add-opportunity-form">
        <h3>Add Livelihood Opportunity</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Name of Member *</label>
            <input
              type="text"
              value={newOpportunity.memberName}
              onChange={(e) => setNewOpportunity(prev => ({ ...prev, memberName: e.target.value }))}
              onBlur={() => validate('memberName', newOpportunity.memberName)}
              placeholder="Enter member name"
            />
            {errors.memberName && <span className="error">{errors.memberName}</span>}
          </div>
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              value={newOpportunity.age}
              onChange={(e) => setNewOpportunity(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
              onBlur={() => validate('age', newOpportunity.age)}
              placeholder="Enter age"
              min="0"
            />
            {errors.age && <span className="error">{errors.age}</span>}
          </div>
          <div className="form-group">
            <label>Type of Work / Skill Interested In *</label>
            <input
              type="text"
              value={newOpportunity.workSkillInterest}
              onChange={(e) => setNewOpportunity(prev => ({ ...prev, workSkillInterest: e.target.value }))}
              onBlur={() => validate('workSkillInterest', newOpportunity.workSkillInterest)}
              placeholder="E.g., Tailoring, Farming, Driving, etc."
            />
            {errors.workSkillInterest && <span className="error">{errors.workSkillInterest}</span>}
          </div>
          <div className="form-group full-width">
            <label>Support Required</label>
            <textarea
              value={newOpportunity.supportRequired}
              onChange={(e) => setNewOpportunity(prev => ({ ...prev, supportRequired: e.target.value }))}
              onBlur={() => validate('supportRequired', newOpportunity.supportRequired)}
              placeholder="E.g., Toolkits, Training, Seed Capital, etc."
            />
            {errors.supportRequired && <span className="error">{errors.supportRequired}</span>}
          </div>
          <div className="form-group">
            <label>Expected Annual Income (if opportunity realized)</label>
            <input
              type="number"
              value={newOpportunity.expectedIncome}
              onChange={(e) => setNewOpportunity(prev => ({ ...prev, expectedIncome: parseInt(e.target.value) || 0 }))}
              onBlur={() => validate('expectedIncome', newOpportunity.expectedIncome)}
              placeholder="Enter expected income"
              min="0"
            />
            {errors.expectedIncome && <span className="error">{errors.expectedIncome}</span>}
          </div>
        </div>
        <button type="button" onClick={addOpportunity} className="add-btn">
          ➕ Add Livelihood Opportunity
        </button>
      </div>
      {householdData.livelihoodOpportunities && householdData.livelihoodOpportunities.length > 0 && (
        <div className="opportunities-list">
          <h3>Added Livelihood Opportunities ({householdData.livelihoodOpportunities.length})</h3>
          <div className="opportunities-grid">
            {householdData.livelihoodOpportunities.map((op: LivelihoodOpportunity, idx: number) => (
              <div key={idx} className="opportunity-card">
                <h4>{op.memberName}</h4>
                <p><strong>Age:</strong> {op.age}</p>
                <p><strong>Skill/Work:</strong> {op.workSkillInterest}</p>
                <p><strong>Support:</strong> {op.supportRequired}</p>
                <p><strong>Expected Income:</strong> {op.expectedIncome}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LivelihoodOpportunitiesForm; 