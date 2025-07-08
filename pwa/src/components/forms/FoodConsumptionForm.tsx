import React, { useState } from 'react';

type FoodConsumption = {
  foodItem: string;
  monthlyQuantity: number;
  unit: string;
  producedAtHome: boolean;
  sourceLocation: string;
};

type Props = {
  householdData: any;
  onChange: (section: string, value: any) => void;
};

const defaultFood: FoodConsumption = {
  foodItem: '',
  monthlyQuantity: 0,
  unit: '',
  producedAtHome: false,
  sourceLocation: '',
};

const FoodConsumptionForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [errors, setErrors] = useState<any>({});
  const [newFood, setNewFood] = useState<FoodConsumption>(defaultFood);
  const foodConsumption: FoodConsumption[] = householdData.foodConsumption || [];
  const validate = (field: string, value: any) => {
    let error = '';
    if (field === 'foodItem' && !value) error = 'Food item is required';
    if (field === 'monthlyQuantity' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid monthly quantity';
    if (field === 'unit' && !value) error = 'Measurement unit is required';
    if (field === 'producedAtHome' && typeof value !== 'boolean') error = 'Produced at home status is required';
    if (field === 'sourceLocation' && !value) error = 'Source location is required';
    setErrors((prev: any) => ({ ...prev, [field]: error }));
    return error === '';
  };

  const addFood = () => {
    if (!newFood.foodItem) return;
    onChange('foodConsumption', [...foodConsumption, newFood]);
    setNewFood(defaultFood);
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
              onChange={(e) => setNewFood(prev => ({ ...prev, foodItem: e.target.value }))}
              placeholder="E.g., Rice, Vegetables, Milk, etc."
            />
            {errors.foodItem && <span className="error">{errors.foodItem}</span>}
          </div>
          <div className="form-group">
            <label>Monthly Quantity Consumed</label>
            <input
              type="number"
              value={newFood.monthlyQuantity}
              onChange={(e) => setNewFood(prev => ({ ...prev, monthlyQuantity: parseFloat(e.target.value) || 0 }))}
              placeholder="Enter quantity"
              min="0"
            />
            {errors.monthlyQuantity && <span className="error">{errors.monthlyQuantity}</span>}
          </div>
          <div className="form-group">
            <label>Measurement Unit</label>
            <input
              type="text"
              value={newFood.unit}
              onChange={(e) => setNewFood(prev => ({ ...prev, unit: e.target.value }))}
              placeholder="E.g., kg, litre, dozen, etc."
            />
            {errors.unit && <span className="error">{errors.unit}</span>}
          </div>
          <div className="form-group">
            <label>Is This Produced at Home?</label>
            <input
              type="checkbox"
              checked={newFood.producedAtHome}
              onChange={(e) => setNewFood(prev => ({ ...prev, producedAtHome: e.target.checked }))}
            />
            {errors.producedAtHome && <span className="error">{errors.producedAtHome}</span>}
          </div>
          <div className="form-group">
            <label>If Not, Where Is It Sourced From?</label>
            <select
              value={newFood.sourceLocation}
              onChange={(e) => setNewFood(prev => ({ ...prev, sourceLocation: e.target.value }))}
            >
              <option value="">Select Source</option>
              <option value="Market">Market</option>
              <option value="Ration Shop">Ration Shop</option>
              <option value="Neighbor/Friends">Neighbor/Friends</option>
              <option value="Local Vendor">Local Vendor</option>
              <option value="Others">Others</option>
            </select>
            {errors.sourceLocation && <span className="error">{errors.sourceLocation}</span>}
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