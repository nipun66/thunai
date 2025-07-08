import React, { useState } from 'react';

type SHGParticipation = {
  memberName: string;
  groupName: string;
  yearsMembership: number;
  additionalDetails: string;
};

type Props = {
  householdData: any;
  onChange: (section: string, value: any) => void;
};

const defaultSHG: SHGParticipation = {
  memberName: '',
  groupName: '',
  yearsMembership: 0,
  additionalDetails: '',
};

const SHGParticipationForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<any>({});
  const validate = (field: string, value: any) => {
    let error = '';
    if (field === 'memberName' && !value) error = 'Member name is required';
    if (field === 'groupName' && !value) error = 'Group name is required';
    if (field === 'yearsMembership' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid number of years';
    setErrors((prev: any) => ({ ...prev, [field]: error }));
    return error === '';
  };
  const [newSHG, setNewSHG] = useState<SHGParticipation>(defaultSHG);

  const addSHG = () => {
    if (!newSHG.memberName || !newSHG.groupName) return;
    onChange('shgParticipation', [...(householdData.shgParticipation || []), newSHG]);
    setNewSHG(defaultSHG);
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
            {errors.memberName && <span className="error">{errors.memberName}</span>}
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
            {errors.groupName && <span className="error">{errors.groupName}</span>}
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
            {errors.yearsMembership && <span className="error">{errors.yearsMembership}</span>}
          </div>
          <div className="form-group full-width">
            <label>Additional Details / Role in Group</label>
            <textarea
              value={newSHG.additionalDetails}
              onChange={(e) => setNewSHG(prev => ({ ...prev, additionalDetails: e.target.value }))}
              placeholder="Any additional details or role in group"
            />
          </div>
        </div>
        <button type="button" onClick={addSHG} className="add-btn">
          ➕ Add SHG Participation
        </button>
      </div>
      {householdData.shgParticipation && householdData.shgParticipation.length > 0 && (
        <div className="shg-list">
          <h3>Added SHG Participations ({householdData.shgParticipation.length})</h3>
          <div className="shg-grid">
            {householdData.shgParticipation.map((shg: SHGParticipation, idx: number) => (
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