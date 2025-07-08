import React, { useState } from 'react';
import { FormValidator } from './validation';

type SocialIssue = {
  issueType: string;
  details: string;
};

type HouseholdData = {
  socialIssues?: SocialIssue[];
  // ...other fields
};

type Props = {
  householdData: HouseholdData;
  onChange: (section: string, value: any) => void;
};

type SocialIssueError = Partial<Record<keyof SocialIssue, string>>;

const defaultIssue: SocialIssue = {
  issueType: '',
  details: '',
};

const SocialIssuesForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [newIssue, setNewIssue] = useState<SocialIssue>(defaultIssue);
  const [errors, setErrors] = useState({
    issueType: '', details: ''
  });
  const safeData = householdData || {};
  const socialIssues: SocialIssue[] = safeData.socialIssues || [];

  const validate = (field: keyof SocialIssue, value: any) => {
    let error = '';
    if (field === 'issueType') error = FormValidator.validateText(FormValidator.sanitize(value), { minLength: 2, maxLength: 100 }) || '';
    if (field === 'details') error = FormValidator.validateTextarea(FormValidator.sanitize(value), { required: false, minLength: 0, maxLength: 200 }) || '';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };

  const validateAll = () => {
    let valid = true;
    (Object.keys(newIssue) as (keyof SocialIssue)[]).forEach((field) => {
      if (!validate(field, newIssue[field])) valid = false;
    });
    return valid;
  };

  const addIssue = () => {
    if (!validateAll()) return;
    onChange('socialIssues', [...socialIssues, newIssue]);
    setNewIssue(defaultIssue);
    setErrors({ issueType: '', details: '' });
  };

  return (
    <div className="form-section">
      <h2>⚠️ Social Issues</h2>
      <div className="add-issue-form">
        <h3>Add Social Issue</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Type of Social Issue *</label>
            <input
              type="text"
              value={newIssue.issueType}
              onChange={(e) => { setNewIssue(prev => ({ ...prev, issueType: e.target.value })); validate('issueType', e.target.value); }}
              placeholder="E.g., Alcoholism, Domestic Violence, etc."
            />
            {Boolean(errors.issueType) && <span className="error">{errors.issueType}</span>}
          </div>
          <div className="form-group full-width">
            <label>Additional Details</label>
            <textarea
              value={newIssue.details}
              onChange={(e) => { setNewIssue(prev => ({ ...prev, details: e.target.value })); validate('details', e.target.value); }}
              placeholder="Incident frequency, affected individuals, etc."
            />
            {Boolean(errors.details) && <span className="error">{errors.details}</span>}
          </div>
        </div>
        <button type="button" onClick={addIssue} className="add-btn">
          ➕ Add Social Issue
        </button>
      </div>
      {socialIssues.length > 0 && (
        <div className="issues-list">
          <h3>Added Social Issues ({socialIssues.length})</h3>
          <div className="issues-grid">
            {socialIssues.map((issue: SocialIssue, idx: number) => (
              <div key={idx} className="issue-card">
                <h4>{issue.issueType}</h4>
                <p><strong>Details:</strong> {issue.details}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialIssuesForm; 