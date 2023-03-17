import { useEffect, useState } from 'react'
import { fetchWithCache, getResponseDate, clearAllCache, clearCache } from './lib/sf-fetch';

const URL = "https://api.github.com/users/SamuelFormigheri";

function App() {
  const [dt, setData] = useState({});

  async function fetchData() {
    await fetchWithCache(URL, 60000)
      .then(async (response) => {
        console.log(getResponseDate(response));
        const data = await response.json();
        setData(data);
      });
  }

  useEffect(() => { fetchData(); }, []);

  return (
    <div className="App">
      <h3>Open dev tools to check the cached request</h3>
      <button type="button" onClick={() => clearAllCache()}>
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
