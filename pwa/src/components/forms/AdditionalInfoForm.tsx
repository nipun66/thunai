import React, { useState } from 'react';

type AdditionalInfo = {
  benefitsReceived: string;
  additionalRemarks: string;
  surveyComments: string;
};

type Props = {
  householdData: any;
  onChange: (section: string, value: any) => void;
};

const AdditionalInfoForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<any>({});
  const validate = (field: string, value: any) => {
    let error = '';
    if (field === 'benefitsReceived' && !value) error = 'Benefits Received is required';
    if (field === 'additionalRemarks' && !value) error = 'Additional Remarks are required';
    if (field === 'surveyComments' && !value) error = 'Comments on the Survey Conducted are required';
    setErrors((prev: any) => ({ ...prev, [field]: error }));
    return error === '';
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
        {errors.benefitsReceived && <span className="error">{errors.benefitsReceived}</span>}
      </label>
      <label>Additional Remarks:
        <input type="text" value={householdData.additionalInfo.additionalRemarks} onChange={e => { onChange('additionalInfo', { ...householdData.additionalInfo, additionalRemarks: e.target.value }); validate('additionalRemarks', e.target.value); }} onBlur={e => validate('additionalRemarks', e.target.value)} required />
        {errors.additionalRemarks && <span className="error">{errors.additionalRemarks}</span>}
      </label>
      <label>Comments on the Survey Conducted:
        <input type="text" value={householdData.additionalInfo.surveyComments} onChange={e => { onChange('additionalInfo', { ...householdData.additionalInfo, surveyComments: e.target.value }); validate('surveyComments', e.target.value); }} onBlur={e => validate('surveyComments', e.target.value)} required />
        {errors.surveyComments && <span className="error">{errors.surveyComments}</span>}
      </label>
    </div>
  );
};

export default AdditionalInfoForm; 