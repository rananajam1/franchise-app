import { franchisees } from "../data/franchisees";
import { locations } from "../data/locations";

export const franchiseeDdo = franchisees.map(
  ({ _id, first_name, last_name }) => ({
    label: `${first_name} ${last_name}`,
    value: _id,
  })
);

export const locationDdo = locations.map(({ _id, address }) => ({
  label: address,
  value: _id,
}));

export const findLocationByID = (id) => {
  const { address } = locations.find(({ _id }) => id === _id);

  return address;
};

export const findFranchiseeByID = (id) => {
  const { first_name, last_name } = franchisees.find(({ _id }) => id === _id);

  return `${first_name} ${last_name}`;
};

export const getFranchiseFee = (total) => Number(Math.round(total * 0.1));

export const columns = [
  {
    name: "Date",
    selector: ({ date }) => date,
  },
  {
    name: "Location",
    selector: ({ location }) => location,
  },
  {
    name: "Franchisee",
    selector: ({ franchisee }) => franchisee,
  },
  {
    name: "Total",
    selector: ({ total }) => total,
  },
  {
    name: "Tax",
    selector: ({ tax }) => tax,
  },
  {
    name: "Subtotal",
    selector: ({ subtotal }) => subtotal,
  },
  {
    name: "Franchise Fee",
    selector: ({ fee }) => fee,
    style: { color: "green" },
  },
];
