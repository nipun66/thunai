import React, { useState } from 'react';
import { FormValidator } from './validation';

type AdditionalInfoError = {
  benefitsReceived?: string;
  additionalRemarks?: string;
  surveyComments?: string;
};

type AdditionalInfo = {
  benefitsReceived: string;
  additionalRemarks: string;
  surveyComments: string;
};

type Props = {
  householdData: { additionalInfo: AdditionalInfo };
  onChange: (section: string, value: any) => void;
};

const AdditionalInfoForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState({
    benefitsReceived: '', additionalRemarks: '', surveyComments: ''
  });
  const validate = (field: keyof AdditionalInfo, value: any) => {
    let error = '';
    if (field === 'benefitsReceived') error = FormValidator.validateText(FormValidator.sanitize(value), { minLength: 2, maxLength: 200 }) || '';
    if (field === 'additionalRemarks') error = FormValidator.validateTextarea(FormValidator.sanitize(value), { required: false, minLength: 0, maxLength: 200 }) || '';
    if (field === 'surveyComments') error = FormValidator.validateTextarea(FormValidator.sanitize(value), { required: false, minLength: 0, maxLength: 200 }) || '';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };
  const validateAll = () => {
    let valid = true;
    (['benefitsReceived', 'additionalRemarks', 'surveyComments'] as (keyof AdditionalInfoError)[]).forEach((field) => {
      if (!validate(field, householdData.additionalInfo[field])) valid = false;
    });
    return valid;
  };
  const additionalInfo = householdData.additionalInfo || { benefitsReceived: '', additionalRemarks: '', surveyComments: '' };

  const handleChange = (field: keyof AdditionalInfo, value: string) => {
    onChange('additionalInfo', { ...additionalInfo, [field]: value });
  };

  return (
    <div className="form-section">
      <h2>Additional Info</h2>
      <label>Benefits Received:
        <input type="text" value={householdData.additionalInfo.benefitsReceived} onChange={e => { onChange('additionalInfo', { ...householdData.additionalInfo, benefitsReceived: e.target.value }); validate('benefitsReceived', e.target.value); }} onBlur={e => validate('benefitsReceived', e.target.value)} required />
        {Boolean(errors.benefitsReceived) && <span className="error">{errors.benefitsReceived}</span>}
      </label>
      <label>Additional Remarks:
        <input type="text" value={householdData.additionalInfo.additionalRemarks} onChange={e => { onChange('additionalInfo', { ...householdData.additionalInfo, additionalRemarks: e.target.value }); validate('additionalRemarks', e.target.value); }} onBlur={e => validate('additionalRemarks', e.target.value)} required />
        {Boolean(errors.additionalRemarks) && <span className="error">{errors.additionalRemarks}</span>}
      </label>
      <label>Comments on the Survey Conducted:
        <input type="text" value={householdData.additionalInfo.surveyComments} onChange={e => { onChange('additionalInfo', { ...householdData.additionalInfo, surveyComments: e.target.value }); validate('surveyComments', e.target.value); }} onBlur={e => validate('surveyComments', e.target.value)} required />
        {Boolean(errors.surveyComments) && <span className="error">{errors.surveyComments}</span>}
      </label>
    </div>
  );
};

export default AdditionalInfoForm; 