import React, { useState } from 'react';
import { FormValidator } from './validation';

type ArtsSport = {
  memberName: string;
  age: number;
  areaOfInterest: string;
  additionalDetails: string;
};

type HouseholdData = {
  artsSports?: ArtsSport[];
  // ...other fields
};

type Props = {
  householdData: HouseholdData;
  onChange: (section: string, value: any) => void;
};

type ArtsSportError = Partial<Record<keyof ArtsSport, string>>;

const defaultArtsSport: ArtsSport = {
  memberName: '',
  age: 0,
  areaOfInterest: '',
  additionalDetails: '',
};

const ArtsSportsForm: React.FC<Props> = ({ householdData, onChange }) => {
  // Set up error state for all fields in the form, matching the data model
  // Use FormValidator for all validation in the validate function
  // For each field, use Boolean(errors.FIELD) for error and errors.FIELD || '...' for helperText
  // Sanitize all text inputs and enforce SRS requirements
  const [errors, setErrors] = useState({
    memberName: '', age: '', areaOfInterest: '', additionalDetails: ''
  });
  const validate = (field: keyof ArtsSport, value: any) => {
    let error = '';
    if (field === 'memberName') error = FormValidator.validateName(FormValidator.sanitize(value)) || '';
    if (field === 'age') error = FormValidator.validateNumber(value, { min: 0, max: 120, integer: true }) || '';
    if (field === 'areaOfInterest') error = FormValidator.validateText(FormValidator.sanitize(value), { minLength: 2, maxLength: 100 }) || '';
    if (field === 'additionalDetails') error = FormValidator.validateTextarea(FormValidator.sanitize(value), { required: false, minLength: 0, maxLength: 200 }) || '';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };

  const validateAll = () => {
    let valid = true;
    (Object.keys(newArtsSport) as (keyof ArtsSport)[]).forEach((field) => {
      if (!validate(field, newArtsSport[field])) valid = false;
    });
    return valid;
  };

  const [newArtsSport, setNewArtsSport] = useState<ArtsSport>(defaultArtsSport);
  const safeData = householdData || {};
  const artsSports: ArtsSport[] = safeData.artsSports || [];

  const addArtsSport = () => {
    if (!validateAll()) return;
    onChange('artsSports', [...artsSports, newArtsSport]);
    setNewArtsSport(defaultArtsSport);
    setErrors({ memberName: '', age: '', areaOfInterest: '', additionalDetails: '' });
  };

  return (
    <div className="form-section">
      <h2>🎨 Interest in Arts and Sports</h2>
      <div className="add-arts-sport-form">
        <h3>Add Arts/Sports Interest</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Name of Member *</label>
            <input
              type="text"
              value={newArtsSport.memberName}
              onChange={(e) => {
                const value = e.target.value;
                setNewArtsSport(prev => ({ ...prev, memberName: value }));
                validate('memberName', value);
              }}
              placeholder="Enter member name"
            />
            {Boolean(errors.memberName) && <p className="error-message">{errors.memberName}</p>}
            {errors.memberName || 'Enter member name (letters only)'}
          </div>
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              value={newArtsSport.age}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 0;
                setNewArtsSport(prev => ({ ...prev, age: value }));
                validate('age', value);
              }}
              placeholder="Enter age"
              min="0"
            />
            {Boolean(errors.age) && <p className="error-message">{errors.age}</p>}
            {errors.age || 'Enter a valid age (0-120)'}
          </div>
          <div className="form-group">
            <label>Area of Interest (Art/Sport) *</label>
            <input
              type="text"
              value={newArtsSport.areaOfInterest}
              onChange={(e) => {
                const value = e.target.value;
                setNewArtsSport(prev => ({ ...prev, areaOfInterest: value }));
                validate('areaOfInterest', value);
              }}
              placeholder="E.g., Dance, Football, Drawing, etc."
            />
            {Boolean(errors.areaOfInterest) && <p className="error-message">{errors.areaOfInterest}</p>}
            {errors.areaOfInterest || 'Enter area of interest (2-100 letters)'}
          </div>
          <div className="form-group full-width">
            <label>Additional Details</label>
            <textarea
              value={newArtsSport.additionalDetails}
              onChange={(e) => {
                const value = e.target.value;
                setNewArtsSport(prev => ({ ...prev, additionalDetails: value }));
                validate('additionalDetails', value);
              }}
              placeholder="Participation in events, awards, etc."
            />
            {Boolean(errors.additionalDetails) && <p className="error-message">{errors.additionalDetails}</p>}
            {errors.additionalDetails || 'Enter additional details (max 200 characters)'}
          </div>
        </div>
        <button type="button" onClick={addArtsSport} className="add-btn">
          ➕ Add Arts/Sports Interest
        </button>
      </div>
      {artsSports.length > 0 && (
        <div className="arts-sports-list">
          <h3>Added Arts/Sports Interests ({artsSports.length})</h3>
          <div className="arts-sports-grid">
            {artsSports.map((as: ArtsSport, idx: number) => (
              <div key={idx} className="arts-sports-card">
                <h4>{as.memberName}</h4>
                <p><strong>Age:</strong> {as.age}</p>
                <p><strong>Interest:</strong> {as.areaOfInterest}</p>
                <p><strong>Details:</strong> {as.additionalDetails}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtsSportsForm; 