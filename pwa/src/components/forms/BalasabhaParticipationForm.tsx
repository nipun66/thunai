import React, { useState } from 'react';
import { FormValidator } from './validation';

type BalasabhaParticipation = {
  hasChildrenMembers: boolean;
  childrenCount: number;
};

type HouseholdData = {
  balasabhaParticipation: BalasabhaParticipation;
  participantName: string;
  age: number;
};

type Props = {
  householdData: HouseholdData;
  onChange: (section: string, field: string, value: any) => void;
};

type BalasabhaError = {
  hasChildrenMembers?: string;
  childrenCount?: string;
};

const BalasabhaParticipationForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState({
    hasChildrenMembers: '', childrenCount: ''
  });
  const validate = (field: keyof BalasabhaParticipation, value: any) => {
    let error = '';
    if (field === 'hasChildrenMembers') error = FormValidator.validateBoolean(value) || '';
    if (field === 'childrenCount') error = FormValidator.validateNumber(value, { min: 0, max: 100, integer: true }) || '';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };

  const validateAll = () => {
    let valid = true;
    if (!validate('hasChildrenMembers', householdData.balasabhaParticipation.hasChildrenMembers)) valid = false;
    if (!validate('childrenCount', householdData.balasabhaParticipation.childrenCount)) valid = false;
    return valid;
  };
  return (
    <div>
      <h2>Balasabha Participation</h2>
      <label>Children Members Present:
        <input type="checkbox" checked={householdData.balasabhaParticipation.hasChildrenMembers} onChange={e => { onChange('balasabhaParticipation', 'hasChildrenMembers', e.target.checked); validate('hasChildrenMembers', e.target.checked); }} />
        {Boolean(errors.hasChildrenMembers) && <span className="error">{errors.hasChildrenMembers}</span>}
      </label>
      <label>Number of Children:
        <input type="number" min={0} value={householdData.balasabhaParticipation.childrenCount} onChange={e => { onChange('balasabhaParticipation', 'childrenCount', e.target.value === '' ? '' : parseInt(e.target.value)); validate('childrenCount', e.target.value); }} onBlur={e => validate('childrenCount', e.target.value)} required />
        {Boolean(errors.childrenCount) && <span className="error">{errors.childrenCount}</span>}
      </label>
    </div>
  );
};
export default BalasabhaParticipationForm; 