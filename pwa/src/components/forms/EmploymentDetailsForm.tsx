import React, { useState } from 'react';

type EmploymentDetail = {
  memberName: string;
  age: number;
  employmentExchange: string;
  registeredPSC: boolean;
  dwms: string;
  additionalDetails: string;
};

type Props = {
  householdData: any;
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

  const addEmployment = () => {
    if (!newEmployment.memberName) return;
    onChange('employmentDetails', [...(householdData.employmentDetails || []), newEmployment]);
    setNewEmployment(defaultEmployment);
  };

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
              onChange={(e) => setNewEmployment(prev => ({ ...prev, memberName: e.target.value }))}
              placeholder="Enter member name"
            />
          </div>
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              value={newEmployment.age}
              onChange={(e) => setNewEmployment(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
              placeholder="Enter age"
              min="0"
            />
          </div>
          <div className="form-group">
            <label>Employment Exchange</label>
            <input
              type="text"
              value={newEmployment.employmentExchange}
              onChange={(e) => setNewEmployment(prev => ({ ...prev, employmentExchange: e.target.value }))}
              placeholder="Enter employment exchange"
            />
          </div>
          <div className="form-group">
            <label>Registered with PSC?</label>
            <input
              type="checkbox"
              checked={newEmployment.registeredPSC}
              onChange={(e) => setNewEmployment(prev => ({ ...prev, registeredPSC: e.target.checked }))}
            />
          </div>
          <div className="form-group">
            <label>DWMS</label>
            <input
              type="text"
              value={newEmployment.dwms}
              onChange={(e) => setNewEmployment(prev => ({ ...prev, dwms: e.target.value }))}
              placeholder="Enter DWMS details"
            />
          </div>
          <div className="form-group full-width">
            <label>Additional Details</label>
            <textarea
              value={newEmployment.additionalDetails}
              onChange={(e) => setNewEmployment(prev => ({ ...prev, additionalDetails: e.target.value }))}
              placeholder="Any additional details (course, sector, etc.)"
            />
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