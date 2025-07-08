import React, { useState } from 'react';
import { FormValidator } from './validation';

type NutritionItem = {
  name: string;
  quantity: number;
  unit: string;
};

type NutritionAccess = {
  sourceOfSupport: string;
  rationShopReceiving: boolean;
  rationItems: NutritionItem[];
  anganwadiReceiving: boolean;
  anganwadiItems: NutritionItem[];
  tribalDeptReceiving: boolean;
  tribalDeptItems: NutritionItem[];
  vathilPadiReceiving: boolean;
  vathilPadiItems: NutritionItem[];
};

type HouseholdData = {
  nutritionAccess: NutritionAccess;
};

type Props = {
  householdData: HouseholdData;
  onChange: (section: string, field: string, value: any) => void;
};

// Add a type for the NutritionItem array keys:
type NutritionItemArrayKey = 'rationItems' | 'anganwadiItems' | 'tribalDeptItems' | 'vathilPadiItems';

const NutritionAccessForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [newItem, setNewItem] = useState<NutritionItem>({ name: '', quantity: 0, unit: '' });
  const [errors, setErrors] = useState({
    sourceOfSupport: '', rationShopReceiving: '', anganwadiReceiving: '', tribalDeptReceiving: '', vathilPadiReceiving: ''
  });

  const validateItem = (item: NutritionItem) => {
    if (!item.name || !/^[a-zA-Z ]+$/.test(item.name)) return false;
    if (!item.unit || !unitOptions.includes(item.unit)) return false;
    if (isNaN(item.quantity) || item.quantity <= 0) return false;
    return true;
  };
  const addItem = (key: NutritionItemArrayKey) => {
    if (!validateItem(newItem)) return;
    const items = [...(householdData.nutritionAccess[key] || []), newItem];
    onChange('nutritionAccess', key, items);
    setNewItem({ name: '', quantity: 0, unit: '' });
  };

  const unitOptions = ['kg', 'g', 'litre', 'ml', 'packet', 'piece'];

  const validate = (field: keyof NutritionAccess, value: any) => {
    let error = '';
    if (field === 'sourceOfSupport') error = FormValidator.validateDropdown(value) || '';
    if (field === 'rationShopReceiving') error = FormValidator.validateBoolean(value) || '';
    if (field === 'anganwadiReceiving') error = FormValidator.validateBoolean(value) || '';
    if (field === 'tribalDeptReceiving') error = FormValidator.validateBoolean(value) || '';
    if (field === 'vathilPadiReceiving') error = FormValidator.validateBoolean(value) || '';
    setErrors((prev) => ({ ...prev, [field]: error }));
    return error === '';
  };

  return (
    <div className="form-section">
      <h2>🍚 Nutrition Access</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>Source of Support</label>
          <select
            value={householdData.nutritionAccess.sourceOfSupport}
            onChange={(e) => {
              onChange('nutritionAccess', 'sourceOfSupport', e.target.value);
              validate('sourceOfSupport', e.target.value);
            }}
          >
            <option value="">Select Source</option>
            <option value="Ration">Ration</option>
            <option value="Anganwadi">Anganwadi</option>
            <option value="Tribal Welfare Dept.">Tribal Welfare Dept.</option>
            <option value="Doorstep Delivery (Vaathilpadi Sevana)">Doorstep Delivery (Vaathilpadi Sevana)</option>
            <option value="Others">Others</option>
          </select>
          {Boolean(errors.sourceOfSupport) && <span className="error">{errors.sourceOfSupport}</span>}
        </div>
        <div className="form-group">
          <label>Support Currently Being Received From Ration Shop</label>
          <input
            type="checkbox"
            checked={householdData.nutritionAccess.rationShopReceiving}
            onChange={(e) => {
              onChange('nutritionAccess', 'rationShopReceiving', e.target.checked);
              validate('rationShopReceiving', e.target.checked);
            }}
          />
          {Boolean(errors.rationShopReceiving) && <span className="error">{errors.rationShopReceiving}</span>}
        </div>
        <div className="form-group full-width">
          <label>Add Ration Item</label>
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Item Name"
            pattern="[a-zA-Z ]+"
          />
          <input
            type="number"
            value={newItem.quantity}
            onChange={(e) => setNewItem(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
            placeholder="Quantity"
            min="1"
          />
          <select
            value={newItem.unit}
            onChange={e => setNewItem(prev => ({ ...prev, unit: e.target.value }))}
            required
          >
            <option value="">Select Unit</option>
            {unitOptions.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
          <button type="button" onClick={() => addItem('rationItems')} className="add-btn">
            ➕ Add Ration Item
          </button>
          <ul>
            {householdData.nutritionAccess.rationItems.map((item, idx) => (
              <li key={idx}>{item.name} - {item.quantity} {item.unit}</li>
            ))}
          </ul>
        </div>
        {/* Repeat similar blocks for Anganwadi, Tribal Dept, Vathil Padi */}
        {/* ... */}
      </div>
    </div>
  );
};

export default NutritionAccessForm; 