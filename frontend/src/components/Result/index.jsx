import React from "react";

const DemoEEGData = [
  { time: "00:00", value: 0.5 },
  { time: "00:01", value: 0.7 },
  { time: "00:02", value: 0.8 },
  { time: "00:03", value: 0.6 },
];

const Result = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">EEG Data Result</h1>
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-4">
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
              {DemoEEGData.map((data, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : ""}
                >
                  <td className="border px-4 py-2">{data.time}</td>
                  <td className="border px-4 py-2">{data.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Result;
