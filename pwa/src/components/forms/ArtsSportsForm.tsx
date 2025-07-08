import React, { useState } from 'react';

type ArtsSport = {
  memberName: string;
  age: number;
  areaOfInterest: string;
  additionalDetails: string;
};

type Props = {
  householdData: any;
  onChange: (section: string, value: any) => void;
};

const defaultArtsSport: ArtsSport = {
  memberName: '',
  age: 0,
  areaOfInterest: '',
  additionalDetails: '',
};

const ArtsSportsForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<any>({});
  const validate = (field: string, value: any) => {
    let error = '';
    if (field === 'activityType' && !value) error = 'Activity type is required';
    if (field === 'participantsCount' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid number of participants';
    setErrors((prev: any) => ({ ...prev, [field]: error }));
    return error === '';
  };
  const [newArtsSport, setNewArtsSport] = useState<ArtsSport>(defaultArtsSport);
  const safeData = householdData || {};
  const artsSports: ArtsSport[] = safeData.artsSports || [];

  const addArtsSport = () => {
    if (!newArtsSport.memberName || !newArtsSport.areaOfInterest) return;
    onChange('artsSports', [...artsSports, newArtsSport]);
    setNewArtsSport(defaultArtsSport);
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
              onChange={(e) => setNewArtsSport(prev => ({ ...prev, memberName: e.target.value }))}
              placeholder="Enter member name"
            />
          </div>
          <div className="form-group">
            <label>Age</label>
            <input
              type="number"
              value={newArtsSport.age}
              onChange={(e) => setNewArtsSport(prev => ({ ...prev, age: parseInt(e.target.value) || 0 }))}
              placeholder="Enter age"
              min="0"
            />
          </div>
          <div className="form-group">
            <label>Area of Interest (Art/Sport) *</label>
            <input
              type="text"
              value={newArtsSport.areaOfInterest}
              onChange={(e) => setNewArtsSport(prev => ({ ...prev, areaOfInterest: e.target.value }))}
              placeholder="E.g., Dance, Football, Drawing, etc."
            />
          </div>
          <div className="form-group full-width">
            <label>Additional Details</label>
            <textarea
              value={newArtsSport.additionalDetails}
              onChange={(e) => setNewArtsSport(prev => ({ ...prev, additionalDetails: e.target.value }))}
              placeholder="Participation in events, awards, etc."
            />
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