import React, { useState } from 'react';
import { FormValidator } from './validation';

type SHGParticipation = {
  memberName: string;
  groupName: string;
  yearsMembership: number;
  additionalDetails: string;
};

type HouseholdData = {
  shgParticipation?: SHGParticipation[];
  // ...other fields
};

type Props = {
  householdData: HouseholdData;
  onChange: (section: string, value: any) => void;
};

type SHGParticipationError = Partial<Record<keyof SHGParticipation, string>>;

const defaultSHG: SHGParticipation = {
  memberName: '',
  groupName: '',
  yearsMembership: 0,
  additionalDetails: '',
};

const resetErrors = { memberName: '', groupName: '', yearsMembership: '', additionalDetails: '' };

const SHGParticipationForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState({
    memberName: '', groupName: '', yearsMembership: '', additionalDetails: ''
  });
  const safeData = householdData || {};
  const shgParticipation: SHGParticipation[] = safeData.shgParticipation || [];

  const validate = (field: keyof SHGParticipation, value: any) => {
    let error = '';
    if (field === 'memberName') error = FormValidator.validateName(FormValidator.sanitize(value)) || '';
    if (field === 'groupName') error = FormValidator.validateText(FormValidator.sanitize(value), { minLength: 2, maxLength: 100 }) || '';
    if (field === 'yearsMembership') error = FormValidator.validateNumber(value, { min: 0, max: 100, integer: true }) || '';
    if (field === 'additionalDetails') error = FormValidator.validateTextarea(FormValidator.sanitize(value), { required: false, minLength: 0, maxLength: 200 }) || '';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };

  const validateAll = () => {
    let valid = true;
    (Object.keys(newSHG) as (keyof SHGParticipation)[]).forEach((field) => {
      if (!validate(field, newSHG[field])) valid = false;
    });
    return valid;
  };

  const [newSHG, setNewSHG] = useState<SHGParticipation>(defaultSHG);

  const addSHG = () => {
    if (!validateAll()) return;
    onChange('shgParticipation', [...shgParticipation, newSHG]);
    setNewSHG(defaultSHG);
    setErrors(resetErrors);
  };

  return (
    <div className="form-section">
      <h2>👥 Participation in Neighbourhood or SHGs</h2>
      <div className="add-shg-form">
        <h3>Add SHG Participation</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Name of Member *</label>
            <input
              type="text"
              value={newSHG.memberName}
              onChange={(e) => { setNewSHG(prev => ({ ...prev, memberName: e.target.value })); validate('memberName', e.target.value); }}
              onBlur={e => validate('memberName', e.target.value)}
              placeholder="Enter member name"
            />
            {Boolean(errors.memberName) && <span className="error">{errors.memberName}</span>}
          </div>
          <div className="form-group">
            <label>Name of Group / Organization *</label>
            <input
              type="text"
              value={newSHG.groupName}
              onChange={(e) => { setNewSHG(prev => ({ ...prev, groupName: e.target.value })); validate('groupName', e.target.value); }}
              onBlur={e => validate('groupName', e.target.value)}
              placeholder="Enter group or organization name"
            />
            {Boolean(errors.groupName) && <span className="error">{errors.groupName}</span>}
          </div>
          <div className="form-group">
            <label>Years of Membership</label>
            <input
              type="number"
              value={newSHG.yearsMembership}
              onChange={(e) => { setNewSHG(prev => ({ ...prev, yearsMembership: parseInt(e.target.value) || 0 })); validate('yearsMembership', e.target.value); }}
              onBlur={e => validate('yearsMembership', e.target.value)}
              placeholder="Enter years of membership"
              min="0"
            />
            {Boolean(errors.yearsMembership) && <span className="error">{errors.yearsMembership}</span>}
          </div>
          <div className="form-group full-width">
            <label>Additional Details / Role in Group</label>
            <textarea
              value={newSHG.additionalDetails}
              onChange={(e) => setNewSHG(prev => ({ ...prev, additionalDetails: e.target.value }))}
              placeholder="Any additional details or role in group"
            />
            {Boolean(errors.additionalDetails) && <span className="error">{errors.additionalDetails}</span>}
          </div>
        </div>
        <button type="button" onClick={addSHG} className="add-btn">
          ➕ Add SHG Participation
        </button>
      </div>
      {shgParticipation && shgParticipation.length > 0 && (
        <div className="shg-list">
          <h3>Added SHG Participations ({shgParticipation.length})</h3>
          <div className="shg-grid">
            {shgParticipation.map((shg: SHGParticipation, idx: number) => (
              <div key={idx} className="shg-card">
                <h4>{shg.memberName}</h4>
                <p><strong>Group:</strong> {shg.groupName}</p>
                <p><strong>Years:</strong> {shg.yearsMembership}</p>
                <p><strong>Details:</strong> {shg.additionalDetails}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SHGParticipationForm; 