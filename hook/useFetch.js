/* import {useState, useEffect} from 'react';
import axios from 'axios';

const useFetch = (endpoint, query) =>{
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const axios = require('axios');

const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      "X-RapidAPI-Key": '0295baa309msh88d2f94ce86d7d3p1c1c0fjsn9a50eb93aea7',
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };


const fetchData = async ()=>{
    setIsLoading(true);

    try{
        const response = await axios.request(options);

        setData(response.data.data);
        setIsLoading(false);

    }catch(error){
        setError(error);
        alert('There is an error')

    }finally{
        setIsLoading(false);
    }
}

useEffect(()=> {
    fetchData();
}, []);

const refetch = () => {  //refetches data if neccessary
    setIsLoading(true);
    fetchData();
}

return {data, isLoading, error, refetch };

};

export default useFetch; */

import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
    //   "X-RapidAPI-Key": '0295baa309msh88d2f94ce86d7d3p1c1c0fjsn9a50eb93aea7',
      "X-RapidAPI-Key": 'KJwZZIJSFimshuivMSVGaiYzkRomp15f2vKjsnK4bKzuUzVLzA',
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;