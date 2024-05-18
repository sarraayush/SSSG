import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import DataPage from './componants/Datapage'; // Import DataPage component
import Header from './componants/Header'; // Make sure to import Header if it exists
import UploadFile from './componants/Uploadfile'; // Import UploadFile component

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<UploadFile />} />
          <Route path="/data" element={<DataPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
