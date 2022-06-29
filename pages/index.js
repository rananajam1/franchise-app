import React from "react";
import styles from "../styles/Home.module.css";
import moment from "moment";
import { DEFAULT_DATE_FORMAT } from "../utils/datetime";
import { sales as data } from "../data/sales";
import Filters from "../components/Filters";
import SalesInfo from "../components/SalesInfo";
import Table from "../components/Table";
import "react-datepicker/dist/react-datepicker.css";

var date = new Date();
var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

export default function Home() {
  const [sales, setSales] = React.useState(data);
  const [selectedDate, setSelectedDate] = React.useState(firstDay);

  const salesByDate = sales.filter(
    ({ date }) =>
      moment(selectedDate).format(DEFAULT_DATE_FORMAT) ===
      moment(date).format(DEFAULT_DATE_FORMAT)
  );

  return (
    <div className={styles.container}>
      <Filters
        sales={salesByDate}
        setSales={setSales}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <SalesInfo sales={salesByDate} />
      <Table sales={salesByDate} />
    </div>
  );
}
