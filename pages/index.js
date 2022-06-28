import React from "react";
import styles from "../styles/Home.module.css";
import { sales } from "../data/sales";
import moment from "moment";
import DataTable from "react-data-table-component";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import {
  franchiseeDdo,
  locationDdo,
  columns,
  findFranchiseeByID,
  findLocationByID,
  getFranchiseFee,
} from "../utils/helpers";
import { DEFAULT_DATE_FORMAT } from "../utils/datetime";
import _ from "lodash";

var date = new Date();
var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

export default function Home() {
  const [selectedDate, setSelectedDate] = React.useState(firstDay);
  const [selectedFranchisee, setSelectedFranchisee] = React.useState("");
  const [selectedLocation, setSelectedLocation] = React.useState("");

  const salesByDate = sales.filter(
    ({ date }) =>
      moment(selectedDate).format(DEFAULT_DATE_FORMAT) ===
      moment(date).format(DEFAULT_DATE_FORMAT)
  );

  function filterArray(array, filters) {
    const filterKeys = Object.keys(filters);
    return array.filter((item) => {
      return filterKeys.every((key) => {
        if (typeof filters[key] !== "function") {
          return true;
        }

        return filters[key](item[key]);
      });
    });
  }

  const query = {
    franchisee_id: (id) => id === selectedFranchisee?.value,
    location_id: (id) => id === selectedLocation?.value,
  };

  const filteredArray = filterArray(salesByDate, query);

  const allSalesData = filteredArray.length ? filteredArray : salesByDate;

  const totalSales = allSalesData.reduce(
    (partialSum, { total }) => partialSum + total,
    0
  );

  const totalFee = allSalesData.reduce(
    (partialSum, { total }) => partialSum + getFranchiseFee(total),
    0
  );

  const salesData = allSalesData?.map(
    ({ _id, franchisee_id, location_id, date, subtotal, tax, total }) => ({
      _id,
      franchisee: findFranchiseeByID(franchisee_id),
      location: findLocationByID(location_id),
      date,
      subtotal,
      tax,
      total,
      fee: getFranchiseFee(total),
      location_id,
      franchisee_id,
    })
  );

  return (
    <div className={styles.container}>
      Date
      <ReactDatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
      />
      Franchisee
      <Select
        value={selectedFranchisee}
        onChange={(franchisee) => setSelectedFranchisee(franchisee)}
        options={franchiseeDdo}
      />
      Location
      <Select
        value={selectedLocation}
        onChange={(location) => setSelectedLocation(location)}
        options={locationDdo}
      />
      <h3>Total Sales: {totalSales}</h3>
      <h3>Total Fee: {totalFee}</h3>
      <DataTable columns={columns} data={salesData} />
    </div>
  );
}
