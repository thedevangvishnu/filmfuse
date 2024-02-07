import { useEffect } from "react";

import fetchDataFromApi from "./utils/api";

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchDataFromApi("/movie/popular");
      console.log(response.data);
    };

    fetchData();
  }, []);

  return <h1>FilmFuse</h1>;
}

export default App;
