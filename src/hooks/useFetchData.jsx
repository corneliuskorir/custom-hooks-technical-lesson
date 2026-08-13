import chalk from "chalk";
import { useEffect, useState } from "react";

function useFetchData(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    console.log(chalk.blue(`Fetching datat from url ${url}`));

    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error("Failed to fetch");

      const result = await response.json();
      console.log(chalk.green("Data fetched successfully!", result));
      setData(result);
    } catch (error) {
      console.log(chalk.red("Error fetching data:"), error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, refetch: fetchData };
}

export default useFetchData;
