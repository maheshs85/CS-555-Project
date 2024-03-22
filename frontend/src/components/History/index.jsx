import { useNavigate } from "react-router-dom";
const user = localStorage.getItem("token");
console.log(user);
const History = () => {
  const navigate = useNavigate();
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
            <tr
              className="group cursor-pointer"
              onClick={() => {
                navigate("/result");
              }}
            >
              <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                01/01/2024
              </td>
              <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                EEGdata.csv
              </td>
              <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                Liewaves
              </td>
              <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                97.5%
              </td>
            </tr>
            <tr
              className="group cursor-pointer"
              onClick={() => {
                navigate("/result");
              }}
            >
              <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                01/01/2024
              </td>
              <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                EEGdata.csv
              </td>
              <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                Liewaves
              </td>
              <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                97.5%
              </td>
            </tr>
            <tr
              className="group cursor-pointer"
              onClick={() => {
                navigate("/result");
              }}
            >
              <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                01/01/2024
              </td>
              <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                EEGdata.csv
              </td>
              <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                Liewaves
              </td>
              <td className="whitespace-nowrap bg-white px-4 py-5 text-sm group-first-of-type:rounded-md group-last-of-type:rounded-md">
                97.5%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default History;
