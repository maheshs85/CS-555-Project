import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
const user = localStorage.getItem("token");
console.log(user);
const History = () => {
  const navigate = useNavigate();
  const [uploads, setUploads] = useState(null);
  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/uploads/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        setUploads(data);
      } catch (e) {
        console.error("Error fetching data:", e);
        // setError(e.message);
      }
    };
    fetchResults();
  }, []);
  return (
    <div className="flex-col">
      <div className="mt-6">
        <h2 className="font-semibold text-2xl">Your Uploads</h2>
        <table className="mt-2 hidden min-w-full rounded-md text-gray-900 md:table">
          <thead className="rounded-md bg-gray-50 text-left text-sm font-normal">
            <tr>
              <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                Date
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                EEG Data
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Topic
              </th>
              <th scope="col" className="px-3 py-5 font-medium">
                Accuracy
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 text-gray-900">
            {uploads && uploads.map(upload => {
              return (
                <tr key={upload._id.$oid} className="group cursor-pointer"
                  onClick={() => {
                    navigate("/result/" + upload._id.$oid);
                  }}>
                  <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                    {upload.date}
                  </td>
                  <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                    {upload.filename}
                  </td>
                  <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                    {upload.accuracy}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
