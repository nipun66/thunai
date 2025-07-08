import React, { useState } from 'react';

type SocialIssue = {
  issueType: string;
  details: string;
};

type Props = {
  householdData: any;
  onChange: (section: string, value: any) => void;
};

const defaultIssue: SocialIssue = {
  issueType: '',
  details: '',
};

const SocialIssuesForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [newIssue, setNewIssue] = useState<SocialIssue>(defaultIssue);
  const [errors, setErrors] = useState<any>({});
  const safeData = householdData || {};
  const socialIssues: SocialIssue[] = safeData.socialIssues || [];

  const addIssue = () => {
    if (!newIssue.issueType) return;
    onChange('socialIssues', [...socialIssues, newIssue]);
    setNewIssue(defaultIssue);
  };

  const validate = (field: string, value: any) => {
    let error = '';
    if (field === 'issueType' && !value) error = 'Issue type is required';
    if (field === 'affectedCount' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid number of affected';
    setErrors((prev: any) => ({ ...prev, [field]: error }));
    return error === '';
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
              onChange={(e) => setNewIssue(prev => ({ ...prev, issueType: e.target.value }))}
              placeholder="E.g., Alcoholism, Domestic Violence, etc."
            />
            {errors.issueType && <span className="error">{errors.issueType}</span>}
          </div>
          <div className="form-group full-width">
            <label>Additional Details</label>
            <textarea
              value={newIssue.details}
              onChange={(e) => setNewIssue(prev => ({ ...prev, details: e.target.value }))}
              placeholder="Incident frequency, affected individuals, etc."
            />
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