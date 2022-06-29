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
