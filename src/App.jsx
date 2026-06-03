import React, { useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import WeddingCard from './components/WeddingCard';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading ? (
        <LoadingScreen onFinished={() => setIsLoading(false)} />
      ) : (
        <WeddingCard />
      )}
    </>
  );
}

export default App;

