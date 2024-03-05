// const user = localStorage.getItem("token");
import React from "react";
const Home = () => {
    return (
        <div className="flex-col">
            <h1 className="font-semibold text-5xl">Hey there!</h1>
            <div className="mt-6">
                <h2 className="font-semibold text-2xl">Your recent uploads</h2>
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
                        <tr className="group">
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
                        <tr className="group">
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
                        <tr className="group">
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
            <div className="mt-3">
                <h2 className="font-semibold text-2xl">Click upload to detect Lie on the go!</h2>
                <form className="mt-6">
                    <label htmlFor="uploadFile1" 
                        className="bg-gray-800 hover:bg-gray-700 text-white text-sm px-4 py-2.5 outline-none rounded w-max cursor-pointer mx-auto block font-[sans-serif] my-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 mr-2 fill-white inline" viewBox="0 0 32 32">
                            <path
                                d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                                data-original="#000000" />
                            <path
                                d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                                data-original="#000000" />
                        </svg>
                        Upload
                        <input type="file" id='uploadFile1' className="hidden"  accept=".csv" />
                    </label>
                </form>
            </div>
        </div>
    );
};

export default Home;
