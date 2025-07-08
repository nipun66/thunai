import React, { useState } from 'react';

type FoodConsumption = {
  foodItem: string;
  monthlyQuantity: number;
  unit: string;
  producedAtHome: boolean;
  sourceLocation: string;
};

type HouseholdData = {
  foodConsumption?: FoodConsumption[];
  // ...other fields
};

type Props = {
  householdData: HouseholdData;
  onChange: (section: string, value: any) => void;
};

type FoodConsumptionError = Partial<Record<keyof FoodConsumption, string>>;

const defaultFood: FoodConsumption = {
  foodItem: '',
  monthlyQuantity: 0,
  unit: '',
  producedAtHome: false,
  sourceLocation: '',
};

const FoodConsumptionForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<FoodConsumptionError>({});
  const [newFood, setNewFood] = useState<FoodConsumption>(defaultFood);
  const foodConsumption: FoodConsumption[] = householdData.foodConsumption || [];

  const unitOptions = ['kg', 'g', 'litre', 'ml', 'dozen', 'packet', 'piece'];

  const validate = (field: keyof FoodConsumption, value: any) => {
    let error = '';
    if (field === 'foodItem' && (!value || !/^[a-zA-Z ]+$/.test(value))) error = 'Food item is required and must be letters only';
    if (field === 'monthlyQuantity' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid monthly quantity';
    if (field === 'unit' && (!value || !unitOptions.includes(value))) error = 'Measurement unit is required';
    if (field === 'producedAtHome' && typeof value !== 'boolean') error = 'Produced at home status is required';
    if (field === 'sourceLocation' && !value) error = 'Source location is required';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };

  const validateAll = () => {
    let valid = true;
    (Object.keys(newFood) as (keyof FoodConsumption)[]).forEach((field) => {
      if (!validate(field, newFood[field])) valid = false;
    });
    return valid;
  };

  const addFood = () => {
    if (!validateAll()) return;
    onChange('foodConsumption', [...foodConsumption, newFood]);
    setNewFood(defaultFood);
    setErrors({});
  };

  return (
    <div className="form-section">
      <h2>🍲 Food Items – Monthly Consumption & Source</h2>
      <div className="add-food-form">
        <h3>Add Food Consumption</h3>
        <div className="form-grid">
          <div className="form-group">
            <label>Name of Food Item *</label>
            <input
              type="text"
              value={newFood.foodItem}
              onChange={(e) => {
                const value = e.target.value;
                setNewFood(prev => ({ ...prev, foodItem: value }));
                validate('foodItem', value);
              }}
              placeholder="E.g., Rice, Vegetables, Milk, etc."
            />
            {Boolean(errors.foodItem) && <span className="error">{errors.foodItem}</span>}
          </div>
          <div className="form-group">
            <label>Monthly Quantity Consumed</label>
            <input
              type="number"
              value={newFood.monthlyQuantity}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                setNewFood(prev => ({ ...prev, monthlyQuantity: value }));
                validate('monthlyQuantity', value);
              }}
              placeholder="Enter quantity"
              min="0"
            />
            {Boolean(errors.monthlyQuantity) && <span className="error">{errors.monthlyQuantity}</span>}
          </div>
          <div className="form-group">
            <label>Measurement Unit</label>
            <select
              value={newFood.unit}
              onChange={(e) => {
                const value = e.target.value;
                setNewFood(prev => ({ ...prev, unit: value }));
                validate('unit', value);
              }}
              required
            >
              <option value="">Select Unit</option>
              {unitOptions.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
            {Boolean(errors.unit) && <span className="error">{errors.unit}</span>}
          </div>
          <div className="form-group">
            <label>Is This Produced at Home?</label>
            <input
              type="checkbox"
              checked={newFood.producedAtHome}
              onChange={(e) => {
                const checked = e.target.checked;
                setNewFood(prev => ({ ...prev, producedAtHome: checked }));
                validate('producedAtHome', checked);
              }}
            />
            {Boolean(errors.producedAtHome) && <span className="error">{errors.producedAtHome}</span>}
          </div>
          <div className="form-group">
            <label>If Not, Where Is It Sourced From?</label>
            <select
              value={newFood.sourceLocation}
              onChange={(e) => {
                const value = e.target.value;
                setNewFood(prev => ({ ...prev, sourceLocation: value }));
                validate('sourceLocation', value);
              }}
            >
              <option value="">Select Source</option>
              <option value="Market">Market</option>
              <option value="Ration Shop">Ration Shop</option>
              <option value="Neighbor/Friends">Neighbor/Friends</option>
              <option value="Local Vendor">Local Vendor</option>
              <option value="Others">Others</option>
            </select>
            {Boolean(errors.sourceLocation) && <span className="error">{errors.sourceLocation}</span>}
          </div>
        </div>
        <button type="button" onClick={addFood} className="add-btn">
          ➕ Add Food Consumption
        </button>
      </div>
      {foodConsumption.length > 0 && (
        <div className="food-list">
          <h3>Added Food Consumption ({foodConsumption.length})</h3>
          <div className="food-grid">
            {foodConsumption.map((food: FoodConsumption, idx: number) => (
              <div key={idx} className="food-card">
                <h4>{food.foodItem}</h4>
                <p><strong>Quantity:</strong> {food.monthlyQuantity} {food.unit}</p>
                <p><strong>Produced at Home:</strong> {food.producedAtHome ? 'Yes' : 'No'}</p>
                <p><strong>Source:</strong> {food.sourceLocation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodConsumptionForm; 