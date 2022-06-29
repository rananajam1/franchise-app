import React from "react";
import DataTable from "react-data-table-component";
import {
  columns,
  findFranchiseeByID,
  findLocationByID,
  getFranchiseFee,
} from "../../utils/helpers";

export default function Table({ sales = [] }) {
  const salesData = sales.map(
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
  return <DataTable columns={columns} data={salesData} />;
}
