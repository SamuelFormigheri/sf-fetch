import { useEffect, useState } from 'react'
import { fetchWithCache, resetCache, clearCache } from './lib/sf-fetch';

const URL = "https://api.github.com/users/SamuelFormigheri";

function App() {
  const [dt, setData] = useState({});

  async function fetchData() {
    await fetchWithCache(URL, 60000)
      .then(async (response) => {
        const dateHeader = response.headers.get(`date`);
        console.log(dateHeader);
        const data = await response.json();
        setData(data);
      });
  }

  useEffect(() => { fetchData(); }, []);

  return (
    <div className="App">
      <h3>Open dev tools to check the cached request</h3>
      <button type="button" onClick={resetCache}>
        Reset cache
      </button>

      <button type="button" onClick={() => clearCache(URL)}>
        Clear cache
      </button>

      <div style={{ marginTop: "16px" }}>
        {JSON.stringify(dt, null, 2)}
      </div>
    </div>
  )
}

export default App
