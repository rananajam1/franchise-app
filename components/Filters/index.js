import _ from "lodash";
import React from "react";
import ReactDatePicker from "react-datepicker";
import Select from "react-select";
import { franchiseeDdo, locationDdo } from "../../utils/ddo";

export default function Filters({
  sales,
  setSales,
  selectedDate,
  setSelectedDate,
}) {
  const [selectedFranchisee, setSelectedFranchisee] = React.useState(null);
  const [selectedLocation, setSelectedLocation] = React.useState(null);

  React.useEffect(() => {
    setSales(getFilteredData(sales));
  }, [selectedFranchisee, selectedLocation]);

  const getFilteredData = (array) => {
    let filtered = array;

    if (!!selectedFranchisee?.value) {
      filtered = _.filter(filtered, {
        franchisee_id: selectedFranchisee?.value,
      });
    }

    if (!!selectedLocation?.value) {
      filtered = _.filter(filtered, { location_id: selectedLocation?.value });
    }

    return filtered;
  };

  return (
    <div>
      <p>Date</p>
      <ReactDatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
      />
      <p>Franchisee</p>
      <Select
        value={selectedFranchisee}
        onChange={(franchisee) => setSelectedFranchisee(franchisee)}
        options={franchiseeDdo}
      />
      <p>Location</p>
      <Select
        value={selectedLocation}
        onChange={(location) => setSelectedLocation(location)}
        options={locationDdo}
      />
    </div>
  );
}
