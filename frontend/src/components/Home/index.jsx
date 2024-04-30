import React, {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const user = localStorage.getItem("token");
console.log(user)
const Home = () => {
    const [file, setFile] = useState(null);
    const [topic, setTopic] = useState("");
    const navigate = useNavigate();
    const [uploads, setUploads] = useState(null);
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    };
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            toast.error('No file selected', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            return; 
        }

        const formData = new FormData();
        formData.append("file", file); 
        for (var pair of formData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/upload/', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json',
                    
                },
            });
            const result = await response.json();
            if (response.ok) {
                toast.info('File uploaded successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                console.log(result);
                navigate("/result/" + result.result_id);
            } else {
                throw new Error(result.message || "An error occurred while uploading the file");
            }
        } catch (error) {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
        }
    };
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
            <div className="mt-3">
                <h2 className="font-semibold text-2xl">Click upload to detect Lie on the go!</h2>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <label htmlFor="topicInput">
                        <input type="text" id="topicInput" placeholder="Enter Topic" className="border hover:bg-gray-100 text-black text-sm px-4 py-2.5 rounded w-max mx-auto block font-[sans-serif] my-5" onChange={e => setTopic(e.target.value)} />
                    </label>
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
                        Choose File
                        <input type="file" id='uploadFile1' className="hidden" accept=".csv" onChange={handleFileChange} />
                    </label>
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-max mx-auto block my-5">Upload</button>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Home;
