import React, { useState } from 'react';
import { FormValidator } from './validation';

type EmploymentDetail = {
  memberName: string;
  age: number;
  employmentExchange: string;
  registeredPSC: boolean;
  dwms: string;
  additionalDetails: string;
};

type HouseholdData = {
  employmentDetails?: EmploymentDetail[];
};

type Props = {
  householdData: HouseholdData;
  onChange: (section: string, value: any) => void;
};

const defaultEmployment: EmploymentDetail = {
  memberName: '',
  age: 0,
  employmentExchange: '',
  registeredPSC: false,
  dwms: '',
  additionalDetails: '',
};

const EmploymentDetailsForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [newEmployment, setNewEmployment] = useState<EmploymentDetail>(defaultEmployment);
  const [errors, setErrors] = useState({
    memberName: '', age: '', employmentExchange: '', registeredPSC: '', dwms: '', additionalDetails: ''
  });

  const addEmployment = () => {
    if (!newEmployment.memberName) return;
    onChange('employmentDetails', [...(householdData.employmentDetails || []), newEmployment]);
    setNewEmployment(defaultEmployment);
  };

  const validate = (field: keyof EmploymentDetail, value: any) => {
    let error = '';
    if (field === 'memberName') error = FormValidator.validateName(FormValidator.sanitize(value)) || '';
    if (field === 'age') error = FormValidator.validateNumber(value, { min: 0, max: 120, integer: true }) || '';
    if (field === 'employmentExchange') error = FormValidator.validateText(FormValidator.sanitize(value), { minLength: 2, maxLength: 100 }) || '';
    if (field === 'registeredPSC') error = FormValidator.validateBoolean(value) || '';
    if (field === 'dwms') error = FormValidator.validateText(FormValidator.sanitize(value), { required: false, minLength: 0, maxLength: 100 }) || '';
    if (field === 'additionalDetails') error = FormValidator.validateTextarea(FormValidator.sanitize(value), { required: false, minLength: 0, maxLength: 200 }) || '';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };

  const resetErrors = { memberName: '', age: '', employmentExchange: '', registeredPSC: '', dwms: '', additionalDetails: '' };

  return (
    <div className="form-section">
      <h2>💼 Employment and Registration Details</h2>
      <div className="add-employment-form">
        <h3>Add Employment Detail</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Name of Family Member *</label>
            <input
              type="text"
              value={newEmployment.memberName}
              onChange={(e) => {
                const value = e.target.value;
                setNewEmployment(prev => ({ ...prev, memberName: value }));
                validate('memberName', value);
              }}
              placeholder="Enter member name"
            />
            {Boolean(errors.memberName) && <p className="error-text">{errors.memberName}</p>}
          </div>
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              value={newEmployment.age}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 0;
                setNewEmployment(prev => ({ ...prev, age: value }));
                validate('age', value);
              }}
              placeholder="Enter age"
              min="0"
            />
            {Boolean(errors.age) && <p className="error-text">{errors.age}</p>}
          </div>
          <div className="form-group">
            <label>Employment Exchange</label>
            <input
              type="text"
              value={newEmployment.employmentExchange}
              onChange={(e) => {
                const value = e.target.value;
                setNewEmployment(prev => ({ ...prev, employmentExchange: value }));
                validate('employmentExchange', value);
              }}
              placeholder="Enter employment exchange"
            />
            {Boolean(errors.employmentExchange) && <p className="error-text">{errors.employmentExchange}</p>}
          </div>
          <div className="form-group">
            <label>Registered with PSC?</label>
            <input
              type="checkbox"
              checked={newEmployment.registeredPSC}
              onChange={(e) => {
                const value = e.target.checked;
                setNewEmployment(prev => ({ ...prev, registeredPSC: value }));
                validate('registeredPSC', value);
              }}
            />
            {Boolean(errors.registeredPSC) && <p className="error-text">{errors.registeredPSC}</p>}
          </div>
          <div className="form-group">
            <label>DWMS</label>
            <input
              type="text"
              value={newEmployment.dwms}
              onChange={(e) => {
                const value = e.target.value;
                setNewEmployment(prev => ({ ...prev, dwms: value }));
                validate('dwms', value);
              }}
              placeholder="Enter DWMS details"
            />
            {Boolean(errors.dwms) && <p className="error-text">{errors.dwms}</p>}
          </div>
          <div className="form-group full-width">
            <label>Additional Details</label>
            <textarea
              value={newEmployment.additionalDetails}
              onChange={(e) => {
                const value = e.target.value;
                setNewEmployment(prev => ({ ...prev, additionalDetails: value }));
                validate('additionalDetails', value);
              }}
              placeholder="Any additional details (course, sector, etc.)"
            />
            {Boolean(errors.additionalDetails) && <p className="error-text">{errors.additionalDetails}</p>}
          </div>
        </div>
        <button type="button" onClick={addEmployment} className="add-btn">
          ➕ Add Employment Detail
        </button>
      </div>
      {householdData.employmentDetails && householdData.employmentDetails.length > 0 && (
        <div className="employment-list">
          <h3>Added Employment Details ({householdData.employmentDetails.length})</h3>
          <div className="employment-grid">
            {householdData.employmentDetails.map((emp: EmploymentDetail, idx: number) => (
              <div key={idx} className="employment-card">
                <h4>{emp.memberName}</h4>
                <p><strong>Age:</strong> {emp.age}</p>
                <p><strong>Exchange:</strong> {emp.employmentExchange}</p>
                <p><strong>PSC:</strong> {emp.registeredPSC ? 'Yes' : 'No'}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmploymentDetailsForm; 