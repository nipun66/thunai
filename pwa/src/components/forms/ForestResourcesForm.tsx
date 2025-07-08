import React, { useState } from 'react';

type ForestResource = {
  productName: string;
  collectionDays: number;
  quantityKg: number;
  sellingPricePerKg: number;
  sellingPlace: string;
};

type HouseholdData = {
  forestResources?: ForestResource[];
  // Add other fields as needed
};

type Props = {
  householdData: HouseholdData;
  onChange: (section: string, value: any) => void;
};

const defaultResource: ForestResource = {
  productName: '',
  collectionDays: 0,
  quantityKg: 0,
  sellingPricePerKg: 0,
  sellingPlace: '',
};

const ForestResourcesForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<Partial<Record<keyof ForestResource, string>>>({});
  const safeData = householdData || {};
  const [newResource, setNewResource] = useState<ForestResource>(defaultResource);
  const validate = (field: keyof ForestResource, value: any) => {
    let error = '';
    if (field === 'productName' && !value) error = 'Product name is required';
    if (field === 'collectionDays' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid number of days';
    if (field === 'quantityKg' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid quantity in kg';
    if (field === 'sellingPricePerKg' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid selling price per kg';
    if (field === 'sellingPlace' && !value) error = 'Selling place is required';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };

  const validateAll = () => {
    let valid = true;
    (Object.keys(newResource) as (keyof ForestResource)[]).forEach((field) => {
      if (!validate(field, newResource[field])) valid = false;
    });
    return valid;
  };

  const addResource = () => {
    if (!validateAll()) return;
    onChange('forestResources', [...(safeData.forestResources || []), newResource]);
    setNewResource(defaultResource);
    setErrors({});
  };

  return (
    <div className="form-section">
      <h2>🌳 Forest Resource Collection</h2>
      <div className="add-resource-form">
        <h3>Add Forest Resource</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Name of Forest Product Collected *</label>
            <input
              type="text"
              value={newResource.productName}
              onChange={(e) => {
                const value = e.target.value;
                setNewResource(prev => ({ ...prev, productName: value }));
                validate('productName', value);
              }}
              placeholder="Enter product name"
            />
            {Boolean(errors.productName) && <span className="error">{errors.productName}</span>}
          </div>
          <div className="form-group">
            <label>Number of Days Collected (in 1 year)</label>
            <input
              type="number"
              value={newResource.collectionDays}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 0;
                setNewResource(prev => ({ ...prev, collectionDays: value }));
                validate('collectionDays', value);
              }}
              placeholder="Enter days"
              min="0"
            />
            {Boolean(errors.collectionDays) && <span className="error">{errors.collectionDays}</span>}
          </div>
          <div className="form-group">
            <label>Quantity Collected (kg per year)</label>
            <input
              type="number"
              value={newResource.quantityKg}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                setNewResource(prev => ({ ...prev, quantityKg: value }));
                validate('quantityKg', value);
              }}
              placeholder="Enter quantity in kg"
              min="0"
            />
            {Boolean(errors.quantityKg) && <span className="error">{errors.quantityKg}</span>}
          </div>
          <div className="form-group">
            <label>Average Selling Price (per kg)</label>
            <input
              type="number"
              value={newResource.sellingPricePerKg}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                setNewResource(prev => ({ ...prev, sellingPricePerKg: value }));
                validate('sellingPricePerKg', value);
              }}
              placeholder="Enter price in INR"
              min="0"
            />
            {Boolean(errors.sellingPricePerKg) && <span className="error">{errors.sellingPricePerKg}</span>}
          </div>
          <div className="form-group">
            <label>Place/Buyer Where It Is Sold</label>
            <input
              type="text"
              value={newResource.sellingPlace}
              onChange={(e) => {
                const value = e.target.value;
                setNewResource(prev => ({ ...prev, sellingPlace: value }));
                validate('sellingPlace', value);
              }}
              placeholder="E.g., Local market, Tribal cooperative, etc."
            />
            {Boolean(errors.sellingPlace) && <span className="error">{errors.sellingPlace}</span>}
          </div>
        </div>
        <button type="button" onClick={addResource} className="add-btn">
          ➕ Add Forest Resource
        </button>
      </div>
      {safeData.forestResources && safeData.forestResources.length > 0 && (
        <div className="resources-list">
          <h3>Added Forest Resources ({safeData.forestResources.length})</h3>
          <div className="resources-grid">
            {safeData.forestResources.map((res: ForestResource, idx: number) => (
              <div key={idx} className="resource-card">
                <h4>{res.productName}</h4>
                <p><strong>Days Collected:</strong> {res.collectionDays}</p>
                <p><strong>Quantity (kg):</strong> {res.quantityKg}</p>
                <p><strong>Price/kg:</strong> {res.sellingPricePerKg}</p>
                <p><strong>Sold at:</strong> {res.sellingPlace}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ForestResourcesForm; 