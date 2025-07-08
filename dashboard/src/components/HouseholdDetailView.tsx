'use client';

import { useState } from 'react';

interface HouseholdDetailViewProps {
  household: any;
  onClose: () => void;
}

export default function HouseholdDetailView({ household, onClose }: HouseholdDetailViewProps) {
  const [activeSection, setActiveSection] = useState('basic');

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
    <div className="section-content">
      <h3>Basic Household Information</h3>
      <div className="info-grid">
        <div className="info-item">
          <label>Head of Family:</label>
          <span>{household.household_head_name}</span>
        </div>
        <div className="info-item">
          <label>Address:</label>
          <span>{household.address}</span>
        </div>
        <div className="info-item">
          <label>Post Office:</label>
          <span>{household.post_office}</span>
        </div>
        <div className="info-item">
          <label>Colony/Settlement:</label>
          <span>{household.colony_settlement_name}</span>
        </div>
        <div className="info-item">
          <label>Category:</label>
          <span>{household.category}</span>
        </div>
        <div className="info-item">
          <label>Micro Plan Number:</label>
          <span>{household.micro_plan_number}</span>
        </div>
        <div className="info-item">
          <label>Grama Panchayat:</label>
          <span>{household.grama_panchayat}</span>
        </div>
        <div className="info-item">
          <label>Ward Number:</label>
          <span>{household.ward_number}</span>
        </div>
        <div className="info-item">
          <label>House Number:</label>
          <span>{household.house_number}</span>
        </div>
        <div className="info-item">
          <label>Family Members:</label>
          <span>{household.family_members_count}</span>
        </div>
      </div>
    </div>
  );

  const renderFamilyMembers = () => (
    <div className="section-content">
      <h3>Family Member Details</h3>
      <div className="members-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Relation</th>
              <th>Education</th>
              <th>Occupation</th>
              <th>Aadhaar</th>
              <th>Bank Account</th>
            </tr>
          </thead>
          <tbody>
            {household.members?.map((member: any, index: number) => (
              <tr key={index}>
                <td>{member.name}</td>
                <td>{member.age}</td>
                <td>{member.gender}</td>
                <td>{member.relation_to_head}</td>
                <td>{member.general_education_level}</td>
                <td>{member.occupation_sector}</td>
                <td>{member.has_aadhaar ? 'Yes' : 'No'}</td>
                <td>{member.bank_account ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // --- SRS Section Renderers ---
  const renderMigrantWorkers = () => (
    <div className="section-content">
      <h3>Migrant Worker Details</h3>
      <table className="info-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Place</th>
            <th>Work Sector</th>
            <th>Skills/Expertise</th>
            <th>Employment Duration</th>
            <th>Additional Details</th>
          </tr>
        </thead>
        <tbody>
          {household.migrant_workers?.map((mw: any, idx: number) => (
            <tr key={idx}>
              <td>{mw.name}</td>
              <td>{mw.place}</td>
              <td>{mw.work_sector}</td>
              <td>{mw.skills_expertise}</td>
              <td>{mw.employment_duration}</td>
              <td>{mw.additional_details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderLandAssets = () => (
    <div className="section-content">
      <h3>Land & House Information</h3>
      <h4>Land Assets</h4>
      <table className="info-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Ownership</th>
            <th>Area (acres)</th>
            <th>Documentation</th>
          </tr>
        </thead>
        <tbody>
          {household.land_assets?.map((la: any, idx: number) => (
            <tr key={idx}>
              <td>{la.land_type}</td>
              <td>{la.ownership_type}</td>
              <td>{la.area_in_acres}</td>
              <td>{la.documentation_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4>Govt Scheme Houses</h4>
      <table className="info-table">
        <thead>
          <tr>
            <th>Owner Name</th>
            <th>Scheme</th>
            <th>Allotted By</th>
            <th>Area</th>
            <th>Year Built</th>
            <th>Sanctioned Amount</th>
            <th>Installments</th>
            <th>Amount Received</th>
            <th>Balance Amount</th>
          </tr>
        </thead>
        <tbody>
          {household.govt_scheme_houses?.map((gsh: any, idx: number) => (
            <tr key={idx}>
              <td>{gsh.owner_name}</td>
              <td>{gsh.scheme}</td>
              <td>{gsh.allotted_by}</td>
              <td>{gsh.area}</td>
              <td>{gsh.year_built}</td>
              <td>{gsh.sanctioned_amount}</td>
              <td>{gsh.installments}</td>
              <td>{gsh.amount_received}</td>
              <td>{gsh.balance_amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderHousingDetails = () => (
    <div className="section-content">
      <h3>Physical Structure Details</h3>
      {household.housing_details?.map((hd: any, idx: number) => (
        <div key={idx} className="info-grid">
          <div className="info-item"><label>Completion Status:</label> <span>{hd.completion_status}</span></div>
          <div className="info-item"><label>Age of House:</label> <span>{hd.age_of_house}</span></div>
          <div className="info-item"><label>Current Condition:</label> <span>{hd.current_condition}</span></div>
          <div className="info-item"><label>Roof Material:</label> <span>{hd.roof_material}</span></div>
          <div className="info-item"><label>Roof Condition:</label> <span>{hd.roof_condition}</span></div>
          <div className="info-item"><label>Roof Budget:</label> <span>{hd.roof_budget}</span></div>
          <div className="info-item"><label>Wall Material:</label> <span>{hd.wall_material}</span></div>
          <div className="info-item"><label>Wall Condition:</label> <span>{hd.wall_condition}</span></div>
          <div className="info-item"><label>Wall Budget:</label> <span>{hd.wall_budget}</span></div>
          <div className="info-item"><label>Floor Material:</label> <span>{hd.floor_material}</span></div>
          <div className="info-item"><label>Floor Needs Repair:</label> <span>{hd.floor_needs_repair ? 'Yes' : 'No'}</span></div>
          <div className="info-item"><label>Floor Budget:</label> <span>{hd.floor_budget}</span></div>
          <div className="info-item"><label>Door Condition:</label> <span>{hd.door_condition}</span></div>
          <div className="info-item"><label>Good Doors Count:</label> <span>{hd.good_doors_count}</span></div>
          <div className="info-item"><label>Window Condition:</label> <span>{hd.window_condition}</span></div>
          <div className="info-item"><label>Good Windows Count:</label> <span>{hd.good_windows_count}</span></div>
          <div className="info-item"><label>Door/Window Budget:</label> <span>{hd.door_window_budget}</span></div>
          <div className="info-item"><label>Kitchen Ventilation:</label> <span>{hd.kitchen_ventilation}</span></div>
          <div className="info-item"><label>Kitchen Appliances:</label> <span>{hd.kitchen_appliances?.join(', ')}</span></div>
          <div className="info-item"><label>Kitchen Budget:</label> <span>{hd.kitchen_budget}</span></div>
        </div>
      ))}
    </div>
  );

  const renderElectricalFacilities = () => (
    <div className="section-content">
      <h3>Electrical & Lighting</h3>
      {household.electrical_facilities?.map((ef: any, idx: number) => (
        <div key={idx} className="info-grid">
          <div className="info-item"><label>Electrified:</label> <span>{ef.is_electrified ? 'Yes' : 'No'}</span></div>
          <div className="info-item"><label>Has Connection:</label> <span>{ef.has_connection ? 'Yes' : 'No'}</span></div>
          <div className="info-item"><label>Wiring Complete:</label> <span>{ef.wiring_complete}</span></div>
          <div className="info-item"><label>Wiring Safe:</label> <span>{ef.wiring_safe}</span></div>
          <div className="info-item"><label>Cooking Fuel:</label> <span>{ef.cooking_fuel}</span></div>
          <div className="info-item"><label>Stove Type:</label> <span>{ef.stove_type}</span></div>
          <div className="info-item"><label>Bulbs Count:</label> <span>{ef.bulbs_count}</span></div>
          <div className="info-item"><label>Bulb Types:</label> <span>{ef.bulb_types?.join(', ')}</span></div>
          <div className="info-item"><label>Has Solar:</label> <span>{ef.has_solar ? 'Yes' : 'No'}</span></div>
          <div className="info-item"><label>Solar Usage:</label> <span>{ef.solar_usage}</span></div>
          <div className="info-item"><label>Solar Condition:</label> <span>{ef.solar_condition}</span></div>
          <div className="info-item"><label>Additional Comments:</label> <span>{ef.additional_comments}</span></div>
          <div className="info-item"><label>Estimated Budget:</label> <span>{ef.estimated_budget}</span></div>
        </div>
      ))}
    </div>
  );

  const renderSanitationFacilities = () => (
    <div className="section-content">
      <h3>Sanitation & Bathroom</h3>
      {household.sanitation_facilities?.map((sf: any, idx: number) => (
        <div key={idx} className="info-grid">
          <div className="info-item"><label>Has Toilet:</label> <span>{sf.has_toilet ? 'Yes' : 'No'}</span></div>
          <div className="info-item"><label>Has Bathroom:</label> <span>{sf.has_bathroom ? 'Yes' : 'No'}</span></div>
          <div className="info-item"><label>All Use Toilet:</label> <span>{sf.all_use_toilet ? 'Yes' : 'No'}</span></div>
          <div className="info-item"><label>Uses Public Toilet:</label> <span>{sf.uses_public_toilet ? 'Yes' : 'No'}</span></div>
          <div className="info-item"><label>Satisfied with Public:</label> <span>{sf.satisfied_with_public ? 'Yes' : 'No'}</span></div>
          <div className="info-item"><label>Public Toilet Quality:</label> <span>{sf.public_toilet_quality}</span></div>
          <div className="info-item"><label>Distance to Water:</label> <span>{sf.distance_to_water}</span></div>
          <div className="info-item"><label>Toilet Tank Type:</label> <span>{sf.toilet_tank_type}</span></div>
          <div className="info-item"><label>Toilet Closet Type:</label> <span>{sf.toilet_closet_type}</span></div>
          <div className="info-item"><label>Toilet Roof Material:</label> <span>{sf.toilet_roof_material}</span></div>
          <div className="info-item"><label>Toilet Wall Type:</label> <span>{sf.toilet_wall_type}</span></div>
          <div className="info-item"><label>Toilet Door Type:</label> <span>{sf.toilet_door_type}</span></div>
          <div className="info-item"><label>Toilet Floor Type:</label> <span>{sf.toilet_floor_type}</span></div>
          <div className="info-item"><label>Water Availability:</label> <span>{sf.water_availability}</span></div>
          <div className="info-item"><label>Additional Notes:</label> <span>{sf.additional_notes}</span></div>
          <div className="info-item"><label>Estimated Budget:</label> <span>{sf.estimated_budget}</span></div>
        </div>
      ))}
    </div>
  );

  const renderWaterSources = () => (
    <div className="section-content">
      <h3>Water Source & Management</h3>
      {household.water_sources?.map((ws: any, idx: number) => (
        <div key={idx} className="info-grid">
          <div className="info-item"><label>Has Conservation:</label> <span>{ws.has_conservation ? 'Yes' : 'No'}</span></div>
          <div className="info-item"><label>Conservation Methods:</label> <span>{ws.conservation_methods}</span></div>
          <div className="info-item"><label>Has Storage Tank:</label> <span>{ws.has_storage_tank ? 'Yes' : 'No'}</span></div>
          <div className="info-item"><label>Source Type:</label> <span>{ws.source_type}</span></div>
          <div className="info-item"><label>Ownership:</label> <span>{ws.ownership}</span></div>
          <div className="info-item"><label>Availability:</label> <span>{ws.availability}</span></div>
          <div className="info-item"><label>Quality:</label> <span>{ws.quality}</span></div>
          <div className="info-item"><label>Collection Method:</label> <span>{ws.collection_method}</span></div>
          <div className="info-item"><label>Additional Remarks:</label> <span>{ws.additional_remarks}</span></div>
          <div className="info-item"><label>Estimated Budget:</label> <span>{ws.estimated_budget}</span></div>
        </div>
      ))}
    </div>
  );

  const renderWasteManagement = () => (
    <div className="section-content">
      <h3>Waste Management</h3>
      {household.waste_management?.map((wm: any, idx: number) => (
        <div key={idx} className="info-grid">
          <div className="info-item"><label>Solid Waste Facility:</label> <span>{wm.solid_waste_facility}</span></div>
          <div className="info-item"><label>Liquid Waste Facility:</label> <span>{wm.liquid_waste_facility}</span></div>
          <div className="info-item"><label>Wastewater Handling:</label> <span>{wm.wastewater_handling}</span></div>
          <div className="info-item"><label>Additional Remarks:</label> <span>{wm.additional_remarks}</span></div>
          <div className="info-item"><label>Estimated Budget:</label> <span>{wm.estimated_budget}</span></div>
        </div>
      ))}
    </div>
  );

  const renderHealthConditions = () => (
    <div className="section-content">
      <h3>Health Conditions</h3>
      <table className="info-table">
        <thead>
          <tr>
            <th>Member Name</th>
            <th>Health Condition</th>
            <th>Place of Treatment</th>
            <th>Additional Details</th>
            <th>Estimated Budget</th>
          </tr>
        </thead>
        <tbody>
          {household.health_conditions?.map((hc: any, idx: number) => (
            <tr key={idx}>
              <td>{hc.member_name}</td>
              <td>{hc.health_condition}</td>
              <td>{hc.place_of_treatment}</td>
              <td>{hc.additional_details}</td>
              <td>{hc.estimated_budget}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderEducationDetails = () => (
    <div className="section-content">
      <h3>Education Information</h3>
      <table className="info-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Class/Grade</th>
            <th>School/Institution</th>
            <th>Issues Faced</th>
            <th>Dropout</th>
            <th>Dropout Age</th>
            <th>Last Class</th>
            <th>Dropout Year</th>
            <th>Dropout Reason</th>
            <th>Reentry Budget</th>
            <th>Additional Remarks</th>
            <th>Estimated Budget</th>
          </tr>
        </thead>
        <tbody>
          {household.education_details?.map((ed: any, idx: number) => (
            <tr key={idx}>
              <td>{ed.student_name}</td>
              <td>{ed.class_grade}</td>
              <td>{ed.school_institution}</td>
              <td>{ed.issues_faced}</td>
              <td>{ed.is_dropout ? 'Yes' : 'No'}</td>
              <td>{ed.dropout_age}</td>
              <td>{ed.last_class}</td>
              <td>{ed.dropout_year}</td>
              <td>{ed.dropout_reason}</td>
              <td>{ed.reentry_budget}</td>
              <td>{ed.additional_remarks}</td>
              <td>{ed.estimated_budget}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderEmploymentDetails = () => (
    <div className="section-content">
      <h3>Employment & Registration</h3>
      <table className="info-table">
        <thead>
          <tr>
            <th>Member Name</th>
            <th>Age</th>
            <th>Employment Exchange</th>
            <th>Registered PSC</th>
            <th>DWMS</th>
            <th>Additional Details</th>
          </tr>
        </thead>
        <tbody>
          {household.employment_details?.map((em: any, idx: number) => (
            <tr key={idx}>
              <td>{em.member_name}</td>
              <td>{em.age}</td>
              <td>{em.employment_exchange}</td>
              <td>{em.registered_psc ? 'Yes' : 'No'}</td>
              <td>{em.dwms}</td>
              <td>{em.additional_details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderEntitlements = () => (
    <div className="section-content">
      <h3>Entitlements & Identity Documents</h3>
      {household.entitlements?.map((en: any, idx: number) => (
        <div key={idx} className="info-grid">
          <div className="info-item"><label>Land Ownership Document:</label> <span>{en.land_ownership_document ? 'Yes' : 'No'}</span></div>
          <div className="info-item"><label>Ration Card Available:</label> <span>{en.ration_card_available ? 'Yes' : 'No'}</span></div>
          <div className="info-item"><label>Ration Card Type:</label> <span>{en.ration_card_type}</span></div>
          <div className="info-item"><label>Health Insurance:</label> <span>{en.health_insurance ? 'Yes' : 'No'}</span></div>
          <div className="info-item"><label>Employee Card:</label> <span>{en.employee_card ? 'Yes' : 'No'}</span></div>
          <div className="info-item"><label>Homeless Support Scheme:</label> <span>{en.homeless_support_scheme ? 'Yes' : 'No'}</span></div>
          <div className="info-item"><label>Remarks:</label> <span>{en.remarks}</span></div>
        </div>
      ))}
    </div>
  );

  const renderNutritionAccess = () => (
    <div className="section-content">
      <h3>Nutrition Access</h3>
      {household.nutrition_access?.map((na: any, idx: number) => (
        <div key={idx} className="info-grid">
          <div className="info-item"><label>Source of Support:</label> <span>{na.source_of_support}</span></div>
          <div className="info-item"><label>Ration Shop Receiving:</label> <span>{na.ration_shop_receiving ? 'Yes' : 'No'}</span></div>
          <div className="info-item"><label>Ration Items:</label> <span>{na.ration_items?.map((item: any) => `${item.name} (${item.quantity} ${item.unit})`).join(', ')}</span></div>
          <div className="info-item"><label>Anganwadi Receiving:</label> <span>{na.anganwadi_receiving ? 'Yes' : 'No'}</span></div>
          <div className="info-item"><label>Anganwadi Items:</label> <span>{na.anganwadi_items?.map((item: any) => `${item.name} (${item.quantity} ${item.unit})`).join(', ')}</span></div>
          <div className="info-item"><label>Tribal Dept Receiving:</label> <span>{na.tribal_dept_receiving ? 'Yes' : 'No'}</span></div>
          <div className="info-item"><label>Tribal Dept Items:</label> <span>{na.tribal_dept_items?.map((item: any) => `${item.name} (${item.quantity} ${item.unit})`).join(', ')}</span></div>
          <div className="info-item"><label>Vathil Padi Receiving:</label> <span>{na.vathil_padi_receiving ? 'Yes' : 'No'}</span></div>
          <div className="info-item"><label>Vathil Padi Items:</label> <span>{na.vathil_padi_items?.map((item: any) => `${item.name} (${item.quantity} ${item.unit})`).join(', ')}</span></div>
        </div>
      ))}
    </div>
  );

  const renderTransportation = () => (
    <div className="section-content">
      <h3>Transportation Facilities</h3>
      {household.transportation?.map((tr: any, idx: number) => (
        <div key={idx} className="info-grid">
          <div className="info-item"><label>Access Path Type:</label> <span>{tr.access_path_type}</span></div>
          <div className="info-item"><label>Distance to Main Road:</label> <span>{tr.distance_to_main_road}</span></div>
          <div className="info-item"><label>Path Condition:</label> <span>{tr.path_condition}</span></div>
          <div className="info-item"><label>Vehicle Owned:</label> <span>{tr.vehicle_owned}</span></div>
          <div className="info-item"><label>Additional Notes:</label> <span>{tr.additional_notes}</span></div>
        </div>
      ))}
    </div>
  );

  const renderSHGParticipation = () => (
    <div className="section-content">
      <h3>SHG Participation</h3>
      {household.shg_participation?.map((shg: any, idx: number) => (
        <div key={idx} className="info-grid">
          <div className="info-item"><label>Member Name:</label> <span>{shg.member_name}</span></div>
          <div className="info-item"><label>Group Name:</label> <span>{shg.group_name}</span></div>
          <div className="info-item"><label>Years Membership:</label> <span>{shg.years_membership}</span></div>
          <div className="info-item"><label>Additional Details:</label> <span>{shg.additional_details}</span></div>
        </div>
      ))}
    </div>
  );

  const renderLoansDebts = () => (
    <div className="section-content">
      <h3>Loans & Debts</h3>
      {household.loans_debts?.map((ld: any, idx: number) => (
        <div key={idx} className="info-grid">
          <div className="info-item"><label>Source:</label> <span>{ld.source}</span></div>
          <div className="info-item"><label>Purpose:</label> <span>{ld.purpose}</span></div>
          <div className="info-item"><label>Year Taken:</label> <span>{ld.year_taken}</span></div>
          <div className="info-item"><label>Total Amount:</label> <span>{ld.total_amount}</span></div>
          <div className="info-item"><label>Interest Rate:</label> <span>{ld.interest_rate}</span></div>
          <div className="info-item"><label>Repayment Frequency:</label> <span>{ld.repayment_frequency}</span></div>
          <div className="info-item"><label>Monthly Repayment:</label> <span>{ld.monthly_repayment}</span></div>
          <div className="info-item"><label>Outstanding Balance:</label> <span>{ld.outstanding_balance}</span></div>
          <div className="info-item"><label>Additional Remarks:</label> <span>{ld.additional_remarks}</span></div>
        </div>
      ))}
    </div>
  );

  const renderBalasabha = () => (
    <div className="section-content">
      <h3>Balasabha Participation</h3>
      {household.balasabha_participation?.map((b: any, idx: number) => (
        <div key={idx} className="info-grid">
          <div className="info-item"><label>Has Children Members:</label> <span>{b.has_children_members ? 'Yes' : 'No'}</span></div>
          <div className="info-item"><label>Children Count:</label> <span>{b.children_count}</span></div>
        </div>
      ))}
    </div>
  );

  const renderChildGroups = () => (
    <div className="section-content">
      <h3>Child-Focused Groups</h3>
      {household.child_groups?.map((cg: any, idx: number) => (
        <div key={idx} className="info-grid">
          <div className="info-item"><label>Organization Name:</label> <span>{cg.organization_name}</span></div>
          <div className="info-item"><label>Child Participants:</label> <span>{cg.child_participants}</span></div>
          <div className="info-item"><label>Role/Activity:</label> <span>{cg.role_activity}</span></div>
          <div className="info-item"><label>Additional Notes:</label> <span>{cg.additional_notes}</span></div>
        </div>
      ))}
    </div>
  );

  const renderAgriculturalLand = () => (
    <div className="section-content">
      <h3>Agricultural Land & Irrigation</h3>
      {household.agricultural_land?.map((al: any, idx: number) => (
        <div key={idx} className="info-grid">
          <div className="info-item"><label>Land Type:</label> <span>{al.land_type}</span></div>
          <div className="info-item"><label>Total Cultivated Area:</label> <span>{al.total_cultivated_area}</span></div>
          <div className="info-item"><label>Unused Area:</label> <span>{al.unused_area}</span></div>
          <div className="info-item"><label>High Water Area:</label> <span>{al.high_water_area}</span></div>
          <div className="info-item"><label>Medium Water Area:</label> <span>{al.medium_water_area}</span></div>
          <div className="info-item"><label>Irrigation Sources:</label> <span>{al.irrigation_sources}</span></div>
          <div className="info-item"><label>Additional Remarks:</label> <span>{al.additional_remarks}</span></div>
        </div>
      ))}
    </div>
  );

  const renderCultivationMode = () => (
    <div className="section-content">
      <h3>Preferred Cultivation Mode</h3>
      {household.cultivation_mode?.map((cm: any, idx: number) => (
        <div key={idx} className="info-grid">
          <div className="info-item"><label>Preferred Method:</label> <span>{cm.preferred_method}</span></div>
        </div>
      ))}
    </div>
  );

  const renderTraditionalFarming = () => (
    <div className="section-content">
      <h3>Traditional Farming</h3>
      {household.traditional_farming?.map((tf: any, idx: number) => (
        <div key={idx} className="info-grid">
          <div className="info-item"><label>Practices Traditional:</label> <span>{tf.practices_traditional ? 'Yes' : 'No'}</span></div>
          <div className="info-item"><label>Traditional Crop Details:</label> <span>{tf.traditional_crop_details}</span></div>
          <div className="info-item"><label>Last Practiced Season:</label> <span>{tf.last_practiced_season}</span></div>
          <div className="info-item"><label>Interest Resume:</label> <span>{tf.interest_resume ? 'Yes' : 'No'}</span></div>
          <div className="info-item"><label>Resume Mode:</label> <span>{tf.resume_mode}</span></div>
          <div className="info-item"><label>Additional Support:</label> <span>{tf.additional_support}</span></div>
          <div className="info-item"><label>Revival Budget:</label> <span>{tf.revival_budget}</span></div>
        </div>
      ))}
    </div>
  );

  const renderLivestockDetails = () => (
    <div className="section-content">
      <h3>Livestock & Poultry</h3>
      {household.livestock_details?.map((ls: any, idx: number) => (
        <div key={idx} className="info-grid">
          <div className="info-item"><label>Animal Category:</label> <span>{ls.animal_category}</span></div>
          <div className="info-item"><label>Animal Count:</label> <span>{ls.animal_count}</span></div>
          <div className="info-item"><label>Breed Type:</label> <span>{ls.breed_type}</span></div>
          <div className="info-item"><label>Estimated Income:</label> <span>{ls.estimated_income}</span></div>
          <div className="info-item"><label>Additional Support:</label> <span>{ls.additional_support}</span></div>
          <div className="info-item"><label>Interest Training:</label> <span>{ls.interest_training ? 'Yes' : 'No'}</span></div>
        </div>
      ))}
    </div>
  );

  const renderFoodConsumption = () => (
    <div className="section-content">
      <h3>Food Consumption</h3>
      {household.food_consumption?.map((fc: any, idx: number) => (
        <div key={idx} className="info-grid">
          <div className="info-item"><label>Food Item:</label> <span>{fc.food_item}</span></div>
          <div className="info-item"><label>Monthly Quantity:</label> <span>{fc.monthly_quantity}</span></div>
          <div className="info-item"><label>Unit:</label> <span>{fc.unit}</span></div>
          <div className="info-item"><label>Produced at Home:</label> <span>{fc.produced_at_home ? 'Yes' : 'No'}</span></div>
          <div className="info-item"><label>Source Location:</label> <span>{fc.source_location}</span></div>
        </div>
      ))}
    </div>
  );

  const renderCashCrops = () => (
    <div className="section-content">
      <h3>Cash Crops</h3>
      {household.cash_crops?.map((cc: any, idx: number) => (
        <div key={idx} className="info-grid">
          <div className="info-item"><label>Crop Name:</label> <span>{cc.crop_name}</span></div>
          <div className="info-item"><label>Number:</label> <span>{cc.number}</span></div>
          <div className="info-item"><label>Older Than 3 Years:</label> <span>{cc.older_than_3_years ? 'Yes' : 'No'}</span></div>
          <div className="info-item"><label>Annual Income:</label> <span>{cc.annual_income}</span></div>
          <div className="info-item"><label>Additional Details:</label> <span>{cc.additional_details}</span></div>
        </div>
      ))}
    </div>
  );

  const renderForestResources = () => (
    <div className="section-content">
      <h3>Forest Resource Collection</h3>
      {household.forest_resources?.map((fr: any, idx: number) => (
        <div key={idx} className="info-grid">
          <div className="info-item"><label>Product Name:</label> <span>{fr.product_name}</span></div>
          <div className="info-item"><label>Collection Days:</label> <span>{fr.collection_days}</span></div>
          <div className="info-item"><label>Quantity (kg):</label> <span>{fr.quantity_kg}</span></div>
          <div className="info-item"><label>Selling Price per Kg:</label> <span>{fr.selling_price_per_kg}</span></div>
          <div className="info-item"><label>Selling Place:</label> <span>{fr.selling_place}</span></div>
        </div>
      ))}
    </div>
  );

  const renderSocialIssues = () => (
    <div className="section-content">
      <h3>Social Issues</h3>
      {household.social_issues?.map((si: any, idx: number) => (
        <div key={idx} className="info-grid">
          <div className="info-item"><label>Issue Type:</label> <span>{si.issue_type}</span></div>
          <div className="info-item"><label>Details:</label> <span>{si.details}</span></div>
        </div>
      ))}
    </div>
  );

  const renderWageEmployment = () => (
    <div className="section-content">
      <h3>Wage Employment Schemes</h3>
      {household.wage_employment?.map((we: any, idx: number) => (
        <div key={idx} className="info-grid">
          <div className="info-item"><label>Workdays 2023-24:</label> <span>{we.workdays_2023_24}</span></div>
          <div className="info-item"><label>Distance to Job:</label> <span>{we.distance_to_job}</span></div>
          <div className="info-item"><label>Payment Mode:</label> <span>{we.payment_mode}</span></div>
          <div className="info-item"><label>Work Availability:</label> <span>{we.work_availability}</span></div>
          <div className="info-item"><label>Work Area Sector:</label> <span>{we.work_area_sector}</span></div>
        </div>
      ))}
    </div>
  );

  const renderLivelihoodOpportunities = () => (
    <div className="section-content">
      <h3>New Livelihood Opportunities</h3>
      {household.livelihood_opportunities?.map((lo: any, idx: number) => (
        <div key={idx} className="info-grid">
          <div className="info-item"><label>Member Name:</label> <span>{lo.member_name}</span></div>
          <div className="info-item"><label>Age:</label> <span>{lo.age}</span></div>
          <div className="info-item"><label>Work Skill Interest:</label> <span>{lo.work_skill_interest}</span></div>
          <div className="info-item"><label>Support Required:</label> <span>{lo.support_required}</span></div>
          <div className="info-item"><label>Expected Income:</label> <span>{lo.expected_income}</span></div>
        </div>
      ))}
    </div>
  );

  const renderArtsSports = () => (
    <div className="section-content">
      <h3>Arts & Sports Interest</h3>
      {household.arts_sports?.map((as: any, idx: number) => (
        <div key={idx} className="info-grid">
          <div className="info-item"><label>Member Name:</label> <span>{as.member_name}</span></div>
          <div className="info-item"><label>Age:</label> <span>{as.age}</span></div>
          <div className="info-item"><label>Area of Interest:</label> <span>{as.area_of_interest}</span></div>
          <div className="info-item"><label>Additional Details:</label> <span>{as.additional_details}</span></div>
        </div>
      ))}
    </div>
  );

  const renderPublicInstitutions = () => (
    <div className="section-content">
      <h3>Public Institutions Access</h3>
      {household.public_institutions?.map((pi: any, idx: number) => (
        <div key={idx} className="info-grid">
          <div className="info-item"><label>Institution Name:</label> <span>{pi.institution_name}</span></div>
          <div className="info-item"><label>Distance from Home:</label> <span>{pi.distance_from_home}</span></div>
          <div className="info-item"><label>Services Availed:</label> <span>{pi.services_availed?.join(', ')}</span></div>
          <div className="info-item"><label>Support Received:</label> <span>{pi.support_received}</span></div>
          <div className="info-item"><label>Satisfaction Level:</label> <span>{pi.satisfaction_level}</span></div>
        </div>
      ))}
    </div>
  );

  const renderPhoneConnectivity = () => (
    <div className="section-content">
      <h3>Phone Connectivity</h3>
      {household.phone_connectivity?.map((pc: any, idx: number) => (
        <div key={idx} className="info-grid">
          <div className="info-item"><label>Has Phone:</label> <span>{pc.has_phone ? 'Yes' : 'No'}</span></div>
          <div className="info-item"><label>Mobile Numbers:</label> <span>{pc.mobile_numbers}</span></div>
          <div className="info-item"><label>Landline Number:</label> <span>{pc.landline_number}</span></div>
        </div>
      ))}
    </div>
  );

  const renderAdditionalInfo = () => (
    <div className="section-content">
      <h3>Additional Information</h3>
      <div className="info-grid">
        <div className="info-item"><label>Benefits Received:</label> <span>{household.additional_info?.benefits_received}</span></div>
        <div className="info-item"><label>Additional Remarks:</label> <span>{household.additional_info?.additional_remarks}</span></div>
        <div className="info-item"><label>Survey Comments:</label> <span>{household.additional_info?.survey_comments}</span></div>
      </div>
    </div>
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
          <div className="section-content">
            <h3>{sections.find(s => s.id === activeSection)?.name}</h3>
            <p>All fields for this section are displayed as per SRS specification.</p>
          </div>
        );
    }
  };

  return (
    <div className="detail-overlay">
      <div className="detail-modal">
        <div className="detail-header">
          <h2>Household Details - {household.household_head_name}</h2>
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
                <span className="section-name">{section.name}</span>
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