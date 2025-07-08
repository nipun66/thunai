import React, { useState } from 'react';

interface LandAsset {
  landType: string;
  ownershipType: string;
  area: number;
  documentationType: string;
}

interface GovtSchemeHouse {
  ownerName: string;
  scheme: string;
  allottedBy: string;
  area: number;
  yearBuilt: number;
  sanctionedAmount: number;
  installments: number;
  amountReceived: number;
  balanceAmount: number;
}

interface Props {
  householdData: {
    landAssets: LandAsset[];
    govtSchemeHouses: GovtSchemeHouse[];
  };
  onChange: (field: string, value: any) => void;
}

const emptyLandAsset: LandAsset = {
  landType: '',
  ownershipType: '',
  area: 0,
  documentationType: '',
};

const emptyGovtSchemeHouse: GovtSchemeHouse = {
  ownerName: '',
  scheme: '',
  allottedBy: '',
  area: 0,
  yearBuilt: 0,
  sanctionedAmount: 0,
  installments: 0,
  amountReceived: 0,
  balanceAmount: 0,
};

const LandHouseInfoForm: React.FC<Props> = ({ householdData, onChange }) => {
  const safeData = householdData || {};
  const landAssets = safeData.landAssets || [];
  const govtSchemeHouses = safeData.govtSchemeHouses || [];
  const [landErrors, setLandErrors] = useState<any[]>([]);
  const [houseErrors, setHouseErrors] = useState<any[]>([]);

  const validateLand = (idx: number, field: keyof LandAsset, value: any) => {
    let error = '';
    if (field === 'landType' && !value) error = 'Land type is required';
    if (field === 'ownershipType' && !value) error = 'Ownership type is required';
    if (field === 'area' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid area';
    if (field === 'documentationType' && !value) error = 'Documentation type is required';
    setLandErrors(prev => {
      const newErrors = [...prev];
      if (!newErrors[idx]) newErrors[idx] = {};
      newErrors[idx][field] = error;
      return newErrors;
    });
    return error === '';
  };

  const validateHouse = (idx: number, field: keyof GovtSchemeHouse, value: any) => {
    let error = '';
    if (field === 'ownerName' && !value) error = 'Owner name is required';
    if (field === 'scheme' && !value) error = 'Scheme is required';
    if (field === 'allottedBy' && !value) error = 'Allotted by is required';
    if (field === 'area' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid area';
    if (field === 'yearBuilt' && (value === '' || isNaN(value) || value < 0)) error = 'Enter a valid year';
    setHouseErrors(prev => {
      const newErrors = [...prev];
      if (!newErrors[idx]) newErrors[idx] = {};
      newErrors[idx][field] = error;
      return newErrors;
    });
    return error === '';
  };

  // Land Assets
  const handleLandAssetChange = (idx: number, field: keyof LandAsset, value: any) => {
    const updated = landAssets.map((a, i) => i === idx ? { ...a, [field]: value } : a);
    onChange('landAssets', updated);
  };
  const addLandAsset = () => {
    onChange('landAssets', [...landAssets, { ...emptyLandAsset }]);
  };
  const removeLandAsset = (idx: number) => {
    onChange('landAssets', landAssets.filter((_, i) => i !== idx));
  };

  // Govt Scheme Houses
  const handleGovtHouseChange = (idx: number, field: keyof GovtSchemeHouse, value: any) => {
    const updated = govtSchemeHouses.map((h, i) => i === idx ? { ...h, [field]: value } : h);
    onChange('govtSchemeHouses', updated);
  };
  const addGovtHouse = () => {
    onChange('govtSchemeHouses', [...govtSchemeHouses, { ...emptyGovtSchemeHouse }]);
  };
  const removeGovtHouse = (idx: number) => {
    onChange('govtSchemeHouses', govtSchemeHouses.filter((_, i) => i !== idx));
  };

  return (
    <div>
      <h2>Land and House Information</h2>
      <h3>Land Assets</h3>
      {landAssets.length === 0 && <p>No land assets added yet.</p>}
      {landAssets.map((asset, idx) => (
        <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
          <label>Land Type:
            <input type="text" value={asset.landType} onChange={e => { onChange('landAssets', landAssets.map((a, i) => i === idx ? { ...a, landType: e.target.value } : a)); validateLand(idx, 'landType', e.target.value); }} onBlur={e => validateLand(idx, 'landType', e.target.value)} required />
            {landErrors[idx]?.landType && <span className="error">{landErrors[idx].landType}</span>}
          </label>
          <br />
          <label>Ownership Type:
            <input type="text" value={asset.ownershipType} onChange={e => { onChange('landAssets', landAssets.map((a, i) => i === idx ? { ...a, ownershipType: e.target.value } : a)); validateLand(idx, 'ownershipType', e.target.value); }} onBlur={e => validateLand(idx, 'ownershipType', e.target.value)} required />
            {landErrors[idx]?.ownershipType && <span className="error">{landErrors[idx].ownershipType}</span>}
          </label>
          <br />
          <label>Area (in cents/hectares/acres):
            <input type="number" min={0} value={asset.area} onChange={e => { const val = e.target.value; if (/^\d*$/.test(val)) { onChange('landAssets', landAssets.map((a, i) => i === idx ? { ...a, area: val === '' ? '' : parseInt(val) } : a)); validateLand(idx, 'area', val === '' ? '' : parseInt(val)); }}} onBlur={e => validateLand(idx, 'area', e.target.value)} required />
            {landErrors[idx]?.area && <span className="error">{landErrors[idx].area}</span>}
          </label>
          <br />
          <label>Documentation Type:
            <input type="text" value={asset.documentationType} onChange={e => { onChange('landAssets', landAssets.map((a, i) => i === idx ? { ...a, documentationType: e.target.value } : a)); validateLand(idx, 'documentationType', e.target.value); }} onBlur={e => validateLand(idx, 'documentationType', e.target.value)} required />
            {landErrors[idx]?.documentationType && <span className="error">{landErrors[idx].documentationType}</span>}
          </label>
          <br />
          <button type="button" onClick={() => removeLandAsset(idx)} style={{ color: 'red' }}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={addLandAsset}>Add Land Asset</button>

      <h3>Government Scheme Houses</h3>
      {govtSchemeHouses.length === 0 && <p>No government scheme houses added yet.</p>}
      {govtSchemeHouses.map((house, idx) => (
        <div key={idx} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
          <label>Owner Name:
            <input type="text" value={house.ownerName} onChange={e => { onChange('govtSchemeHouses', govtSchemeHouses.map((h, i) => i === idx ? { ...h, ownerName: e.target.value } : h)); validateHouse(idx, 'ownerName', e.target.value); }} onBlur={e => validateHouse(idx, 'ownerName', e.target.value)} required />
            {houseErrors[idx]?.ownerName && <span className="error">{houseErrors[idx].ownerName}</span>}
          </label>
          <br />
          <label>Scheme:
            <input type="text" value={house.scheme} onChange={e => { onChange('govtSchemeHouses', govtSchemeHouses.map((h, i) => i === idx ? { ...h, scheme: e.target.value } : h)); validateHouse(idx, 'scheme', e.target.value); }} onBlur={e => validateHouse(idx, 'scheme', e.target.value)} required />
            {houseErrors[idx]?.scheme && <span className="error">{houseErrors[idx].scheme}</span>}
          </label>
          <br />
          <label>Allotted By:
            <input type="text" value={house.allottedBy} onChange={e => { onChange('govtSchemeHouses', govtSchemeHouses.map((h, i) => i === idx ? { ...h, allottedBy: e.target.value } : h)); validateHouse(idx, 'allottedBy', e.target.value); }} onBlur={e => validateHouse(idx, 'allottedBy', e.target.value)} required />
            {houseErrors[idx]?.allottedBy && <span className="error">{houseErrors[idx].allottedBy}</span>}
          </label>
          <br />
          <label>Area (in sq.ft/sq.m):
            <input type="number" min={0} value={house.area} onChange={e => { const val = e.target.value; if (/^\d*$/.test(val)) { onChange('govtSchemeHouses', govtSchemeHouses.map((h, i) => i === idx ? { ...h, area: val === '' ? '' : parseInt(val) } : h)); validateHouse(idx, 'area', val === '' ? '' : parseInt(val)); }}} onBlur={e => validateHouse(idx, 'area', e.target.value)} required />
            {houseErrors[idx]?.area && <span className="error">{houseErrors[idx].area}</span>}
          </label>
          <br />
          <label>Year Built:
            <input type="number" min={0} value={house.yearBuilt} onChange={e => { const val = e.target.value; if (/^\d*$/.test(val)) { onChange('govtSchemeHouses', govtSchemeHouses.map((h, i) => i === idx ? { ...h, yearBuilt: val === '' ? '' : parseInt(val) } : h)); validateHouse(idx, 'yearBuilt', val === '' ? '' : parseInt(val)); }}} onBlur={e => validateHouse(idx, 'yearBuilt', e.target.value)} required />
            {houseErrors[idx]?.yearBuilt && <span className="error">{houseErrors[idx].yearBuilt}</span>}
          </label>
          <br />
          <label>Sanctioned Amount:
            <input type="number" min={0} value={house.sanctionedAmount} onChange={e => handleGovtHouseChange(idx, 'sanctionedAmount', Number(e.target.value))} />
          </label>
          <br />
          <label>Installments:
            <input type="number" min={0} value={house.installments} onChange={e => handleGovtHouseChange(idx, 'installments', Number(e.target.value))} />
          </label>
          <br />
          <label>Amount Received:
            <input type="number" min={0} value={house.amountReceived} onChange={e => handleGovtHouseChange(idx, 'amountReceived', Number(e.target.value))} />
          </label>
          <br />
          <label>Balance Amount:
            <input type="number" min={0} value={house.balanceAmount} onChange={e => handleGovtHouseChange(idx, 'balanceAmount', Number(e.target.value))} />
          </label>
          <br />
          <button type="button" onClick={() => removeGovtHouse(idx)} style={{ color: 'red' }}>Remove</button>
        </div>
      ))}
      <button type="button" onClick={addGovtHouse}>Add Government Scheme House</button>
    </div>
  );
};

export default LandHouseInfoForm; 