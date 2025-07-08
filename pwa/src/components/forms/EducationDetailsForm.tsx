import React, { useState } from 'react';

type EducationDetail = {
  studentName: string;
  classGrade: string;
  schoolInstitution: string;
  issuesFaced: string;
  additionalRemarks: string;
  estimatedBudget: number;
  isDropout: boolean;
  dropoutAge: number;
  lastClass: string;
  dropoutYear: number;
  dropoutReason: string;
  reentryBudget: number;
};

type Props = {
  householdData: any;
  onChange: (section: string, value: any) => void;
};

const defaultEducation: EducationDetail = {
  studentName: '',
  classGrade: '',
  schoolInstitution: '',
  issuesFaced: '',
  additionalRemarks: '',
  estimatedBudget: 0,
  isDropout: false,
  dropoutAge: 0,
  lastClass: '',
  dropoutYear: 0,
  dropoutReason: '',
  reentryBudget: 0,
};

const EducationDetailsForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [newEducation, setNewEducation] = useState<EducationDetail>(defaultEducation);

  const addEducation = () => {
    if (!newEducation.studentName) return;
    onChange('educationDetails', [...(householdData.educationDetails || []), newEducation]);
    setNewEducation(defaultEducation);
  };

  return (
    <div className="form-section">
      <h2>🎓 Education-Related Information</h2>
      <div className="add-education-form">
        <h3>Add Student</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Name of Student *</label>
            <input
              type="text"
              value={newEducation.studentName}
              onChange={(e) => setNewEducation(prev => ({ ...prev, studentName: e.target.value }))}
              placeholder="Enter student name"
            />
          </div>
          <div className="form-group">
            <label>Class / Grade</label>
            <input
              type="text"
              value={newEducation.classGrade}
              onChange={(e) => setNewEducation(prev => ({ ...prev, classGrade: e.target.value }))}
              placeholder="Enter class or grade"
            />
          </div>
          <div className="form-group">
            <label>Name of School / Institution</label>
            <input
              type="text"
              value={newEducation.schoolInstitution}
              onChange={(e) => setNewEducation(prev => ({ ...prev, schoolInstitution: e.target.value }))}
              placeholder="Enter school or institution name"
            />
          </div>
          <div className="form-group full-width">
            <label>Issues Faced in Education</label>
            <textarea
              value={newEducation.issuesFaced}
              onChange={(e) => setNewEducation(prev => ({ ...prev, issuesFaced: e.target.value }))}
              placeholder="Describe issues (e.g., transport, materials, etc.)"
            />
          </div>
          <div className="form-group full-width">
            <label>Additional Remarks</label>
            <textarea
              value={newEducation.additionalRemarks}
              onChange={(e) => setNewEducation(prev => ({ ...prev, additionalRemarks: e.target.value }))}
              placeholder="Any additional remarks"
            />
          </div>
          <div className="form-group">
            <label>Estimated Budget (if needed)</label>
            <input
              type="number"
              value={newEducation.estimatedBudget}
              onChange={(e) => setNewEducation(prev => ({ ...prev, estimatedBudget: parseInt(e.target.value) || 0 }))}
              placeholder="Enter estimated budget"
              min="0"
            />
          </div>
          <div className="form-group">
            <label>Is this student a dropout?</label>
            <input
              type="checkbox"
              checked={newEducation.isDropout}
              onChange={(e) => setNewEducation(prev => ({ ...prev, isDropout: e.target.checked }))}
            />
          </div>
          {newEducation.isDropout && (
            <>
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  value={newEducation.dropoutAge}
                  onChange={(e) => setNewEducation(prev => ({ ...prev, dropoutAge: parseInt(e.target.value) || 0 }))}
                  placeholder="Enter age"
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Last Class Attended</label>
                <input
                  type="text"
                  value={newEducation.lastClass}
                  onChange={(e) => setNewEducation(prev => ({ ...prev, lastClass: e.target.value }))}
                  placeholder="Enter last class attended"
                />
              </div>
              <div className="form-group">
                <label>Year of Dropout</label>
                <input
                  type="number"
                  value={newEducation.dropoutYear}
                  onChange={(e) => setNewEducation(prev => ({ ...prev, dropoutYear: parseInt(e.target.value) || 0 }))}
                  placeholder="Enter year of dropout"
                  min="0"
                />
              </div>
              <div className="form-group full-width">
                <label>Reason for Dropout</label>
                <textarea
                  value={newEducation.dropoutReason}
                  onChange={(e) => setNewEducation(prev => ({ ...prev, dropoutReason: e.target.value }))}
                  placeholder="Describe reason for dropout"
                />
              </div>
              <div className="form-group">
                <label>Estimated Budget for Re-entry</label>
                <input
                  type="number"
                  value={newEducation.reentryBudget}
                  onChange={(e) => setNewEducation(prev => ({ ...prev, reentryBudget: parseInt(e.target.value) || 0 }))}
                  placeholder="Enter estimated budget"
                  min="0"
                />
              </div>
            </>
          )}
        </div>
        <button type="button" onClick={addEducation} className="add-btn">
          ➕ Add Student
        </button>
      </div>
      {householdData.educationDetails && householdData.educationDetails.length > 0 && (
        <div className="education-list">
          <h3>Added Students ({householdData.educationDetails.length})</h3>
          <div className="education-grid">
            {householdData.educationDetails.map((ed: EducationDetail, idx: number) => (
              <div key={idx} className="education-card">
                <h4>{ed.studentName}</h4>
                <p><strong>Class:</strong> {ed.classGrade}</p>
                <p><strong>School:</strong> {ed.schoolInstitution}</p>
                <p><strong>Dropout:</strong> {ed.isDropout ? 'Yes' : 'No'}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationDetailsForm; 