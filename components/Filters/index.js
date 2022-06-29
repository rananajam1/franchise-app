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
    applyFilters(sales);
  }, [selectedFranchisee, selectedLocation]);

  const applyFilters = React.useCallback(
    (array) => {
      let filteredSales = array;

      if (!!selectedFranchisee?.value) {
        filteredSales = _.filter(filteredSales, {
          franchisee_id: selectedFranchisee?.value,
        });
      }

      if (!!selectedLocation?.value) {
        filteredSales = _.filter(filteredSales, {
          location_id: selectedLocation?.value,
        });
      }

      setSales(filteredSales);
    },
    [selectedFranchisee, selectedLocation, setSales]
  );

  return (
    <div>
      <p>Date</p>
      <ReactDatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
      />
      <p>Franchisee</p>
      <Select
        isClearable
        value={selectedFranchisee}
        onChange={(franchisee) => setSelectedFranchisee(franchisee)}
        options={franchiseeDdo}
      />
      <p>Location</p>
      <Select
        isClearable
        value={selectedLocation}
        onChange={(location) => setSelectedLocation(location)}
        options={locationDdo}
      />
    </div>
  );
}
