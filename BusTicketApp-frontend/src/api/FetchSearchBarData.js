import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/HeroPage/SearchBar';
import LoadingPage from '../pages/LoadingPage';

export default function FetchSearchBarData(params) {
  const [data, setData] = useState(null);

  const apiURL = 'http://127.0.0.1:8000/api/allstops';

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(apiURL);
      setData(result);
    };
    fetchData();
  }, []);

  if (data === null) return <LoadingPage />;

  return <SearchBar data={data.data} params={params} />;
}
