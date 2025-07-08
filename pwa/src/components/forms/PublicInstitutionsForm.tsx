import React, { useState } from 'react';
import { FormValidator } from './validation';

type PublicInstitution = {
  institutionName: string;
  distanceFromHome: number;
  servicesAvailed: string[];
  supportReceived: string;
  satisfactionLevel: number;
};

type PublicInstitutionError = Partial<Record<keyof PublicInstitution, string>>;

type HouseholdData = {
  publicInstitutions?: PublicInstitution[];
};

type Props = {
  householdData: HouseholdData;
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
  const [errors, setErrors] = useState({
    institutionName: '', distanceFromHome: '', servicesAvailed: '', supportReceived: '', satisfactionLevel: ''
  });

  const safeData = householdData || {};
  const publicInstitutions: PublicInstitution[] = safeData.publicInstitutions || [];

  const validate = (field: keyof PublicInstitution, value: any) => {
    let error = '';
    if (field === 'institutionName') error = FormValidator.validateName(FormValidator.sanitize(value)) || '';
    if (field === 'distanceFromHome') error = FormValidator.validateNumber(value, { min: 0, max: 100000, integer: false }) || '';
    if (field === 'servicesAvailed') error = FormValidator.validateMultiSelect(value) || '';
    if (field === 'supportReceived') error = FormValidator.validateText(FormValidator.sanitize(value), { required: false, minLength: 0, maxLength: 200 }) || '';
    if (field === 'satisfactionLevel') error = FormValidator.validateDropdown(value) || '';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };

  const validateAll = () => {
    let valid = true;
    (Object.keys(newInstitution) as (keyof PublicInstitution)[]).forEach((field) => {
      if (!validate(field, newInstitution[field])) valid = false;
    });
    return valid;
  };

  const addInstitution = () => {
    if (!validateAll()) return;
    onChange('publicInstitutions', [...publicInstitutions, newInstitution]);
    setNewInstitution(defaultInstitution);
    setErrors(resetErrors);
  };

  const resetErrors = { institutionName: '', distanceFromHome: '', servicesAvailed: '', supportReceived: '', satisfactionLevel: '' };

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
            {Boolean(errors.institutionName) && <span className="error">{errors.institutionName}</span>}
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
            {Boolean(errors.distanceFromHome) && <span className="error">{errors.distanceFromHome}</span>}
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
            {Boolean(errors.servicesAvailed) && <span className="error">{errors.servicesAvailed}</span>}
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
            {Boolean(errors.supportReceived) && <span className="error">{errors.supportReceived}</span>}
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
            {Boolean(errors.satisfactionLevel) && <span className="error">{errors.satisfactionLevel}</span>}
          </div>
        </div>
        <button type="button" onClick={addInstitution} className="add-btn">
          ➕ Add Public Institution
        </button>
      </div>
      {publicInstitutions.length > 0 && (
        <div className="institutions-list">
          <h3>Added Public Institutions ({publicInstitutions.length})</h3>
          <div className="institutions-grid">
            {publicInstitutions.map((inst: PublicInstitution, idx: number) => (
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