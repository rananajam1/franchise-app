import React from "react";
import { getFranchiseFee } from "../../utils/helpers";

export default function SalesInfo({ sales }) {
  const totalSales = sales
    .reduce((partialSum, { total }) => partialSum + total, 0)
    .toFixed(2);

  const totalFee = sales.reduce(
    (partialSum, { total }) => partialSum + Number(getFranchiseFee(total)),
    0
  );
  return (
    <div>
      <h3>Total Sales: {totalSales}</h3>
      <h3>Total Fee: {totalFee}</h3>
    </div>
  );
}
