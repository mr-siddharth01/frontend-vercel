import { useState, useEffect } from "react";

const App = () => {
  const [temp, setTemp] = useState('');
  const [city, setCity] = useState('');
  const [value, setValue] = useState('');
 
  const click = async(city)=>{
    const response = await fetch(`/api?city=${city}`);
    const data = await response.json();
    setTemp(data.main.temp)
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>📡 Backend Status</h1>
      <div style={{
        background: '#f0f0f0',
        padding: '1rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <strong>Message from server:</strong> <span>{temp || 'Loading...'}</span>
      </div>
       <input placeholder="Search City" type="text" onChange={(e)=>setValue(e.target.value)} value={value}/>
       <button onClick={()=>click(value)}>Fetch</button>
    </div>
  );
};

export default App;