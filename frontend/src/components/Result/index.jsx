import { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const Result = () => {
  const [eegData, setEegData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [rowsToDisplay, setRowsToDisplay] = useState(10);
  const [truthCount, setTruthCount] = useState(0);
  const [falseCount, setFalseCount] = useState(0);

  useEffect(() => {
    fetch('/eeg_data_labeled.json')
      .then(response => response.json())
      .then(data => {
        setEegData(data); 
        setDisplayData(data.slice(0, rowsToDisplay)); 
        const counts = data.reduce((counter, row) => {
          if (row.label === 'Truth') {
            counter.truth++;
          } else {
            counter.lie++;
          }
          return counter;
        }, { truth: 0, lie: 0 });
        setTruthCount(counts.truth);
        setFalseCount(counts.lie);
      });
  }, []);

  const handleRowChange = (e) => {
    setRowsToDisplay(Number(e.target.value));
  };

  const handleLoadMore = () => {
    setDisplayData(eegData.slice(0, rowsToDisplay));
  };

  const chartData = {
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
      
      <div>
        <label htmlFor="rowsToShow">Select number of rows to be displayed:</label>
        <select id="rowsToShow" value={rowsToDisplay} onChange={handleRowChange}>
          {[5,10, 20, 50, 100, 500, 1000].map((number) => (
            <option key={number} value={number}>
              {number}
            </option>
          ))}
        </select>
        <button onClick={handleLoadMore}>Load More</button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Index</th>
              <th className="px-4 py-2">EEG.AF3</th>
              <th className="px-4 py-2">EEG.T7</th>
              <th className="px-4 py-2">EEG.Pz</th>
              <th className="px-4 py-2">EEG.T8</th>
              <th className="px-4 py-2">EEG.AF4</th>
              <th className="px-4 py-2">Label</th>
            </tr>
          </thead>
          <tbody>
            {displayData.map((row, index) => ( 
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{row['EEG.AF3']}</td>
                <td className="border px-4 py-2">{row['EEG.T7']}</td>
                <td className="border px-4 py-2">{row['EEG.Pz']}</td>
                <td className="border px-4 py-2">{row['EEG.T8']}</td>
                <td className="border px-4 py-2">{row['EEG.AF4']}</td>
                <td className="border px-4 py-2">{row.label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="w-1/2 mx-auto">
        <Bar data={chartData} />
      </div>
    </div>
  );
};

export default Result;