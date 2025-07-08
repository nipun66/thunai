import React, { useState } from 'react';

type FamilyMember = {
  name: string;
  relationship: string;
  gender: string;
  age: number;
  educationLevel: string;
  vocationalKnowledge: string;
  occupationSector: string;
  maritalStatus: string;
  hasBankAccount: boolean;
  hasAadhaar: boolean;
  pension: string;
  additionalDetails: string;
};

type Props = {
  householdData: any;
  setHouseholdData: (data: any) => void;
};

const defaultMember: FamilyMember = {
  name: '',
  relationship: '',
  gender: '',
  age: 0,
  educationLevel: '',
  vocationalKnowledge: '',
  occupationSector: '',
  maritalStatus: '',
  hasBankAccount: false,
  hasAadhaar: false,
  pension: '',
  additionalDetails: '',
};

const FamilyMembersForm: React.FC<Props> = ({ householdData, setHouseholdData }) => {
  const [newMember, setNewMember] = useState<FamilyMember>(defaultMember);
  const [errors, setErrors] = useState<any>({});

  const validate = (field: string, value: any) => {
    let error = '';
    if (field === 'name' && !value) error = 'Name is required';
    if (field === 'age' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid age';
    if (field === 'gender' && !value) error = 'Gender is required';
    if (field === 'relationship' && !value) error = 'Relationship is required';
    setErrors((prev: any) => ({ ...prev, [field]: error }));
    return error === '';
  };

  const addFamilyMember = () => {
    if (!newMember.name || !newMember.relationship) return;
    setHouseholdData({
      ...householdData,
      members: [...(householdData.members || []), newMember],
    });
    setNewMember(defaultMember);
  };

  return (
    <div className="form-section">
      <h2>👥 Family Member Details</h2>
      <div className="add-member-form">
        <h3>Add New Family Member</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Name *</label>
            <input
              type="text"
              value={newMember.name}
              onChange={(e) => {
                setNewMember(prev => ({ ...prev, name: e.target.value }));
                validate('name', e.target.value);
              }}
              onBlur={e => validate('name', e.target.value)}
              placeholder="Enter member name"
            />
            {errors.name && <span className="error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label>Relationship with Head *</label>
            <select
              value={newMember.relationship}
              onChange={(e) => {
                setNewMember(prev => ({ ...prev, relationship: e.target.value }));
                validate('relationship', e.target.value);
              }}
              onBlur={e => validate('relationship', e.target.value)}
            >
              <option value="">Select Relationship</option>
              <option value="Self">Self (Head)</option>
              <option value="Spouse">Spouse</option>
              <option value="Son">Son</option>
              <option value="Daughter">Daughter</option>
              <option value="Parent">Parent</option>
              <option value="Sibling">Sibling</option>
              <option value="Grandchild">Grandchild</option>
              <option value="Other">Other</option>
            </select>
            {errors.relationship && <span className="error">{errors.relationship}</span>}
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select
              value={newMember.gender}
              onChange={(e) => {
                setNewMember(prev => ({ ...prev, gender: e.target.value }));
                validate('gender', e.target.value);
              }}
              onBlur={e => validate('gender', e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Transgender">Transgender</option>
            </select>
            {errors.gender && <span className="error">{errors.gender}</span>}
          </div>
          <div className="form-group">
            <label>Age (as of Jan 1, 2025)</label>
            <input
              type="number"
              value={newMember.age}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) {
                  setNewMember(prev => ({ ...prev, age: val === '' ? 0 : parseInt(val) }));
                  validate('age', val === '' ? '' : parseInt(val));
                }
              }}
              onBlur={e => validate('age', e.target.value)}
              placeholder="Enter age"
              min="0"
            />
            {errors.age && <span className="error">{errors.age}</span>}
          </div>
          <div className="form-group">
            <label>General Education Level</label>
            <select
              value={newMember.educationLevel}
              onChange={(e) => {
                setNewMember(prev => ({ ...prev, educationLevel: e.target.value }));
                validate('educationLevel', e.target.value);
              }}
              onBlur={e => validate('educationLevel', e.target.value)}
            >
              <option value="">Select Education Level</option>
              <option value="Illiterate">Illiterate</option>
              <option value="Anganwadi/Preschool">Anganwadi/Preschool</option>
              <option value="Informal LP">Informal LP</option>
              <option value="Informal UP">Informal UP</option>
              <option value="Secondary">Secondary</option>
              <option value="Higher Secondary">Higher Secondary</option>
              <option value="Degree">Degree</option>
              <option value="Postgraduate">Postgraduate</option>
              <option value="Vocational">Vocational</option>
              <option value="Others">Others</option>
            </select>
            {errors.educationLevel && <span className="error">{errors.educationLevel}</span>}
          </div>
          <div className="form-group">
            <label>Vocational/Practical Knowledge</label>
            <input
              type="text"
              value={newMember.vocationalKnowledge}
              onChange={(e) => {
                setNewMember(prev => ({ ...prev, vocationalKnowledge: e.target.value }));
                validate('vocationalKnowledge', e.target.value);
              }}
              onBlur={e => validate('vocationalKnowledge', e.target.value)}
              placeholder="Enter vocational knowledge"
            />
            {errors.vocationalKnowledge && <span className="error">{errors.vocationalKnowledge}</span>}
          </div>
          <div className="form-group">
            <label>Occupation Sector</label>
            <select
              value={newMember.occupationSector}
              onChange={(e) => {
                setNewMember(prev => ({ ...prev, occupationSector: e.target.value }));
                validate('occupationSector', e.target.value);
              }}
              onBlur={e => validate('occupationSector', e.target.value)}
            >
              <option value="">Select Occupation</option>
              <option value="Agriculture">Agriculture</option>
              <option value="Construction">Construction</option>
              <option value="Business">Business</option>
              <option value="Service">Service</option>
              <option value="Wage Labour">Wage Labour</option>
              <option value="Student">Student</option>
              <option value="Unemployed">Unemployed</option>
              <option value="Other">Other</option>
            </select>
            {errors.occupationSector && <span className="error">{errors.occupationSector}</span>}
          </div>
          <div className="form-group">
            <label>Marital Status</label>
            <select
              value={newMember.maritalStatus}
              onChange={(e) => {
                setNewMember(prev => ({ ...prev, maritalStatus: e.target.value }));
                validate('maritalStatus', e.target.value);
              }}
              onBlur={e => validate('maritalStatus', e.target.value)}
            >
              <option value="">Select Marital Status</option>
              <option value="Married">Married</option>
              <option value="Separated">Separated</option>
              <option value="Widowed">Widowed</option>
              <option value="Unmarried Mother">Unmarried Mother</option>
              <option value="Unmarried">Unmarried</option>
            </select>
            {errors.maritalStatus && <span className="error">{errors.maritalStatus}</span>}
          </div>
          <div className="form-group">
            <label>Bank Account</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="bankAccount"
                  checked={newMember.hasBankAccount}
                  onChange={() => setNewMember(prev => ({ ...prev, hasBankAccount: true }))}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="bankAccount"
                  checked={!newMember.hasBankAccount}
                  onChange={() => setNewMember(prev => ({ ...prev, hasBankAccount: false }))}
                />
                No
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>Aadhaar Number</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="aadhaar"
                  checked={newMember.hasAadhaar}
                  onChange={() => setNewMember(prev => ({ ...prev, hasAadhaar: true }))}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="aadhaar"
                  checked={!newMember.hasAadhaar}
                  onChange={() => setNewMember(prev => ({ ...prev, hasAadhaar: false }))}
                />
                No
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>Pension</label>
            <select
              value={newMember.pension}
              onChange={(e) => {
                setNewMember(prev => ({ ...prev, pension: e.target.value }));
                validate('pension', e.target.value);
              }}
              onBlur={e => validate('pension', e.target.value)}
            >
              <option value="">Select Pension Type</option>
              <option value="Widow">Widow</option>
              <option value="Old Age">Old Age</option>
              <option value="Disability">Disability</option>
              <option value="PWD Pension">PWD Pension</option>
              <option value="Service Pension">Service Pension</option>
              <option value="Others">Others</option>
            </select>
            {errors.pension && <span className="error">{errors.pension}</span>}
          </div>
          <div className="form-group full-width">
            <label>Additional Details</label>
            <textarea
              value={newMember.additionalDetails}
              onChange={(e) => {
                setNewMember(prev => ({ ...prev, additionalDetails: e.target.value }));
                validate('additionalDetails', e.target.value);
              }}
              onBlur={e => validate('additionalDetails', e.target.value)}
              placeholder="Enter any additional details"
            />
            {errors.additionalDetails && <span className="error">{errors.additionalDetails}</span>}
          </div>
        </div>
        <button type="button" onClick={addFamilyMember} className="add-btn">
          ➕ Add Family Member
        </button>
      </div>
      {householdData.members && householdData.members.length > 0 && (
        <div className="members-list">
          <h3>Added Family Members ({householdData.members.length})</h3>
          <div className="members-grid">
            {householdData.members.map((member: FamilyMember, index: number) => (
              <div key={index} className="member-card">
                <h4>{member.name}</h4>
                <p><strong>Relationship:</strong> {member.relationship}</p>
                <p><strong>Age:</strong> {member.age}</p>
                <p><strong>Gender:</strong> {member.gender}</p>
                <p><strong>Education:</strong> {member.educationLevel}</p>
                <p><strong>Occupation:</strong> {member.occupationSector}</p>
                <p><strong>Bank Account:</strong> {member.hasBankAccount ? 'Yes' : 'No'}</p>
                <p><strong>Aadhaar:</strong> {member.hasAadhaar ? 'Yes' : 'No'}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyMembersForm; 