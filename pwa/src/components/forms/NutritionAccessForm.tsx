import React, { useState } from 'react';

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

type Props = {
  householdData: any;
  onChange: (section: string, field: string, value: any) => void;
};

const NutritionAccessForm: React.FC<Props> = ({ householdData, onChange }) => {
  const [newItem, setNewItem] = useState<NutritionItem>({ name: '', quantity: 0, unit: '' });

  const addItem = (key: keyof NutritionAccess) => {
    if (!newItem.name) return;
    const items = [...(householdData.nutritionAccess[key] || []), newItem];
    onChange('nutritionAccess', key, items);
    setNewItem({ name: '', quantity: 0, unit: '' });
  };

  return (
    <div className="form-section">
      <h2>🍚 Nutrition Access</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>Source of Support</label>
          <select
            value={householdData.nutritionAccess.sourceOfSupport}
            onChange={(e) => onChange('nutritionAccess', 'sourceOfSupport', e.target.value)}
          >
            <option value="">Select Source</option>
            <option value="Ration">Ration</option>
            <option value="Anganwadi">Anganwadi</option>
            <option value="Tribal Welfare Dept.">Tribal Welfare Dept.</option>
            <option value="Doorstep Delivery (Vaathilpadi Sevana)">Doorstep Delivery (Vaathilpadi Sevana)</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div className="form-group">
          <label>Support Currently Being Received From Ration Shop</label>
          <input
            type="checkbox"
            checked={householdData.nutritionAccess.rationShopReceiving}
            onChange={(e) => onChange('nutritionAccess', 'rationShopReceiving', e.target.checked)}
          />
        </div>
        <div className="form-group full-width">
          <label>Add Ration Item</label>
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Item Name"
          />
          <input
            type="number"
            value={newItem.quantity}
            onChange={(e) => setNewItem(prev => ({ ...prev, quantity: parseInt(e.target.value) || 0 }))}
            placeholder="Quantity"
            min="0"
          />
          <input
            type="text"
            value={newItem.unit}
            onChange={(e) => setNewItem(prev => ({ ...prev, unit: e.target.value }))}
            placeholder="Unit"
          />
          <button type="button" onClick={() => addItem('rationItems')} className="add-btn">
            ➕ Add Ration Item
          </button>
        </div>
        {/* Repeat similar blocks for Anganwadi, Tribal Dept, Vathil Padi */}
        {/* ... */}
      </div>
    </div>
  );
};

export default NutritionAccessForm; 