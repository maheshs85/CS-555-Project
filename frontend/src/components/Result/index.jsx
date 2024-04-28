import { useState, useEffect } from "react";

const Result = () => {
  const [resultData, setResultData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/results/latest');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setResultData(data);
      } catch (e) {
        console.error("Error fetching data:", e);
        setError(e.message);
      }
    };

    fetchResults();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!resultData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-3">
      <h1 className="text-2xl font-bold mb-4">EEG Data Results</h1>
      <div key={resultData.result_id} className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Results</h2>
        {resultData.prediction_distribution_image && (
          <div>
            <h3 className="font-semibold">Prediction Distribution</h3>
            <img src={`data:image/png;base64,${resultData.prediction_distribution_image}`} alt="Prediction Distribution" style={{ width: '100%' }} />
          </div>
        )}
        <p>Accuracy: {resultData.accuracy}</p>
        <p>Precision: {resultData.precision}</p>
        <p>Recall: {resultData.recall}</p>
        <p>F1-Score: {resultData['f1-score']}</p>
        {resultData.confusion_matrix_image && (
          <div>
            <h3 className="font-semibold">Confusion Matrix</h3>
            <img src={`data:image/png;base64,${resultData.confusion_matrix_image}`} alt="Confusion Matrix" style={{ width: '100%' }} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Result;
