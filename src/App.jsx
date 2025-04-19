import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg';
import './App.css';
import DataGridComponent from "./DataGridComponent.jsx";


function App() {
  const [count, setCount] = useState(0)
  const [apiData, setApiData] = useState(null) // State to store API data
  const [loading, setLoading] = useState(true) // State to handle loading

  useEffect(() => {
    // Replace with your API URL
    const apiUrl = 'https://dssfrodna1.execute-api.us-east-1.amazonaws.com/test/v1-test'

    // Fetch data from the API
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setApiData(data[0]) // Store the data in state
        setLoading(false) // Set loading to false
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setLoading(false) // Set loading to false even on error
      })
  }, []) // Empty dependency array ensures this runs once when the component mounts

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      {/* Display API data */}
      <div className="api-data">
        {loading ? (
          <p>Loading...</p>
        ) : apiData ? (
          <div>
            <h2>API Data:</h2>
            <p><strong>Title:</strong> {apiData.user_createdby}</p>
            <p><strong>Body:</strong> {apiData.user_loginid}</p>
          </div>
        ) : (
          <p>Error loading data.</p>
        )}
          <DataGridComponent />
      </div>
    </>
  )
}

export default App
