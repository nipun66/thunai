import React, { useState } from 'react';

type BalasabhaParticipation = {
  hasChildrenMembers: boolean;
  childrenCount: number;
};

type Props = {
  householdData: any;
  onChange: (section: string, field: string, value: any) => void;
};

const BalasabhaParticipationForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<any>({});
  const validate = (field: string, value: any) => {
    let error = '';
    if (field === 'participantName' && !value) error = 'Participant name is required';
    if (field === 'age' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid age';
    setErrors((prev: any) => ({ ...prev, [field]: error }));
    return error === '';
  };
  return (
    <div>
      <h2>Balasabha Participation</h2>
      <label>Participant Name:
        <input type="text" value={householdData.participantName} onChange={e => { onChange('participantName', e.target.value); validate('participantName', e.target.value); }} onBlur={e => validate('participantName', e.target.value)} required />
        {errors.participantName && <span className="error">{errors.participantName}</span>}
      </label>
      <label>Age:
        <input type="number" min={0} value={householdData.age} onChange={e => { onChange('age', e.target.value === '' ? '' : parseInt(e.target.value)); validate('age', e.target.value); }} onBlur={e => validate('age', e.target.value)} required />
        {errors.age && <span className="error">{errors.age}</span>}
      </label>
      <label>Children Members Present:
        <input type="checkbox" checked={householdData.balasabhaParticipation.hasChildrenMembers} onChange={e => { onChange('balasabhaParticipation', 'hasChildrenMembers', e.target.checked); validate('hasChildrenMembers', e.target.checked); }} />
        {errors.hasChildrenMembers && <span className="error">{errors.hasChildrenMembers}</span>}
      </label>
      <label>Number of Children:
        <input type="number" min={0} value={householdData.balasabhaParticipation.childrenCount} onChange={e => { onChange('balasabhaParticipation', 'childrenCount', e.target.value === '' ? '' : parseInt(e.target.value)); validate('childrenCount', e.target.value); }} onBlur={e => validate('childrenCount', e.target.value)} required />
        {errors.childrenCount && <span className="error">{errors.childrenCount}</span>}
      </label>
    </div>
  );
};
export default BalasabhaParticipationForm; 