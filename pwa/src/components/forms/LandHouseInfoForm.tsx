import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

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

interface LandAssetError {
  landType?: string;
  ownershipType?: string;
  area?: string;
  documentationType?: string;
}
interface GovtSchemeHouseError {
  ownerName?: string;
  scheme?: string;
  allottedBy?: string;
  area?: string;
  yearBuilt?: string;
  sanctionedAmount?: string;
  installments?: string;
  amountReceived?: string;
  balanceAmount?: string;
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
  const [landErrors, setLandErrors] = useState<LandAssetError[]>([]);
  const [houseErrors, setHouseErrors] = useState<GovtSchemeHouseError[]>([]);

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

  const validateAllLand = (asset: LandAsset) => {
    let valid = true;
    if (!asset.landType) valid = false;
    if (!asset.ownershipType) valid = false;
    if (asset.area === undefined || isNaN(asset.area) || asset.area < 0) valid = false;
    if (!asset.documentationType) valid = false;
    return valid;
  };
  const addLandAsset = () => {
    onChange('landAssets', [...landAssets, { ...emptyLandAsset }]);
  };
  const removeLandAsset = (idx: number) => {
    onChange('landAssets', landAssets.filter((_, i) => i !== idx));
  };

  const validateAllHouse = (house: GovtSchemeHouse) => {
    let valid = true;
    if (!house.ownerName) valid = false;
    if (!house.scheme) valid = false;
    if (!house.allottedBy) valid = false;
    if (house.area === undefined || isNaN(house.area) || house.area < 0) valid = false;
    if (house.yearBuilt === undefined || isNaN(house.yearBuilt) || house.yearBuilt < 0) valid = false;
    return valid;
  };
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
    <Paper elevation={3} sx={{ p: { xs: 2, md: 4 }, maxWidth: 900, mx: 'auto', mt: 3 }}>
      <Typography variant="h5" fontWeight={700} mb={2} color="primary.main">
        Land and House Information
      </Typography>
      <Typography variant="h6" fontWeight={600} mb={1}>Land Assets</Typography>
      {landAssets.length === 0 && <Typography color="text.secondary">No land assets added yet.</Typography>}
      {landAssets.map((asset, idx) => (
        <Box key={idx} sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2, mb: 2 }}>
          <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={2}>
            <TextField
              label="Land Type"
              value={asset.landType}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { onChange('landAssets', landAssets.map((a, i) => i === idx ? { ...a, landType: e.target.value } : a)); validateLand(idx, 'landType', e.target.value); }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => validateLand(idx, 'landType', e.target.value)}
              error={!!landErrors[idx]?.landType}
              helperText={landErrors[idx]?.landType || 'Enter land type'}
              required
              fullWidth
            />
            <TextField
              label="Ownership Type"
              value={asset.ownershipType}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { onChange('landAssets', landAssets.map((a, i) => i === idx ? { ...a, ownershipType: e.target.value } : a)); validateLand(idx, 'ownershipType', e.target.value); }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => validateLand(idx, 'ownershipType', e.target.value)}
              error={!!landErrors[idx]?.ownershipType}
              helperText={landErrors[idx]?.ownershipType || 'Enter ownership type'}
              required
              fullWidth
            />
            <TextField
              label="Area (in cents/hectares/acres)"
              type="number"
              inputProps={{ min: 0 }}
              value={asset.area}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { const val = e.target.value; if (/^\d*$/.test(val)) { onChange('landAssets', landAssets.map((a, i) => i === idx ? { ...a, area: val === '' ? '' : parseInt(val) } : a)); validateLand(idx, 'area', val === '' ? '' : parseInt(val)); }}}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => validateLand(idx, 'area', e.target.value)}
              error={!!landErrors[idx]?.area}
              helperText={landErrors[idx]?.area || 'Enter area'}
              required
              fullWidth
            />
            <TextField
              label="Documentation Type"
              value={asset.documentationType}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { onChange('landAssets', landAssets.map((a, i) => i === idx ? { ...a, documentationType: e.target.value } : a)); validateLand(idx, 'documentationType', e.target.value); }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => validateLand(idx, 'documentationType', e.target.value)}
              error={!!landErrors[idx]?.documentationType}
              helperText={landErrors[idx]?.documentationType || 'Enter documentation type'}
              required
              fullWidth
            />
          </Box>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button variant="outlined" color="error" onClick={() => removeLandAsset(idx)}>
              Remove
            </Button>
          </Box>
        </Box>
      ))}
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={addLandAsset} sx={{ fontWeight: 600 }}>
          Add Land Asset
        </Button>
      </Box>
      <Typography variant="h6" fontWeight={600} mb={1} mt={4}>Government Scheme Houses</Typography>
      {govtSchemeHouses.length === 0 && <Typography color="text.secondary">No government scheme houses added yet.</Typography>}
      {govtSchemeHouses.map((house, idx) => (
        <Box key={idx} sx={{ border: '1px solid #ccc', borderRadius: 2, p: 2, mb: 2 }}>
          <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={2}>
            <TextField
              label="Owner Name"
              value={house.ownerName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { onChange('govtSchemeHouses', govtSchemeHouses.map((h, i) => i === idx ? { ...h, ownerName: e.target.value } : h)); validateHouse(idx, 'ownerName', e.target.value); }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => validateHouse(idx, 'ownerName', e.target.value)}
              error={!!houseErrors[idx]?.ownerName}
              helperText={houseErrors[idx]?.ownerName || 'Enter owner name'}
              required
              fullWidth
            />
            <TextField
              label="Scheme"
              value={house.scheme}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { onChange('govtSchemeHouses', govtSchemeHouses.map((h, i) => i === idx ? { ...h, scheme: e.target.value } : h)); validateHouse(idx, 'scheme', e.target.value); }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => validateHouse(idx, 'scheme', e.target.value)}
              error={!!houseErrors[idx]?.scheme}
              helperText={houseErrors[idx]?.scheme || 'Enter scheme'}
              required
              fullWidth
            />
            <TextField
              label="Allotted By"
              value={house.allottedBy}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { onChange('govtSchemeHouses', govtSchemeHouses.map((h, i) => i === idx ? { ...h, allottedBy: e.target.value } : h)); validateHouse(idx, 'allottedBy', e.target.value); }}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => validateHouse(idx, 'allottedBy', e.target.value)}
              error={!!houseErrors[idx]?.allottedBy}
              helperText={houseErrors[idx]?.allottedBy || 'Enter allotted by'}
              required
              fullWidth
            />
            <TextField
              label="Area (in sq.ft/sq.m)"
              type="number"
              inputProps={{ min: 0 }}
              value={house.area}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { const val = e.target.value; if (/^\d*$/.test(val)) { onChange('govtSchemeHouses', govtSchemeHouses.map((h, i) => i === idx ? { ...h, area: val === '' ? '' : parseInt(val) } : h)); validateHouse(idx, 'area', val === '' ? '' : parseInt(val)); }}}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => validateHouse(idx, 'area', e.target.value)}
              error={!!houseErrors[idx]?.area}
              helperText={houseErrors[idx]?.area || 'Enter area'}
              required
              fullWidth
            />
            <TextField
              label="Year Built"
              type="number"
              inputProps={{ min: 0 }}
              value={house.yearBuilt}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => { const val = e.target.value; if (/^\d*$/.test(val)) { onChange('govtSchemeHouses', govtSchemeHouses.map((h, i) => i === idx ? { ...h, yearBuilt: val === '' ? '' : parseInt(val) } : h)); validateHouse(idx, 'yearBuilt', val === '' ? '' : parseInt(val)); }}}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => validateHouse(idx, 'yearBuilt', e.target.value)}
              error={!!houseErrors[idx]?.yearBuilt}
              helperText={houseErrors[idx]?.yearBuilt || 'Enter year built'}
              required
              fullWidth
            />
          </Box>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button variant="outlined" color="error" onClick={() => removeGovtHouse(idx)}>
              Remove
            </Button>
          </Box>
        </Box>
      ))}
      <Box mt={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={addGovtHouse} sx={{ fontWeight: 600 }}>
          Add Government Scheme House
        </Button>
      </Box>
    </Paper>
  );
};

export default LandHouseInfoForm; 