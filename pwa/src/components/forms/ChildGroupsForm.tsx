import React, { useState } from 'react';
import { FormValidator } from './validation';

type ChildGroup = {
  organizationName: string;
  childParticipants: string;
  roleActivity: string;
  additionalNotes: string;
};

type HouseholdData = {
  childGroups?: ChildGroup[];
  // ...other fields
};

type Props = {
  householdData: HouseholdData;
  onChange: (section: string, value: any) => void;
};

type ChildGroupError = Partial<Record<keyof ChildGroup, string>>;

const defaultGroup: ChildGroup = {
  organizationName: '',
  childParticipants: '',
  roleActivity: '',
  additionalNotes: '',
};

const ChildGroupsForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState({
    organizationName: '', childParticipants: '', roleActivity: '', additionalNotes: ''
  });
  const validate = (field: keyof ChildGroup, value: any) => {
    let error = '';
    if (field === 'organizationName') error = FormValidator.validateText(FormValidator.sanitize(value), { minLength: 2, maxLength: 100 }) || '';
    if (field === 'childParticipants') error = FormValidator.validateText(FormValidator.sanitize(value), { minLength: 2, maxLength: 200 }) || '';
    if (field === 'roleActivity') error = FormValidator.validateTextarea(FormValidator.sanitize(value), { required: false, minLength: 0, maxLength: 200 }) || '';
    if (field === 'additionalNotes') error = FormValidator.validateTextarea(FormValidator.sanitize(value), { required: false, minLength: 0, maxLength: 200 }) || '';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };

  const validateAll = () => {
    let valid = true;
    (Object.keys(newGroup) as (keyof ChildGroup)[]).forEach((field) => {
      if (!validate(field, newGroup[field])) valid = false;
    });
    return valid;
  };

  const [newGroup, setNewGroup] = useState<ChildGroup>(defaultGroup);
  const safeData = householdData || {};
  const childGroups: ChildGroup[] = safeData.childGroups || [];

  const addGroup = () => {
    if (!validateAll()) return;
    onChange('childGroups', [...childGroups, newGroup]);
    setNewGroup(defaultGroup);
    setErrors({ organizationName: '', childParticipants: '', roleActivity: '', additionalNotes: '' });
  };

  return (
    <div className="form-section">
      <h2>👧 Participation in Other Child-Focused Groups</h2>
      <div className="add-group-form">
        <h3>Add Child Group Participation</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Name of Organization *</label>
            <input
              type="text"
              value={newGroup.organizationName}
              onChange={(e) => {
                const value = e.target.value;
                setNewGroup(prev => ({ ...prev, organizationName: value }));
                validate('organizationName', value);
              }}
              placeholder="Enter organization name"
            />
            {Boolean(errors.organizationName) && <p className="error-message">{errors.organizationName}</p>}
          </div>
          <div className="form-group">
            <label>Name(s) of Child Participant(s) *</label>
            <input
              type="text"
              value={newGroup.childParticipants}
              onChange={(e) => {
                const value = e.target.value;
                setNewGroup(prev => ({ ...prev, childParticipants: value }));
                validate('childParticipants', value);
              }}
              placeholder="Enter child participant names"
            />
            {Boolean(errors.childParticipants) && <p className="error-message">{errors.childParticipants}</p>}
          </div>
          <div className="form-group full-width">
            <label>Role / Activity</label>
            <textarea
              value={newGroup.roleActivity}
              onChange={(e) => {
                const value = e.target.value;
                setNewGroup(prev => ({ ...prev, roleActivity: value }));
                validate('roleActivity', value);
              }}
              placeholder="Describe role or activity"
            />
            {Boolean(errors.roleActivity) && <p className="error-message">{errors.roleActivity}</p>}
          </div>
          <div className="form-group full-width">
            <label>Additional Notes</label>
            <textarea
              value={newGroup.additionalNotes}
              onChange={(e) => {
                const value = e.target.value;
                setNewGroup(prev => ({ ...prev, additionalNotes: value }));
                validate('additionalNotes', value);
              }}
              placeholder="Any additional notes"
            />
            {Boolean(errors.additionalNotes) && <p className="error-message">{errors.additionalNotes}</p>}
          </div>
        </div>
        <button type="button" onClick={addGroup} className="add-btn">
          ➕ Add Child Group Participation
        </button>
      </div>
      {childGroups.length > 0 && (
        <div className="groups-list">
          <h3>Added Child Group Participations ({childGroups.length})</h3>
          <div className="groups-grid">
            {childGroups.map((group: ChildGroup, idx: number) => (
              <div key={idx} className="group-card">
                <h4>{group.organizationName}</h4>
                <p><strong>Participants:</strong> {group.childParticipants}</p>
                <p><strong>Role/Activity:</strong> {group.roleActivity}</p>
                <p><strong>Notes:</strong> {group.additionalNotes}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildGroupsForm; 