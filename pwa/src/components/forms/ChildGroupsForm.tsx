import React, { useState } from 'react';

type ChildGroup = {
  organizationName: string;
  childParticipants: string;
  roleActivity: string;
  additionalNotes: string;
};

type Props = {
  householdData: any;
  onChange: (section: string, value: any) => void;
};

const defaultGroup: ChildGroup = {
  organizationName: '',
  childParticipants: '',
  roleActivity: '',
  additionalNotes: '',
};

const ChildGroupsForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<any>({});
  const validate = (field: string, value: any) => {
    let error = '';
    if (field === 'groupName' && !value) error = 'Group name is required';
    if (field === 'childrenCount' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid number of children';
    setErrors((prev: any) => ({ ...prev, [field]: error }));
    return error === '';
  };
  const [newGroup, setNewGroup] = useState<ChildGroup>(defaultGroup);
  const safeData = householdData || {};
  const childGroups: ChildGroup[] = safeData.childGroups || [];

  const addGroup = () => {
    if (!newGroup.organizationName || !newGroup.childParticipants) return;
    onChange('childGroups', [...childGroups, newGroup]);
    setNewGroup(defaultGroup);
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
              onChange={(e) => setNewGroup(prev => ({ ...prev, organizationName: e.target.value }))}
              placeholder="Enter organization name"
            />
          </div>
          <div className="form-group">
            <label>Name(s) of Child Participant(s) *</label>
            <input
              type="text"
              value={newGroup.childParticipants}
              onChange={(e) => setNewGroup(prev => ({ ...prev, childParticipants: e.target.value }))}
              placeholder="Enter child participant names"
            />
          </div>
          <div className="form-group full-width">
            <label>Role / Activity</label>
            <textarea
              value={newGroup.roleActivity}
              onChange={(e) => setNewGroup(prev => ({ ...prev, roleActivity: e.target.value }))}
              placeholder="Describe role or activity"
            />
          </div>
          <div className="form-group full-width">
            <label>Additional Notes</label>
            <textarea
              value={newGroup.additionalNotes}
              onChange={(e) => setNewGroup(prev => ({ ...prev, additionalNotes: e.target.value }))}
              placeholder="Any additional notes"
            />
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