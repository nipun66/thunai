import React, { useState } from 'react';

type ForestResource = {
  productName: string;
  collectionDays: number;
  quantityKg: number;
  sellingPricePerKg: number;
  sellingPlace: string;
};

type Props = {
  householdData: any;
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
  const [errors, setErrors] = useState<any>({});
  const safeData = householdData || {};
  const [newResource, setNewResource] = useState<ForestResource>(defaultResource);
  const validate = (field: string, value: any) => {
    let error = '';
    if (field === 'productName' && !value) error = 'Product name is required';
    if (field === 'collectionDays' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid number of days';
    if (field === 'quantityKg' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid quantity in kg';
    if (field === 'sellingPricePerKg' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid selling price per kg';
    if (field === 'sellingPlace' && !value) error = 'Selling place is required';
    setErrors((prev: any) => ({ ...prev, [field]: error }));
    return error === '';
  };

  const addResource = () => {
    if (!newResource.productName) return;
    onChange('forestResources', [...(safeData.forestResources || []), newResource]);
    setNewResource(defaultResource);
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
              onChange={(e) => setNewResource(prev => ({ ...prev, productName: e.target.value }))}
              placeholder="Enter product name"
            />
            {errors.productName && <span className="error">{errors.productName}</span>}
          </div>
          <div className="form-group">
            <label>Number of Days Collected (in 1 year)</label>
            <input
              type="number"
              value={newResource.collectionDays}
              onChange={(e) => setNewResource(prev => ({ ...prev, collectionDays: parseInt(e.target.value) || 0 }))}
              placeholder="Enter days"
              min="0"
            />
            {errors.collectionDays && <span className="error">{errors.collectionDays}</span>}
          </div>
          <div className="form-group">
            <label>Quantity Collected (kg per year)</label>
            <input
              type="number"
              value={newResource.quantityKg}
              onChange={(e) => setNewResource(prev => ({ ...prev, quantityKg: parseFloat(e.target.value) || 0 }))}
              placeholder="Enter quantity in kg"
              min="0"
            />
            {errors.quantityKg && <span className="error">{errors.quantityKg}</span>}
          </div>
          <div className="form-group">
            <label>Average Selling Price (per kg)</label>
            <input
              type="number"
              value={newResource.sellingPricePerKg}
              onChange={(e) => setNewResource(prev => ({ ...prev, sellingPricePerKg: parseFloat(e.target.value) || 0 }))}
              placeholder="Enter price in INR"
              min="0"
            />
            {errors.sellingPricePerKg && <span className="error">{errors.sellingPricePerKg}</span>}
          </div>
          <div className="form-group">
            <label>Place/Buyer Where It Is Sold</label>
            <input
              type="text"
              value={newResource.sellingPlace}
              onChange={(e) => setNewResource(prev => ({ ...prev, sellingPlace: e.target.value }))}
              placeholder="E.g., Local market, Tribal cooperative, etc."
            />
            {errors.sellingPlace && <span className="error">{errors.sellingPlace}</span>}
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