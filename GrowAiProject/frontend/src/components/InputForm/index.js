import { useState } from "react";
import './index.css'

const InputForm = ({setBusinessData, setIsLoading}) => {
    const [name, setName] = useState('')
    const [location, setLocation] = useState('');

    const submitFun = async (e) => {
        e.preventDefault()
        setIsLoading(true);
        // const URL = 'http://localhost:3001/business-data'
        const URL = 'https://headlinegen-backend.onrender.com/business-data'
        
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                location
            })
        }

        const res = await fetch(URL, option)

        const data = await res.json()
        setBusinessData({...data, name, location})
        setIsLoading(false);
    };

    return (
    <form onSubmit={submitFun} className="form">
      <input
        type="text"
        placeholder="Business Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={e => setLocation(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default InputForm;