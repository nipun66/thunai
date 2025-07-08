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

type HouseholdData = {
  educationDetails?: EducationDetail[];
};

type Props = {
  householdData: HouseholdData;
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
  const [errors, setErrors] = useState({
    studentName: '',
    classGrade: '',
    schoolInstitution: '',
    issuesFaced: '',
    estimatedBudget: '',
    dropoutAge: '',
    lastClass: '',
    dropoutYear: '',
    dropoutReason: '',
    reentryBudget: '',
  });

  const validate = (field: string, value: any) => {
    let error = '';
    switch (field) {
      case 'studentName':
        if (!value) error = 'Student name is required.';
        break;
      case 'classGrade':
        if (!value) error = 'Class/Grade is required.';
        break;
      case 'schoolInstitution':
        if (!value) error = 'School/Institution name is required.';
        break;
      case 'issuesFaced':
        if (!value) error = 'Issues faced in education is required.';
        break;
      case 'estimatedBudget':
        if (value < 0) error = 'Estimated budget cannot be negative.';
        break;
      case 'dropoutAge':
        if (value < 0) error = 'Dropout age cannot be negative.';
        break;
      case 'lastClass':
        if (!value) error = 'Last class attended is required.';
        break;
      case 'dropoutYear':
        if (value < 0) error = 'Dropout year cannot be negative.';
        break;
      case 'dropoutReason':
        if (!value) error = 'Reason for dropout is required.';
        break;
      case 'reentryBudget':
        if (value < 0) error = 'Re-entry budget cannot be negative.';
        break;
    }
    setErrors(prev => ({ ...prev, [field]: error }));
    return !error;
  };

  const addEducation = () => {
    if (!newEducation.studentName) {
      setErrors(prev => ({ ...prev, studentName: 'Student name is required.' }));
      return;
    }
    if (!newEducation.classGrade) {
      setErrors(prev => ({ ...prev, classGrade: 'Class/Grade is required.' }));
      return;
    }
    if (!newEducation.schoolInstitution) {
      setErrors(prev => ({ ...prev, schoolInstitution: 'School/Institution name is required.' }));
      return;
    }
    if (!newEducation.issuesFaced) {
      setErrors(prev => ({ ...prev, issuesFaced: 'Issues faced in education is required.' }));
      return;
    }
    if (newEducation.isDropout && newEducation.dropoutAge < 0) {
      setErrors(prev => ({ ...prev, dropoutAge: 'Dropout age cannot be negative.' }));
      return;
    }
    if (newEducation.isDropout && !newEducation.lastClass) {
      setErrors(prev => ({ ...prev, lastClass: 'Last class attended is required.' }));
      return;
    }
    if (newEducation.isDropout && newEducation.dropoutYear < 0) {
      setErrors(prev => ({ ...prev, dropoutYear: 'Dropout year cannot be negative.' }));
      return;
    }
    if (newEducation.isDropout && !newEducation.dropoutReason) {
      setErrors(prev => ({ ...prev, dropoutReason: 'Reason for dropout is required.' }));
      return;
    }
    if (newEducation.isDropout && newEducation.reentryBudget < 0) {
      setErrors(prev => ({ ...prev, reentryBudget: 'Re-entry budget cannot be negative.' }));
      return;
    }

    onChange('educationDetails', [...(householdData.educationDetails || []), newEducation]);
    setNewEducation(defaultEducation);
    setErrors({
      studentName: '',
      classGrade: '',
      schoolInstitution: '',
      issuesFaced: '',
      estimatedBudget: '',
      dropoutAge: '',
      lastClass: '',
      dropoutYear: '',
      dropoutReason: '',
      reentryBudget: '',
    });
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
              onChange={(e) => {
                const value = e.target.value;
                setNewEducation(prev => ({ ...prev, studentName: value }));
                validate('studentName', value);
              }}
              placeholder="Enter student name"
            />
            {Boolean(errors.studentName) && <p className="error-message">{errors.studentName}</p>}
          </div>
          <div className="form-group">
            <label>Class / Grade</label>
            <input
              type="text"
              value={newEducation.classGrade}
              onChange={(e) => {
                const value = e.target.value;
                setNewEducation(prev => ({ ...prev, classGrade: value }));
                validate('classGrade', value);
              }}
              placeholder="Enter class or grade"
            />
            {Boolean(errors.classGrade) && <p className="error-message">{errors.classGrade}</p>}
          </div>
          <div className="form-group">
            <label>Name of School / Institution</label>
            <input
              type="text"
              value={newEducation.schoolInstitution}
              onChange={(e) => {
                const value = e.target.value;
                setNewEducation(prev => ({ ...prev, schoolInstitution: value }));
                validate('schoolInstitution', value);
              }}
              placeholder="Enter school or institution name"
            />
            {Boolean(errors.schoolInstitution) && <p className="error-message">{errors.schoolInstitution}</p>}
          </div>
          <div className="form-group full-width">
            <label>Issues Faced in Education</label>
            <textarea
              value={newEducation.issuesFaced}
              onChange={(e) => {
                const value = e.target.value;
                setNewEducation(prev => ({ ...prev, issuesFaced: value }));
                validate('issuesFaced', value);
              }}
              placeholder="Describe issues (e.g., transport, materials, etc.)"
            />
            {Boolean(errors.issuesFaced) && <p className="error-message">{errors.issuesFaced}</p>}
          </div>
          <div className="form-group full-width">
            <label>Additional Remarks</label>
            <textarea
              value={newEducation.additionalRemarks}
              onChange={(e) => {
                const value = e.target.value;
                setNewEducation(prev => ({ ...prev, additionalRemarks: value }));
                // No validation for additionalRemarks as it's not required
              }}
              placeholder="Any additional remarks"
            />
          </div>
          <div className="form-group">
            <label>Estimated Budget (if needed)</label>
            <input
              type="number"
              value={newEducation.estimatedBudget}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 0;
                setNewEducation(prev => ({ ...prev, estimatedBudget: value }));
                validate('estimatedBudget', value);
              }}
              placeholder="Enter estimated budget"
              min="0"
            />
            {Boolean(errors.estimatedBudget) && <p className="error-message">{errors.estimatedBudget}</p>}
          </div>
          <div className="form-group">
            <label>Is this student a dropout?</label>
            <input
              type="checkbox"
              checked={newEducation.isDropout}
              onChange={(e) => {
                const checked = e.target.checked;
                setNewEducation(prev => ({ ...prev, isDropout: checked }));
                if (!checked) {
                  setErrors(prev => ({ ...prev, dropoutAge: '', lastClass: '', dropoutYear: '', dropoutReason: '', reentryBudget: '' }));
                }
              }}
            />
          </div>
          {newEducation.isDropout && (
            <>
              <div className="form-group">
                <label>Age</label>
                <input
                  type="number"
                  value={newEducation.dropoutAge}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setNewEducation(prev => ({ ...prev, dropoutAge: value }));
                    validate('dropoutAge', value);
                  }}
                  placeholder="Enter age"
                  min="0"
                />
                {Boolean(errors.dropoutAge) && <p className="error-message">{errors.dropoutAge}</p>}
              </div>
              <div className="form-group">
                <label>Last Class Attended</label>
                <input
                  type="text"
                  value={newEducation.lastClass}
                  onChange={(e) => {
                    const value = e.target.value;
                    setNewEducation(prev => ({ ...prev, lastClass: value }));
                    validate('lastClass', value);
                  }}
                  placeholder="Enter last class attended"
                />
                {Boolean(errors.lastClass) && <p className="error-message">{errors.lastClass}</p>}
              </div>
              <div className="form-group">
                <label>Year of Dropout</label>
                <input
                  type="number"
                  value={newEducation.dropoutYear}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setNewEducation(prev => ({ ...prev, dropoutYear: value }));
                    validate('dropoutYear', value);
                  }}
                  placeholder="Enter year of dropout"
                  min="0"
                />
                {Boolean(errors.dropoutYear) && <p className="error-message">{errors.dropoutYear}</p>}
              </div>
              <div className="form-group full-width">
                <label>Reason for Dropout</label>
                <textarea
                  value={newEducation.dropoutReason}
                  onChange={(e) => {
                    const value = e.target.value;
                    setNewEducation(prev => ({ ...prev, dropoutReason: value }));
                    validate('dropoutReason', value);
                  }}
                  placeholder="Describe reason for dropout"
                />
                {Boolean(errors.dropoutReason) && <p className="error-message">{errors.dropoutReason}</p>}
              </div>
              <div className="form-group">
                <label>Estimated Budget for Re-entry</label>
                <input
                  type="number"
                  value={newEducation.reentryBudget}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setNewEducation(prev => ({ ...prev, reentryBudget: value }));
                    validate('reentryBudget', value);
                  }}
                  placeholder="Enter estimated budget"
                  min="0"
                />
                {Boolean(errors.reentryBudget) && <p className="error-message">{errors.reentryBudget}</p>}
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