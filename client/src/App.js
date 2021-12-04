import { Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './components/Home';
import About from './components/About';
import CreateEntry from './components/CreateEntry';
import EntryDetails from './components/EntryDetails';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/entries/create" element={<CreateEntry />} />
          <Route path="/entries/details/:id" element={<EntryDetails />} />
      </Routes>
    </div>
  );
}

export default App;
