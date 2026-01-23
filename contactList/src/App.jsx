import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <p className='text-xl text-red-800'>Hello TailwindCSS</p>
    </>
  );
}

export default App;
