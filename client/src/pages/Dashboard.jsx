import axios from 'axios'
import React, { useEffect, useState } from 'react'



const Dashboard = () => {
  const [data,setData] = useState('')
    
  const fetchProtectedData = async () => {
      const token = localStorage.getItem('token');
      try {
          const response = await axios.get('http://localhost:3000/protected', {
              headers: { Authorization: `Bearer ${token}` }
          });
          console.log(response.data);
          setData(response.data.message)
      } catch (err) {
          console.error('Access denied. Please log in again.');
      }
  };

  useEffect(()=>{
      fetchProtectedData()
  },[])



  return (
    <div>
      Dashboard - {data}
    </div>
  )
}

export default Dashboard
