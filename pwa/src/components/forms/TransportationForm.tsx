import React, { useState } from 'react';

type TransportationFacility = {
  accessPathType: string;
  distanceToMainRoad: number;
  pathCondition: string;
  vehicleOwned: string;
  additionalNotes: string;
};

type Props = {
  householdData: any;
  onChange: (section: string, field: string, value: any) => void;
};

const TransportationForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<any>({});
  const validate = (field: string, value: any) => {
    let error = '';
    if (field === 'vehicleType' && !value) error = 'Vehicle type is required';
    if (field === 'vehicleCount' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid number of vehicles';
    setErrors((prev: any) => ({ ...prev, [field]: error }));
    return error === '';
  };
  const safeData = householdData || {};
  const vehicleType = safeData.vehicleType || '';
  const vehicleCount = safeData.vehicleCount ?? '';
  return (
    <div>
      <h2>Transportation</h2>
      <label>Vehicle Type:
        <input type="text" value={vehicleType} onChange={e => { onChange('transportation', 'vehicleType', e.target.value); validate('vehicleType', e.target.value); }} onBlur={e => validate('vehicleType', e.target.value)} required />
        {errors.vehicleType && <span className="error">{errors.vehicleType}</span>}
      </label>
      <label>Number of Vehicles:
        <input type="number" min={0} value={vehicleCount} onChange={e => { onChange('transportation', 'vehicleCount', e.target.value === '' ? '' : parseInt(e.target.value)); validate('vehicleCount', e.target.value); }} onBlur={e => validate('vehicleCount', e.target.value)} required />
        {errors.vehicleCount && <span className="error">{errors.vehicleCount}</span>}
      </label>
    </div>
  );
};
export default TransportationForm; 