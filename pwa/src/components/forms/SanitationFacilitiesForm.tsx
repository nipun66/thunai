import React from 'react';

type SanitationFacility = {
  hasToilet: boolean;
  hasBathroom: boolean;
  allUseToilet: boolean;
  usesPublicToilet: boolean;
  satisfiedWithPublic: boolean;
  publicToiletQuality: string;
  distanceToWater: number;
  toiletTankType: string;
  toiletClosetType: string;
  toiletRoofMaterial: string;
  toiletWallType: string;
  toiletDoorType: string;
  toiletFloorType: string;
  waterAvailability: string;
  additionalNotes: string;
  estimatedBudget: number;
};

type Props = {
  householdData: any;
  onChange: (section: string, field: string, value: any) => void;
};

const SanitationFacilitiesForm: React.FC<Props> = ({ householdData, onChange }) => (
  <div className="form-section">
    <h2>🚽 Sanitation and Bathroom Facilities</h2>
    <div className="form-grid">
      <div className="form-group">
        <label>Is there a toilet in the house?</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="hasToilet"
              checked={householdData.sanitationFacilities.hasToilet}
              onChange={() => onChange('sanitationFacilities', 'hasToilet', true)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="hasToilet"
              checked={!householdData.sanitationFacilities.hasToilet}
              onChange={() => onChange('sanitationFacilities', 'hasToilet', false)}
            />
            No
          </label>
        </div>
      </div>
      <div className="form-group">
        <label>Is there a bathroom in the house?</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="hasBathroom"
              checked={householdData.sanitationFacilities.hasBathroom}
              onChange={() => onChange('sanitationFacilities', 'hasBathroom', true)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="hasBathroom"
              checked={!householdData.sanitationFacilities.hasBathroom}
              onChange={() => onChange('sanitationFacilities', 'hasBathroom', false)}
            />
            No
          </label>
        </div>
      </div>
      <div className="form-group">
        <label>Do all family members use the toilet?</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="allUseToilet"
              checked={householdData.sanitationFacilities.allUseToilet}
              onChange={() => onChange('sanitationFacilities', 'allUseToilet', true)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="allUseToilet"
              checked={!householdData.sanitationFacilities.allUseToilet}
              onChange={() => onChange('sanitationFacilities', 'allUseToilet', false)}
            />
            No
          </label>
        </div>
      </div>
      <div className="form-group">
        <label>Is the family using a public/shared toilet?</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="usesPublicToilet"
              checked={householdData.sanitationFacilities.usesPublicToilet}
              onChange={() => onChange('sanitationFacilities', 'usesPublicToilet', true)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="usesPublicToilet"
              checked={!householdData.sanitationFacilities.usesPublicToilet}
              onChange={() => onChange('sanitationFacilities', 'usesPublicToilet', false)}
            />
            No
          </label>
        </div>
      </div>
      <div className="form-group">
        <label>Are family members satisfied with the public toilet?</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="satisfiedWithPublic"
              checked={householdData.sanitationFacilities.satisfiedWithPublic}
              onChange={() => onChange('sanitationFacilities', 'satisfiedWithPublic', true)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="satisfiedWithPublic"
              checked={!householdData.sanitationFacilities.satisfiedWithPublic}
              onChange={() => onChange('sanitationFacilities', 'satisfiedWithPublic', false)}
            />
            No
          </label>
        </div>
      </div>
      <div className="form-group">
        <label>Quality of public/shared toilet used</label>
        <select
          value={householdData.sanitationFacilities.publicToiletQuality}
          onChange={(e) => onChange('sanitationFacilities', 'publicToiletQuality', e.target.value)}
        >
          <option value="">Select Quality</option>
          <option value="Good">Good</option>
          <option value="Satisfactory">Satisfactory</option>
          <option value="Poor">Poor</option>
          <option value="Very Poor">Very Poor</option>
        </select>
      </div>
      <div className="form-group">
        <label>Distance from toilet tank to nearest water source (meters)</label>
        <input
          type="number"
          value={householdData.sanitationFacilities.distanceToWater}
          onChange={(e) => onChange('sanitationFacilities', 'distanceToWater', parseInt(e.target.value) || 0)}
          placeholder="Enter distance in meters"
          min="0"
        />
      </div>
      <div className="form-group">
        <label>Toilet Tank Type</label>
        <select
          value={householdData.sanitationFacilities.toiletTankType}
          onChange={(e) => onChange('sanitationFacilities', 'toiletTankType', e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="Single Pit">Single Pit</option>
          <option value="Twin Pit">Twin Pit</option>
          <option value="Septic Tank">Septic Tank</option>
        </select>
      </div>
      <div className="form-group">
        <label>Toilet Closet Type</label>
        <select
          value={householdData.sanitationFacilities.toiletClosetType}
          onChange={(e) => onChange('sanitationFacilities', 'toiletClosetType', e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="Indian">Indian</option>
          <option value="European">European</option>
        </select>
      </div>
      <div className="form-group">
        <label>Roof Material</label>
        <select
          value={householdData.sanitationFacilities.toiletRoofMaterial}
          onChange={(e) => onChange('sanitationFacilities', 'toiletRoofMaterial', e.target.value)}
        >
          <option value="">Select Material</option>
          <option value="Concrete">Concrete</option>
          <option value="Tile">Tile</option>
          <option value="Sheet">Sheet</option>
          <option value="Others">Others</option>
        </select>
      </div>
      <div className="form-group">
        <label>Wall Type</label>
        <select
          value={householdData.sanitationFacilities.toiletWallType}
          onChange={(e) => onChange('sanitationFacilities', 'toiletWallType', e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="Tile">Tile</option>
          <option value="Concrete">Concrete</option>
          <option value="Temporary">Temporary</option>
        </select>
      </div>
      <div className="form-group">
        <label>Door Type</label>
        <select
          value={householdData.sanitationFacilities.toiletDoorType}
          onChange={(e) => onChange('sanitationFacilities', 'toiletDoorType', e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="Wooden">Wooden</option>
          <option value="PVC">PVC</option>
          <option value="GI">GI</option>
          <option value="Sheet">Sheet</option>
          <option value="Temporary">Temporary</option>
        </select>
      </div>
      <div className="form-group">
        <label>Floor Type</label>
        <select
          value={householdData.sanitationFacilities.toiletFloorType}
          onChange={(e) => onChange('sanitationFacilities', 'toiletFloorType', e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="Tile">Tile</option>
          <option value="Cement">Cement</option>
          <option value="Concrete">Concrete</option>
          <option value="Temporary">Temporary</option>
        </select>
      </div>
      <div className="form-group">
        <label>Water Availability</label>
        <select
          value={householdData.sanitationFacilities.waterAvailability}
          onChange={(e) => onChange('sanitationFacilities', 'waterAvailability', e.target.value)}
        >
          <option value="">Select</option>
          <option value="Inside">Inside</option>
          <option value="Nearby">Nearby</option>
          <option value="Far Away">Far Away</option>
          <option value="Needs to be carried">Needs to be carried</option>
        </select>
      </div>
      <div className="form-group full-width">
        <label>Additional Notes</label>
        <textarea
          value={householdData.sanitationFacilities.additionalNotes}
          onChange={(e) => onChange('sanitationFacilities', 'additionalNotes', e.target.value)}
          placeholder="Describe toilet/bathroom condition"
        />
      </div>
      <div className="form-group">
        <label>Estimated Budget</label>
        <input
          type="number"
          value={householdData.sanitationFacilities.estimatedBudget}
          onChange={(e) => onChange('sanitationFacilities', 'estimatedBudget', parseInt(e.target.value) || 0)}
          placeholder="Enter estimated budget"
          min="0"
        />
      </div>
    </div>
  </div>
);

export default SanitationFacilitiesForm; 