import React, { useState } from 'react';
import { FormValidator } from './validation';

type AnimalHusbandryError = {
  animalCategory?: string;
  numberOfAnimals?: string;
  breedType?: string;
  estimatedIncome?: string;
  additionalSupport?: string;
  trainingInterest?: string;
};

type AnimalHusbandryData = {
  animalCategory: string;
  numberOfAnimals: number;
  breedType: string;
  estimatedIncome: number;
  additionalSupport: string;
  trainingInterest: boolean;
};

type Props = {
  householdData: AnimalHusbandryData;
  onChange: (field: string, value: any) => void;
};

const AnimalHusbandryForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState({
    animalCategory: '', numberOfAnimals: '', breedType: '', estimatedIncome: '', additionalSupport: '', trainingInterest: ''
  });
  const validate = (field: keyof AnimalHusbandryData, value: any) => {
    let error = '';
    if (field === 'animalCategory') error = FormValidator.validateDropdown(value) || '';
    if (field === 'numberOfAnimals') error = FormValidator.validateNumber(value, { min: 0, max: 1000, integer: true }) || '';
    if (field === 'breedType') error = FormValidator.validateDropdown(value) || '';
    if (field === 'estimatedIncome') error = FormValidator.validateNumber(value, { min: 0, max: 1000000, integer: true }) || '';
    if (field === 'additionalSupport') error = FormValidator.validateTextarea(FormValidator.sanitize(value), { required: false, minLength: 0, maxLength: 200 }) || '';
    if (field === 'trainingInterest') error = FormValidator.validateBoolean(value) || '';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };
  const validateAll = () => {
    let valid = true;
    (['animalCategory', 'numberOfAnimals', 'breedType', 'estimatedIncome', 'additionalSupport', 'trainingInterest'] as (keyof AnimalHusbandryError)[]).forEach((field) => {
      if (!validate(field, householdData[field])) valid = false;
    });
    return valid;
  };

  return (
    <div>
      <h2>Animal Husbandry</h2>
      <label>Animal Category:
        <input type="text" value={householdData.animalCategory} onChange={e => { onChange('animalCategory', e.target.value); validate('animalCategory', e.target.value); }} onBlur={e => validate('animalCategory', e.target.value)} required />
        {Boolean(errors.animalCategory) && <span className="error">{errors.animalCategory}</span>}
      </label>
      <label>Number of Animals:
        <input type="number" min={0} value={householdData.numberOfAnimals} onChange={e => { onChange('numberOfAnimals', e.target.value === '' ? '' : parseInt(e.target.value)); validate('numberOfAnimals', e.target.value); }} onBlur={e => validate('numberOfAnimals', e.target.value)} required />
        {Boolean(errors.numberOfAnimals) && <span className="error">{errors.numberOfAnimals}</span>}
      </label>
      <label>Breed Type:
        <input type="text" value={householdData.breedType} onChange={e => { onChange('breedType', e.target.value); validate('breedType', e.target.value); }} onBlur={e => validate('breedType', e.target.value)} required />
        {Boolean(errors.breedType) && <span className="error">{errors.breedType}</span>}
      </label>
      <label>Estimated Income:
        <input type="number" min={0} value={householdData.estimatedIncome} onChange={e => { onChange('estimatedIncome', e.target.value === '' ? '' : parseFloat(e.target.value)); validate('estimatedIncome', e.target.value); }} onBlur={e => validate('estimatedIncome', e.target.value)} required />
        {Boolean(errors.estimatedIncome) && <span className="error">{errors.estimatedIncome}</span>}
      </label>
      <label>Additional Support:
        <textarea value={householdData.additionalSupport} onChange={e => { onChange('additionalSupport', e.target.value); validate('additionalSupport', e.target.value); }} onBlur={e => validate('additionalSupport', e.target.value)} />
        {Boolean(errors.additionalSupport) && <span className="error">{errors.additionalSupport}</span>}
      </label>
      <label>Training Interest:
        <input type="checkbox" checked={householdData.trainingInterest} onChange={e => { onChange('trainingInterest', e.target.checked); validate('trainingInterest', e.target.checked); }} onBlur={e => validate('trainingInterest', e.target.checked)} />
        {Boolean(errors.trainingInterest) && <span className="error">{errors.trainingInterest}</span>}
      </label>
    </div>
  );
};
export default AnimalHusbandryForm; 