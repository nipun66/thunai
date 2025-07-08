import React, { useState } from 'react';

type Entitlement = {
  landOwnershipDocument: boolean;
  rationCardAvailable: boolean;
  rationCardType: string;
  healthInsurance: boolean;
  employeeCard: boolean;
  homelessSupportScheme: boolean;
  remarks: string;
};

type Props = {
  householdData: any;
  onChange: (section: string, field: string, value: any) => void;
};

const EntitlementsForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<any>({});
  const validate = (field: string, value: any) => {
    let error = '';
    if (field === 'entitlementType' && !value) error = 'Entitlement type is required';
    if (field === 'entitlementId' && !value) error = 'Entitlement ID is required';
    if (field === 'yearReceived' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid year';
    setErrors((prev: any) => ({ ...prev, [field]: error }));
    return error === '';
  };
  return (
    <div>
      <h2>Entitlements</h2>
      <label>Entitlement Type:
        <input type="text" value={householdData.entitlements.entitlementType} onChange={e => { onChange('entitlements', 'entitlementType', e.target.value); validate('entitlementType', e.target.value); }} onBlur={e => validate('entitlementType', e.target.value)} required />
        {errors.entitlementType && <span className="error">{errors.entitlementType}</span>}
      </label>
      <label>Entitlement ID:
        <input type="text" value={householdData.entitlements.entitlementId} onChange={e => { onChange('entitlements', 'entitlementId', e.target.value); validate('entitlementId', e.target.value); }} onBlur={e => validate('entitlementId', e.target.value)} required />
        {errors.entitlementId && <span className="error">{errors.entitlementId}</span>}
      </label>
      <label>Year Received:
        <input type="number" min={0} value={householdData.entitlements.yearReceived} onChange={e => { onChange('entitlements', 'yearReceived', e.target.value === '' ? '' : parseInt(e.target.value)); validate('yearReceived', e.target.value); }} onBlur={e => validate('yearReceived', e.target.value)} required />
        {errors.yearReceived && <span className="error">{errors.yearReceived}</span>}
      </label>
    </div>
  );
};
export default EntitlementsForm; 