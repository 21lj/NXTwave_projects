import { useState } from 'react';
import './index.css'
import ResumeUploader from './components/ResumeUploader';
import PastResumesTable from './components/PastResumesTable';

function App() {
  const [activeTab, setActiveTab] = useState('upload'); // State to manage active tab

  return (
    <div className="App">
      <header className="app-header">
        <h1>Resume Analyzer</h1>
      </header>

      <nav className="tabs">
        <button
          className={activeTab === 'upload' ? 'tab-button active' : 'tab-button'}
          onClick={() => setActiveTab('upload')}
        >
          Resume Analysis
        </button>
        <button
          className={activeTab === 'history' ? 'tab-button active' : 'tab-button'}
          onClick={() => setActiveTab('history')}
        >
          Historical Viewer
        </button>
      </nav>

      <main className="tab-content">
        {activeTab === 'upload' && <ResumeUploader />}
        {activeTab === 'history' && <PastResumesTable />}
      </main>
    </div>
  );
}

export default App;