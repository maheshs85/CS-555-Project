import { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto'
const Result = () => {
  const [eegData, setEegData] = useState([]);
  const [truthCount, setTruthCount] = useState("")
  const [falseCount, setFalseCount] = useState("")
  useEffect(() => {
    fetch('/simulated_eeg_data.json')
      .then(response => response.json())
      .then(data => {
        setEegData(data);
        const counts = data.reduce((counter, row) => {
          if (row.label === 'Truth') {
            counter.truth++;
          }
          else {
            counter.lie++;
          }
          return counter;
        }, { truth: 0, lie: 0 })
        setTruthCount(counts.truth)
        setFalseCount(counts.lie)
      });
  }, []);
  const data = {
    labels: ['Truth', 'False'],
    datasets: [
      {
        label: 'Count',
        backgroundColor: ['blue', 'red'],
        borderWidth: 1,
        hoverBackgroundColor: ['#4c64c7', '#bf5a5a'],
        hoverBorderColor: ['#2E7D32', '#C62828'],
        data: [truthCount, falseCount]
      }
    ]
  };
  return (
    <div className="container mx-auto py-3">
      <h1 className="text-2xl font-bold mb-4">EEG Data Result</h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Channel 1</th>
              <th className="px-4 py-2">Channel 2</th>
              <th className="px-4 py-2">Channel 3</th>
              <th className="px-4 py-2">Channel 4</th>
              <th className="px-4 py-2">Label</th>
            </tr>
          </thead>
          <tbody>
            {eegData.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                <td className="border px-4 py-2">{row.time}</td>
                <td className="border px-4 py-2">{row.channel1}</td>
                <td className="border px-4 py-2">{row.channel2}</td>
                <td className="border px-4 py-2">{row.channel3}</td>
                <td className="border px-4 py-2">{row.channel4}</td>
                <td className="border px-4 py-2">{row.label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-1/2 mx-auto">
        <Bar data={data} />
      </div>
    </div>
  );
};

export default Result;