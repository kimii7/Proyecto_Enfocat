import { useMemo } from "react";
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler, 
  Tooltip, 
  Legend,

} from "chart.js";




ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler, 
  Tooltip, 
  Legend,
  );


import { Line } from "react-chartjs-2";

const url1 = 'http://localhost:8080/api/showAllRecords/1'  //el 1 es id
const url2 = 'http://localhost:8080/api/showTodayRecords/1'
const url3 = 'http://localhost:8080/api/showMonthRecords/1'
const url4 = 'http://localhost:8080/api/showWeekRecords/1'


fetch(url1)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err))

const score = [1,3,4,5,5,5,6,6,1];
const scores2 = [1,4,6,7,2,4,5,6];
const labels = [100, 200, 300, 400, 500, 600, 700];
const options = {
  fill: true,
  responsive: true,
  scales: {
    y: {
      min: 0,
    },
  },
}

export default function Grafico(){
  const data = useMemo(function(){
    return {
      datasets: [
        {
          label: 'mis datos',
          data: score,
          tension: 0.4,
          borderColor: '#81A684',
          pointRadius: 6,
          pointBackgroundColor: '#0E0F19',
          backgroundColor: 'rgba(135, 165, 255, 0.3)'
        },
        {
          label: 'mis datos2',
          data: scores2,
          tension: 0.4,
          borderColor: '#81A684',
          pointRadius: 6,
          pointBackgroundColor: '#0E0F19',
          backgroundColor: 'rgba(135, 31, 255, 0.2)'
        }
      ],
      labels,
    };
  },[]);
  return <Line data={data} options={options}/>
}
