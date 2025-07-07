import './App.css';
import { useState } from 'react';
import InputForm from './components/InputForm';
import DisplayCard from './components/DisplayCard';

function App() {
  const [businessData, setBusinessData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="container">
      <h1>Local Business Dashboard</h1>
      <InputForm setBusinessData={setBusinessData} setIsLoading={setIsLoading} />

      {isLoading && <div className="spinner"></div>}


      {!isLoading && businessData && (
        <DisplayCard data={businessData} setBusinessData={setBusinessData} setIsLoading={setIsLoading} />
      )}
      
    </div>
  );
}

export default App;
