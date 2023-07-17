import React from "react";
import { Doughnut } from "react-chartjs-2";
// const url1 = 'http://localhost:8080/api/showAllRecords/1'  //el 1 es id
// const url2 = 'http://localhost:8080/api/showTodayRecords/1'
// const url3 = 'http://localhost:8080/api/showMonthRecords/1'
// const url4 = 'http://localhost:8080/api/showWeekRecords/1'


// fetch()
//   .then(res => res.json())
//   .then(data => console.log(data))
//   .catch(err => console.log(err))
const data = {
  labels: ["Red", "Green", "Blue"],
  datasets: [
    {
      data: [3, 4, 5],
      backgroundColor: ["red", "green", "blue"],
    },
  ],
};

const options = {
  responsive: true,
};

export default function GraficoDonut() {
  return <Doughnut data={data} options={options} />;
}
