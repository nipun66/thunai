import React, { useState } from 'react';

type PublicInstitution = {
  institutionName: string;
  distanceFromHome: number;
  servicesAvailed: string[];
  supportReceived: string;
  satisfactionLevel: number;
};

type Props = {
  householdData: any;
  onChange: (section: string, value: any) => void;
};

const defaultInstitution: PublicInstitution = {
  institutionName: '',
  distanceFromHome: 0,
  servicesAvailed: [],
  supportReceived: '',
  satisfactionLevel: 0,
};

const PublicInstitutionsForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [newInstitution, setNewInstitution] = useState<PublicInstitution>(defaultInstitution);
  const [errors, setErrors] = useState<any>({});

  const validate = (field: string, value: any) => {
    let error = '';
    if (field === 'institutionName' && !value) error = 'Institution name is required';
    if (field === 'distanceFromHome' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid distance';
    if (field === 'servicesAvailed' && value.length === 0) error = 'At least one service must be selected';
    if (field === 'supportReceived' && !value) error = 'Support received is required';
    if (field === 'satisfactionLevel' && (value === '' || isNaN(value) || value < 0 || value > 4)) error = 'Enter a valid satisfaction level (0-4)';
    setErrors((prev: any) => ({ ...prev, [field]: error }));
    return error === '';
  };

  const addInstitution = () => {
    if (!newInstitution.institutionName) {
      setErrors(prev => ({ ...prev, institutionName: 'Institution name is required' }));
      return;
    }
    if (isNaN(newInstitution.distanceFromHome) || newInstitution.distanceFromHome < 0) {
      setErrors(prev => ({ ...prev, distanceFromHome: 'Enter a valid distance' }));
      return;
    }
    if (newInstitution.servicesAvailed.length === 0) {
      setErrors(prev => ({ ...prev, servicesAvailed: 'At least one service must be selected' }));
      return;
    }
    if (!newInstitution.supportReceived) {
      setErrors(prev => ({ ...prev, supportReceived: 'Support received is required' }));
      return;
    }
    if (isNaN(newInstitution.satisfactionLevel) || newInstitution.satisfactionLevel < 0 || newInstitution.satisfactionLevel > 4) {
      setErrors(prev => ({ ...prev, satisfactionLevel: 'Enter a valid satisfaction level (0-4)' }));
      return;
    }

    onChange('publicInstitutions', [...(householdData.publicInstitutions || []), newInstitution]);
    setNewInstitution(defaultInstitution);
    setErrors({}); // Clear errors on successful addition
  };

  return (
    <div className="form-section">
      <h2>🏢 Access to Public Institutions and Services</h2>
      <div className="add-institution-form">
        <h3>Add Public Institution</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Name of Institution *</label>
            <input
              type="text"
              value={newInstitution.institutionName}
              onChange={(e) => {
                setNewInstitution(prev => ({ ...prev, institutionName: e.target.value }));
                validate('institutionName', e.target.value);
              }}
              onBlur={e => validate('institutionName', e.target.value)}
              placeholder="E.g., Gram Panchayat, PHC, etc."
            />
            {errors.institutionName && <span className="error">{errors.institutionName}</span>}
          </div>
          <div className="form-group">
            <label>Distance from Home</label>
            <input
              type="number"
              value={newInstitution.distanceFromHome}
              onChange={(e) => {
                setNewInstitution(prev => ({ ...prev, distanceFromHome: parseFloat(e.target.value) || 0 }));
                validate('distanceFromHome', e.target.value);
              }}
              onBlur={e => validate('distanceFromHome', e.target.value)}
              placeholder="Enter distance (km or meters)"
              min="0"
            />
            {errors.distanceFromHome && <span className="error">{errors.distanceFromHome}</span>}
          </div>
          <div className="form-group">
            <label>Services Availed</label>
            <select
              multiple
              value={newInstitution.servicesAvailed}
              onChange={(e) => {
                const options = Array.from(e.target.selectedOptions, option => option.value);
                setNewInstitution(prev => ({ ...prev, servicesAvailed: options }));
                validate('servicesAvailed', options);
              }}
            >
              <option value="Health check-up">Health check-up</option>
              <option value="MGNREGS assistance">MGNREGS assistance</option>
              <option value="Ration">Ration</option>
              <option value="Animal Health">Animal Health</option>
              <option value="Banking">Banking</option>
              <option value="Loans">Loans</option>
              <option value="Others">Others</option>
            </select>
            {errors.servicesAvailed && <span className="error">{errors.servicesAvailed}</span>}
          </div>
          <div className="form-group full-width">
            <label>Support Received</label>
            <input
              type="text"
              value={newInstitution.supportReceived}
              onChange={(e) => {
                setNewInstitution(prev => ({ ...prev, supportReceived: e.target.value }));
                validate('supportReceived', e.target.value);
              }}
              onBlur={e => validate('supportReceived', e.target.value)}
              placeholder="E.g., free medicines, seedlings, etc."
            />
            {errors.supportReceived && <span className="error">{errors.supportReceived}</span>}
          </div>
          <div className="form-group">
            <label>Satisfaction Level (0-4)</label>
            <select
              value={newInstitution.satisfactionLevel}
              onChange={(e) => {
                setNewInstitution(prev => ({ ...prev, satisfactionLevel: parseInt(e.target.value) || 0 }));
                validate('satisfactionLevel', e.target.value);
              }}
              onBlur={e => validate('satisfactionLevel', e.target.value)}
            >
              <option value={0}>0 – Not Aware / Never Used</option>
              <option value={1}>1 – Not Available</option>
              <option value={2}>2 – Limited Access</option>
              <option value={3}>3 – Satisfied</option>
              <option value={4}>4 – Very Satisfied</option>
            </select>
            {errors.satisfactionLevel && <span className="error">{errors.satisfactionLevel}</span>}
          </div>
        </div>
        <button type="button" onClick={addInstitution} className="add-btn">
          ➕ Add Public Institution
        </button>
      </div>
      {householdData.publicInstitutions && householdData.publicInstitutions.length > 0 && (
        <div className="institutions-list">
          <h3>Added Public Institutions ({householdData.publicInstitutions.length})</h3>
          <div className="institutions-grid">
            {householdData.publicInstitutions.map((inst: PublicInstitution, idx: number) => (
              <div key={idx} className="institution-card">
                <h4>{inst.institutionName}</h4>
                <p><strong>Distance:</strong> {inst.distanceFromHome}</p>
                <p><strong>Services:</strong> {inst.servicesAvailed.join(', ')}</p>
                <p><strong>Support:</strong> {inst.supportReceived}</p>
                <p><strong>Satisfaction:</strong> {inst.satisfactionLevel}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicInstitutionsForm; 