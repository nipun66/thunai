'use client';

import { useState } from 'react';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface HouseholdDetailViewProps {
  household: any;
  onClose: () => void;
}

export default function HouseholdDetailView({ household, onClose }: HouseholdDetailViewProps) {
  const [activeSection, setActiveSection] = useState('basic');
  const theme = useTheme();

  const sections = [
    { id: 'basic', name: 'Basic Information', icon: '🏠' },
    { id: 'members', name: 'Family Members', icon: '👥' },
    { id: 'migrant', name: 'Migrant Workers', icon: '🚶' },
    { id: 'land', name: 'Land & House', icon: '🏡' },
    { id: 'housing', name: 'Physical Structure', icon: '🏗️' },
    { id: 'electrical', name: 'Electrical & Lighting', icon: '💡' },
    { id: 'sanitation', name: 'Sanitation & Bathroom', icon: '🚽' },
    { id: 'water', name: 'Water Source', icon: '💧' },
    { id: 'waste', name: 'Waste Management', icon: '🗑️' },
    { id: 'health', name: 'Health Conditions', icon: '🏥' },
    { id: 'education', name: 'Education', icon: '📚' },
    { id: 'employment', name: 'Employment', icon: '💼' },
    { id: 'entitlements', name: 'Entitlements', icon: '📋' },
    { id: 'nutrition', name: 'Nutrition Access', icon: '🍎' },
    { id: 'transport', name: 'Transportation', icon: '🚗' },
    { id: 'shg', name: 'SHG Participation', icon: '🤝' },
    { id: 'loans', name: 'Loans & Debts', icon: '💰' },
    { id: 'balasabha', name: 'Balasabha', icon: '👶' },
    { id: 'childgroups', name: 'Child Groups', icon: '🎯' },
    { id: 'agriculture', name: 'Agriculture', icon: '🌾' },
    { id: 'cultivation', name: 'Cultivation Mode', icon: '🌱' },
    { id: 'traditional', name: 'Traditional Farming', icon: '🌿' },
    { id: 'livestock', name: 'Livestock', icon: '🐄' },
    { id: 'food', name: 'Food Consumption', icon: '🍽️' },
    { id: 'cashcrops', name: 'Cash Crops', icon: '🌻' },
    { id: 'forest', name: 'Forest Resources', icon: '🌲' },
    { id: 'social', name: 'Social Issues', icon: '⚠️' },
    { id: 'wage', name: 'Wage Employment', icon: '🔨' },
    { id: 'livelihood', name: 'Livelihood Opportunities', icon: '🎯' },
    { id: 'arts', name: 'Arts & Sports', icon: '🎨' },
    { id: 'public', name: 'Public Institutions', icon: '🏛️' },
    { id: 'phone', name: 'Phone Connectivity', icon: '📱' },
    { id: 'additional', name: 'Additional Info', icon: '📝' }
  ];

  const renderBasicInfo = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Basic Household Information</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1">Head of Family:</Typography>
            <Typography variant="body1">{household.household_head_name}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1">Address:</Typography>
            <Typography variant="body1">{household.address}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1">Post Office:</Typography>
            <Typography variant="body1">{household.post_office}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1">Colony/Settlement:</Typography>
            <Typography variant="body1">{household.colony_settlement_name}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1">Category:</Typography>
            <Typography variant="body1">{household.category}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1">Micro Plan Number:</Typography>
            <Typography variant="body1">{household.micro_plan_number}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1">Grama Panchayat:</Typography>
            <Typography variant="body1">{household.grama_panchayat}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1">Ward Number:</Typography>
            <Typography variant="body1">{household.ward_number}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1">House Number:</Typography>
            <Typography variant="body1">{household.house_number}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1">Family Members:</Typography>
            <Typography variant="body1">{household.family_members_count}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );

  const renderFamilyMembers = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Family Member Details</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Relation</TableCell>
              <TableCell>Education</TableCell>
              <TableCell>Occupation</TableCell>
              <TableCell>Aadhaar</TableCell>
              <TableCell>Bank Account</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {household.members?.map((member: any, index: number) => (
              <TableRow key={index}>
                <TableCell>{member.name}</TableCell>
                <TableCell>{member.age}</TableCell>
                <TableCell>{member.gender}</TableCell>
                <TableCell>{member.relation_to_head}</TableCell>
                <TableCell>{member.general_education_level}</TableCell>
                <TableCell>{member.occupation_sector}</TableCell>
                <TableCell>{member.has_aadhaar ? 'Yes' : 'No'}</TableCell>
                <TableCell>{member.bank_account ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );

  // --- SRS Section Renderers ---
  const renderMigrantWorkers = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Migrant Worker Details</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Place</TableCell>
              <TableCell>Work Sector</TableCell>
              <TableCell>Skills/Expertise</TableCell>
              <TableCell>Employment Duration</TableCell>
              <TableCell>Additional Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {household.migrant_workers?.map((mw: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell>{mw.name}</TableCell>
                <TableCell>{mw.place}</TableCell>
                <TableCell>{mw.work_sector}</TableCell>
                <TableCell>{mw.skills_expertise}</TableCell>
                <TableCell>{mw.employment_duration}</TableCell>
                <TableCell>{mw.additional_details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );

  const renderLandAssets = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Land & House Information</Typography>
      <Typography variant="h6" gutterBottom>Land Assets</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Ownership</TableCell>
              <TableCell>Area (acres)</TableCell>
              <TableCell>Documentation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {household.land_assets?.map((la: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell>{la.land_type}</TableCell>
                <TableCell>{la.ownership_type}</TableCell>
                <TableCell>{la.area_in_acres}</TableCell>
                <TableCell>{la.documentation_type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" gutterBottom>Govt Scheme Houses</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Owner Name</TableCell>
              <TableCell>Scheme</TableCell>
              <TableCell>Allotted By</TableCell>
              <TableCell>Area</TableCell>
              <TableCell>Year Built</TableCell>
              <TableCell>Sanctioned Amount</TableCell>
              <TableCell>Installments</TableCell>
              <TableCell>Amount Received</TableCell>
              <TableCell>Balance Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {household.govt_scheme_houses?.map((gsh: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell>{gsh.owner_name}</TableCell>
                <TableCell>{gsh.scheme}</TableCell>
                <TableCell>{gsh.allotted_by}</TableCell>
                <TableCell>{gsh.area}</TableCell>
                <TableCell>{gsh.year_built}</TableCell>
                <TableCell>{gsh.sanctioned_amount}</TableCell>
                <TableCell>{gsh.installments}</TableCell>
                <TableCell>{gsh.amount_received}</TableCell>
                <TableCell>{gsh.balance_amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );

  const renderHousingDetails = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Physical Structure Details</Typography>
      {household.housing_details?.map((hd: any, idx: number) => (
        <Grid container spacing={2} key={idx} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Completion Status:</Typography>
              <Typography variant="body2">{hd.completion_status}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Age of House:</Typography>
              <Typography variant="body2">{hd.age_of_house}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Current Condition:</Typography>
              <Typography variant="body2">{hd.current_condition}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Roof Material:</Typography>
              <Typography variant="body2">{hd.roof_material}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Roof Condition:</Typography>
              <Typography variant="body2">{hd.roof_condition}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Roof Budget:</Typography>
              <Typography variant="body2">{hd.roof_budget}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Wall Material:</Typography>
              <Typography variant="body2">{hd.wall_material}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Wall Condition:</Typography>
              <Typography variant="body2">{hd.wall_condition}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Wall Budget:</Typography>
              <Typography variant="body2">{hd.wall_budget}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Floor Material:</Typography>
              <Typography variant="body2">{hd.floor_material}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Floor Needs Repair:</Typography>
              <Typography variant="body2">{hd.floor_needs_repair ? 'Yes' : 'No'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Floor Budget:</Typography>
              <Typography variant="body2">{hd.floor_budget}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Door Condition:</Typography>
              <Typography variant="body2">{hd.door_condition}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Good Doors Count:</Typography>
              <Typography variant="body2">{hd.good_doors_count}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Window Condition:</Typography>
              <Typography variant="body2">{hd.window_condition}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Good Windows Count:</Typography>
              <Typography variant="body2">{hd.good_windows_count}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Door/Window Budget:</Typography>
              <Typography variant="body2">{hd.door_window_budget}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Kitchen Ventilation:</Typography>
              <Typography variant="body2">{hd.kitchen_ventilation}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Kitchen Appliances:</Typography>
              <Typography variant="body2">{hd.kitchen_appliances?.join(', ')}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Kitchen Budget:</Typography>
              <Typography variant="body2">{hd.kitchen_budget}</Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );

  const renderElectricalFacilities = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Electrical & Lighting</Typography>
      {household.electrical_facilities?.map((ef: any, idx: number) => (
        <Grid container spacing={2} key={idx} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Electrified:</Typography>
              <Typography variant="body2">{ef.is_electrified ? 'Yes' : 'No'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Has Connection:</Typography>
              <Typography variant="body2">{ef.has_connection ? 'Yes' : 'No'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Wiring Complete:</Typography>
              <Typography variant="body2">{ef.wiring_complete}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Wiring Safe:</Typography>
              <Typography variant="body2">{ef.wiring_safe}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Cooking Fuel:</Typography>
              <Typography variant="body2">{ef.cooking_fuel}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Stove Type:</Typography>
              <Typography variant="body2">{ef.stove_type}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Bulbs Count:</Typography>
              <Typography variant="body2">{ef.bulbs_count}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Bulb Types:</Typography>
              <Typography variant="body2">{ef.bulb_types?.join(', ')}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Has Solar:</Typography>
              <Typography variant="body2">{ef.has_solar ? 'Yes' : 'No'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Solar Usage:</Typography>
              <Typography variant="body2">{ef.solar_usage}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Solar Condition:</Typography>
              <Typography variant="body2">{ef.solar_condition}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Additional Comments:</Typography>
              <Typography variant="body2">{ef.additional_comments}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Estimated Budget:</Typography>
              <Typography variant="body2">{ef.estimated_budget}</Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );

  const renderSanitationFacilities = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Sanitation & Bathroom</Typography>
      {household.sanitation_facilities?.map((sf: any, idx: number) => (
        <Grid container spacing={2} key={idx} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Has Toilet:</Typography>
              <Typography variant="body2">{sf.has_toilet ? 'Yes' : 'No'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Has Bathroom:</Typography>
              <Typography variant="body2">{sf.has_bathroom ? 'Yes' : 'No'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">All Use Toilet:</Typography>
              <Typography variant="body2">{sf.all_use_toilet ? 'Yes' : 'No'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Uses Public Toilet:</Typography>
              <Typography variant="body2">{sf.uses_public_toilet ? 'Yes' : 'No'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Satisfied with Public:</Typography>
              <Typography variant="body2">{sf.satisfied_with_public ? 'Yes' : 'No'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Public Toilet Quality:</Typography>
              <Typography variant="body2">{sf.public_toilet_quality}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Distance to Water:</Typography>
              <Typography variant="body2">{sf.distance_to_water}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Toilet Tank Type:</Typography>
              <Typography variant="body2">{sf.toilet_tank_type}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Toilet Closet Type:</Typography>
              <Typography variant="body2">{sf.toilet_closet_type}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Toilet Roof Material:</Typography>
              <Typography variant="body2">{sf.toilet_roof_material}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Toilet Wall Type:</Typography>
              <Typography variant="body2">{sf.toilet_wall_type}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Toilet Door Type:</Typography>
              <Typography variant="body2">{sf.toilet_door_type}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Toilet Floor Type:</Typography>
              <Typography variant="body2">{sf.toilet_floor_type}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Water Availability:</Typography>
              <Typography variant="body2">{sf.water_availability}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Additional Notes:</Typography>
              <Typography variant="body2">{sf.additional_notes}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Estimated Budget:</Typography>
              <Typography variant="body2">{sf.estimated_budget}</Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );

  const renderWaterSources = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Water Source & Management</Typography>
      {household.water_sources?.map((ws: any, idx: number) => (
        <Grid container spacing={2} key={idx} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Has Conservation:</Typography>
              <Typography variant="body2">{ws.has_conservation ? 'Yes' : 'No'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Conservation Methods:</Typography>
              <Typography variant="body2">{ws.conservation_methods}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Has Storage Tank:</Typography>
              <Typography variant="body2">{ws.has_storage_tank ? 'Yes' : 'No'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Source Type:</Typography>
              <Typography variant="body2">{ws.source_type}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Ownership:</Typography>
              <Typography variant="body2">{ws.ownership}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Availability:</Typography>
              <Typography variant="body2">{ws.availability}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Quality:</Typography>
              <Typography variant="body2">{ws.quality}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Collection Method:</Typography>
              <Typography variant="body2">{ws.collection_method}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Additional Remarks:</Typography>
              <Typography variant="body2">{ws.additional_remarks}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Estimated Budget:</Typography>
              <Typography variant="body2">{ws.estimated_budget}</Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );

  const renderWasteManagement = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Waste Management</Typography>
      {household.waste_management?.map((wm: any, idx: number) => (
        <Grid container spacing={2} key={idx} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Solid Waste Facility:</Typography>
              <Typography variant="body2">{wm.solid_waste_facility}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Liquid Waste Facility:</Typography>
              <Typography variant="body2">{wm.liquid_waste_facility}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Wastewater Handling:</Typography>
              <Typography variant="body2">{wm.wastewater_handling}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Additional Remarks:</Typography>
              <Typography variant="body2">{wm.additional_remarks}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Estimated Budget:</Typography>
              <Typography variant="body2">{wm.estimated_budget}</Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );

  const renderHealthConditions = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Health Conditions</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Member Name</TableCell>
              <TableCell>Health Condition</TableCell>
              <TableCell>Place of Treatment</TableCell>
              <TableCell>Additional Details</TableCell>
              <TableCell>Estimated Budget</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {household.health_conditions?.map((hc: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell>{hc.member_name}</TableCell>
                <TableCell>{hc.health_condition}</TableCell>
                <TableCell>{hc.place_of_treatment}</TableCell>
                <TableCell>{hc.additional_details}</TableCell>
                <TableCell>{hc.estimated_budget}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );

  const renderEducationDetails = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Education Information</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Class/Grade</TableCell>
              <TableCell>School/Institution</TableCell>
              <TableCell>Issues Faced</TableCell>
              <TableCell>Dropout</TableCell>
              <TableCell>Dropout Age</TableCell>
              <TableCell>Last Class</TableCell>
              <TableCell>Dropout Year</TableCell>
              <TableCell>Dropout Reason</TableCell>
              <TableCell>Reentry Budget</TableCell>
              <TableCell>Additional Remarks</TableCell>
              <TableCell>Estimated Budget</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {household.education_details?.map((ed: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell>{ed.student_name}</TableCell>
                <TableCell>{ed.class_grade}</TableCell>
                <TableCell>{ed.school_institution}</TableCell>
                <TableCell>{ed.issues_faced}</TableCell>
                <TableCell>{ed.is_dropout ? 'Yes' : 'No'}</TableCell>
                <TableCell>{ed.dropout_age}</TableCell>
                <TableCell>{ed.last_class}</TableCell>
                <TableCell>{ed.dropout_year}</TableCell>
                <TableCell>{ed.dropout_reason}</TableCell>
                <TableCell>{ed.reentry_budget}</TableCell>
                <TableCell>{ed.additional_remarks}</TableCell>
                <TableCell>{ed.estimated_budget}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );

  const renderEmploymentDetails = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Employment & Registration</Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Member Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Employment Exchange</TableCell>
              <TableCell>Registered PSC</TableCell>
              <TableCell>DWMS</TableCell>
              <TableCell>Additional Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {household.employment_details?.map((em: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell>{em.member_name}</TableCell>
                <TableCell>{em.age}</TableCell>
                <TableCell>{em.employment_exchange}</TableCell>
                <TableCell>{em.registered_psc ? 'Yes' : 'No'}</TableCell>
                <TableCell>{em.dwms}</TableCell>
                <TableCell>{em.additional_details}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );

  const renderEntitlements = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Entitlements & Identity Documents</Typography>
      {household.entitlements?.map((en: any, idx: number) => (
        <Grid container spacing={2} key={idx} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Land Ownership Document:</Typography>
              <Typography variant="body2">{en.land_ownership_document ? 'Yes' : 'No'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Ration Card Available:</Typography>
              <Typography variant="body2">{en.ration_card_available ? 'Yes' : 'No'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Ration Card Type:</Typography>
              <Typography variant="body2">{en.ration_card_type}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Health Insurance:</Typography>
              <Typography variant="body2">{en.health_insurance ? 'Yes' : 'No'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Employee Card:</Typography>
              <Typography variant="body2">{en.employee_card ? 'Yes' : 'No'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Homeless Support Scheme:</Typography>
              <Typography variant="body2">{en.homeless_support_scheme ? 'Yes' : 'No'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Remarks:</Typography>
              <Typography variant="body2">{en.remarks}</Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );

  const renderNutritionAccess = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Nutrition Access</Typography>
      {household.nutrition_access?.map((na: any, idx: number) => (
        <Grid container spacing={2} key={idx} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Source of Support:</Typography>
              <Typography variant="body2">{na.source_of_support}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Ration Shop Receiving:</Typography>
              <Typography variant="body2">{na.ration_shop_receiving ? 'Yes' : 'No'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Ration Items:</Typography>
              <Typography variant="body2">{na.ration_items?.map((item: any) => `${item.name} (${item.quantity} ${item.unit})`).join(', ')}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Anganwadi Receiving:</Typography>
              <Typography variant="body2">{na.anganwadi_receiving ? 'Yes' : 'No'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Anganwadi Items:</Typography>
              <Typography variant="body2">{na.anganwadi_items?.map((item: any) => `${item.name} (${item.quantity} ${item.unit})`).join(', ')}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Tribal Dept Receiving:</Typography>
              <Typography variant="body2">{na.tribal_dept_receiving ? 'Yes' : 'No'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Tribal Dept Items:</Typography>
              <Typography variant="body2">{na.tribal_dept_items?.map((item: any) => `${item.name} (${item.quantity} ${item.unit})`).join(', ')}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Vathil Padi Receiving:</Typography>
              <Typography variant="body2">{na.vathil_padi_receiving ? 'Yes' : 'No'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Vathil Padi Items:</Typography>
              <Typography variant="body2">{na.vathil_padi_items?.map((item: any) => `${item.name} (${item.quantity} ${item.unit})`).join(', ')}</Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );

  const renderTransportation = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Transportation Facilities</Typography>
      {household.transportation?.map((tr: any, idx: number) => (
        <Grid container spacing={2} key={idx} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Access Path Type:</Typography>
              <Typography variant="body2">{tr.access_path_type}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Distance to Main Road:</Typography>
              <Typography variant="body2">{tr.distance_to_main_road}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Path Condition:</Typography>
              <Typography variant="body2">{tr.path_condition}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Vehicle Owned:</Typography>
              <Typography variant="body2">{tr.vehicle_owned}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Additional Notes:</Typography>
              <Typography variant="body2">{tr.additional_notes}</Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );

  const renderSHGParticipation = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>SHG Participation</Typography>
      {household.shg_participation?.map((shg: any, idx: number) => (
        <Grid container spacing={2} key={idx} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Member Name:</Typography>
              <Typography variant="body2">{shg.member_name}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Group Name:</Typography>
              <Typography variant="body2">{shg.group_name}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Years Membership:</Typography>
              <Typography variant="body2">{shg.years_membership}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Additional Details:</Typography>
              <Typography variant="body2">{shg.additional_details}</Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );

  const renderLoansDebts = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Loans & Debts</Typography>
      {household.loans_debts?.map((ld: any, idx: number) => (
        <Grid container spacing={2} key={idx} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Source:</Typography>
              <Typography variant="body2">{ld.source}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Purpose:</Typography>
              <Typography variant="body2">{ld.purpose}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Year Taken:</Typography>
              <Typography variant="body2">{ld.year_taken}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Total Amount:</Typography>
              <Typography variant="body2">{ld.total_amount}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Interest Rate:</Typography>
              <Typography variant="body2">{ld.interest_rate}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Repayment Frequency:</Typography>
              <Typography variant="body2">{ld.repayment_frequency}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Monthly Repayment:</Typography>
              <Typography variant="body2">{ld.monthly_repayment}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Outstanding Balance:</Typography>
              <Typography variant="body2">{ld.outstanding_balance}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Additional Remarks:</Typography>
              <Typography variant="body2">{ld.additional_remarks}</Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );

  const renderBalasabha = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Balasabha Participation</Typography>
      {household.balasabha_participation?.map((b: any, idx: number) => (
        <Grid container spacing={2} key={idx} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Has Children Members:</Typography>
              <Typography variant="body2">{b.has_children_members ? 'Yes' : 'No'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Children Count:</Typography>
              <Typography variant="body2">{b.children_count}</Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );

  const renderChildGroups = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Child-Focused Groups</Typography>
      {household.child_groups?.map((cg: any, idx: number) => (
        <Grid container spacing={2} key={idx} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Organization Name:</Typography>
              <Typography variant="body2">{cg.organization_name}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Child Participants:</Typography>
              <Typography variant="body2">{cg.child_participants}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Role/Activity:</Typography>
              <Typography variant="body2">{cg.role_activity}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Additional Notes:</Typography>
              <Typography variant="body2">{cg.additional_notes}</Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );

  const renderAgriculturalLand = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Agricultural Land & Irrigation</Typography>
      {household.agricultural_land?.map((al: any, idx: number) => (
        <Grid container spacing={2} key={idx} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Land Type:</Typography>
              <Typography variant="body2">{al.land_type}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Total Cultivated Area:</Typography>
              <Typography variant="body2">{al.total_cultivated_area}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Unused Area:</Typography>
              <Typography variant="body2">{al.unused_area}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">High Water Area:</Typography>
              <Typography variant="body2">{al.high_water_area}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Medium Water Area:</Typography>
              <Typography variant="body2">{al.medium_water_area}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Irrigation Sources:</Typography>
              <Typography variant="body2">{al.irrigation_sources}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Additional Remarks:</Typography>
              <Typography variant="body2">{al.additional_remarks}</Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );

  const renderCultivationMode = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Preferred Cultivation Mode</Typography>
      {household.cultivation_mode?.map((cm: any, idx: number) => (
        <Grid container spacing={2} key={idx} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Preferred Method:</Typography>
              <Typography variant="body2">{cm.preferred_method}</Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );

  const renderTraditionalFarming = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Traditional Farming</Typography>
      {household.traditional_farming?.map((tf: any, idx: number) => (
        <Grid container spacing={2} key={idx} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Practices Traditional:</Typography>
              <Typography variant="body2">{tf.practices_traditional ? 'Yes' : 'No'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Traditional Crop Details:</Typography>
              <Typography variant="body2">{tf.traditional_crop_details}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Last Practiced Season:</Typography>
              <Typography variant="body2">{tf.last_practiced_season}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Interest Resume:</Typography>
              <Typography variant="body2">{tf.interest_resume ? 'Yes' : 'No'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Resume Mode:</Typography>
              <Typography variant="body2">{tf.resume_mode}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Additional Support:</Typography>
              <Typography variant="body2">{tf.additional_support}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Revival Budget:</Typography>
              <Typography variant="body2">{tf.revival_budget}</Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );

  const renderLivestockDetails = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Livestock & Poultry</Typography>
      {household.livestock_details?.map((ls: any, idx: number) => (
        <Grid container spacing={2} key={idx} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Animal Category:</Typography>
              <Typography variant="body2">{ls.animal_category}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Animal Count:</Typography>
              <Typography variant="body2">{ls.animal_count}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Breed Type:</Typography>
              <Typography variant="body2">{ls.breed_type}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Estimated Income:</Typography>
              <Typography variant="body2">{ls.estimated_income}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Additional Support:</Typography>
              <Typography variant="body2">{ls.additional_support}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Interest Training:</Typography>
              <Typography variant="body2">{ls.interest_training ? 'Yes' : 'No'}</Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );

  const renderFoodConsumption = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Food Consumption</Typography>
      {household.food_consumption?.map((fc: any, idx: number) => (
        <Grid container spacing={2} key={idx} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Food Item:</Typography>
              <Typography variant="body2">{fc.food_item}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Monthly Quantity:</Typography>
              <Typography variant="body2">{fc.monthly_quantity}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Unit:</Typography>
              <Typography variant="body2">{fc.unit}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Produced at Home:</Typography>
              <Typography variant="body2">{fc.produced_at_home ? 'Yes' : 'No'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Source Location:</Typography>
              <Typography variant="body2">{fc.source_location}</Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );

  const renderCashCrops = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Cash Crops</Typography>
      {household.cash_crops?.map((cc: any, idx: number) => (
        <Grid container spacing={2} key={idx} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Crop Name:</Typography>
              <Typography variant="body2">{cc.crop_name}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Number:</Typography>
              <Typography variant="body2">{cc.number}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Older Than 3 Years:</Typography>
              <Typography variant="body2">{cc.older_than_3_years ? 'Yes' : 'No'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Annual Income:</Typography>
              <Typography variant="body2">{cc.annual_income}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Additional Details:</Typography>
              <Typography variant="body2">{cc.additional_details}</Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );

  const renderForestResources = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Forest Resource Collection</Typography>
      {household.forest_resources?.map((fr: any, idx: number) => (
        <Grid container spacing={2} key={idx} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Product Name:</Typography>
              <Typography variant="body2">{fr.product_name}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Collection Days:</Typography>
              <Typography variant="body2">{fr.collection_days}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Quantity (kg):</Typography>
              <Typography variant="body2">{fr.quantity_kg}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Selling Price per Kg:</Typography>
              <Typography variant="body2">{fr.selling_price_per_kg}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Selling Place:</Typography>
              <Typography variant="body2">{fr.selling_place}</Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );

  const renderSocialIssues = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Social Issues</Typography>
      {household.social_issues?.map((si: any, idx: number) => (
        <Grid container spacing={2} key={idx} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Issue Type:</Typography>
              <Typography variant="body2">{si.issue_type}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Details:</Typography>
              <Typography variant="body2">{si.details}</Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );

  const renderWageEmployment = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Wage Employment Schemes</Typography>
      {household.wage_employment?.map((we: any, idx: number) => (
        <Grid container spacing={2} key={idx} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Workdays 2023-24:</Typography>
              <Typography variant="body2">{we.workdays_2023_24}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Distance to Job:</Typography>
              <Typography variant="body2">{we.distance_to_job}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Payment Mode:</Typography>
              <Typography variant="body2">{we.payment_mode}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Work Availability:</Typography>
              <Typography variant="body2">{we.work_availability}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Work Area Sector:</Typography>
              <Typography variant="body2">{we.work_area_sector}</Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );

  const renderLivelihoodOpportunities = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>New Livelihood Opportunities</Typography>
      {household.livelihood_opportunities?.map((lo: any, idx: number) => (
        <Grid container spacing={2} key={idx} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Member Name:</Typography>
              <Typography variant="body2">{lo.member_name}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Age:</Typography>
              <Typography variant="body2">{lo.age}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Work Skill Interest:</Typography>
              <Typography variant="body2">{lo.work_skill_interest}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Support Required:</Typography>
              <Typography variant="body2">{lo.support_required}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Expected Income:</Typography>
              <Typography variant="body2">{lo.expected_income}</Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );

  const renderArtsSports = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Arts & Sports Interest</Typography>
      {household.arts_sports?.map((as: any, idx: number) => (
        <Grid container spacing={2} key={idx} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Member Name:</Typography>
              <Typography variant="body2">{as.member_name}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Age:</Typography>
              <Typography variant="body2">{as.age}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Area of Interest:</Typography>
              <Typography variant="body2">{as.area_of_interest}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Additional Details:</Typography>
              <Typography variant="body2">{as.additional_details}</Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );

  const renderPublicInstitutions = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Public Institutions Access</Typography>
      {household.public_institutions?.map((pi: any, idx: number) => (
        <Grid container spacing={2} key={idx} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Institution Name:</Typography>
              <Typography variant="body2">{pi.institution_name}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Distance from Home:</Typography>
              <Typography variant="body2">{pi.distance_from_home}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Services Availed:</Typography>
              <Typography variant="body2">{pi.services_availed?.join(', ')}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Support Received:</Typography>
              <Typography variant="body2">{pi.support_received}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Satisfaction Level:</Typography>
              <Typography variant="body2">{pi.satisfaction_level}</Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );

  const renderPhoneConnectivity = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Phone Connectivity</Typography>
      {household.phone_connectivity?.map((pc: any, idx: number) => (
        <Grid container spacing={2} key={idx} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Has Phone:</Typography>
              <Typography variant="body2">{pc.has_phone ? 'Yes' : 'No'}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Mobile Numbers:</Typography>
              <Typography variant="body2">{pc.mobile_numbers}</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="subtitle2">Landline Number:</Typography>
              <Typography variant="body2">{pc.landline_number}</Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );

  const renderAdditionalInfo = () => (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h5" gutterBottom>Additional Information</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle2">Benefits Received:</Typography>
            <Typography variant="body2">{household.additional_info?.benefits_received}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle2">Additional Remarks:</Typography>
            <Typography variant="body2">{household.additional_info?.additional_remarks}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle2">Survey Comments:</Typography>
            <Typography variant="body2">{household.additional_info?.survey_comments}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );

  // --- Section Switch ---
  const renderSection = () => {
    switch (activeSection) {
      case 'basic':
        return renderBasicInfo();
      case 'members':
        return renderFamilyMembers();
      case 'migrant':
        return renderMigrantWorkers();
      case 'land':
        return renderLandAssets();
      case 'housing':
        return renderHousingDetails();
      case 'electrical':
        return renderElectricalFacilities();
      case 'sanitation':
        return renderSanitationFacilities();
      case 'water':
        return renderWaterSources();
      case 'waste':
        return renderWasteManagement();
      case 'health':
        return renderHealthConditions();
      case 'education':
        return renderEducationDetails();
      case 'employment':
        return renderEmploymentDetails();
      case 'entitlements':
        return renderEntitlements();
      case 'nutrition':
        return renderNutritionAccess();
      case 'transport':
        return renderTransportation();
      case 'shg':
        return renderSHGParticipation();
      case 'loans':
        return renderLoansDebts();
      case 'balasabha':
        return renderBalasabha();
      case 'childgroups':
        return renderChildGroups();
      case 'agriculture':
        return renderAgriculturalLand();
      case 'cultivation':
        return renderCultivationMode();
      case 'traditional':
        return renderTraditionalFarming();
      case 'livestock':
        return renderLivestockDetails();
      case 'food':
        return renderFoodConsumption();
      case 'cashcrops':
        return renderCashCrops();
      case 'forest':
        return renderForestResources();
      case 'social':
        return renderSocialIssues();
      case 'wage':
        return renderWageEmployment();
      case 'livelihood':
        return renderLivelihoodOpportunities();
      case 'arts':
        return renderArtsSports();
      case 'public':
        return renderPublicInstitutions();
      case 'phone':
        return renderPhoneConnectivity();
      case 'additional':
        return renderAdditionalInfo();
      default:
        return (
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>{sections.find(s => s.id === activeSection)?.name}</Typography>
            <Typography variant="body1">All fields for this section are displayed as per SRS specification.</Typography>
          </Paper>
        );
    }
  };

  return (
    <div className="detail-overlay">
      <div className="detail-modal">
        <div className="detail-header">
          <Typography variant="h4" gutterBottom>Household Details - {household.household_head_name}</Typography>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        
        <div className="detail-content">
          <div className="section-nav">
            {sections.map(section => (
              <button
                key={section.id}
                className={`section-nav-btn ${activeSection === section.id ? 'active' : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <span className="section-icon">{section.icon}</span>
                <Typography variant="body2">{section.name}</Typography>
              </button>
            ))}
          </div>
          
          <div className="section-display">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
}