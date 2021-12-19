import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import ErrorBoundary from './Components/common/ErrorBoundary'
import Navigation from './Components/Navigation';
import Home from './Components/Home';
import Footer from './Components/Footer';
import Jobs from './Components/jobs/Jobs';
import CreateJob from './Components/jobs/CreateJob';
import EditJob from './Components/jobs/EditJob';
import Candidates from './Components/candidates/Candidates';
import CreateCandidate from './Components/candidates/CreateCandidate';
import EditCandidate from './Components/candidates/CreateCandidate';
import { CandidateProvider } from './contexts/CandidatesContext.js';
import { JobsProvider } from './contexts/JobsContext.js';
import Interviews from './Components/interviews/Interviews';
import CreateInterview from './Components/interviews/CreateInterview';
import EditInterview from './Components/interviews/EditInterview';


import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <CandidateProvider>
      <JobsProvider>
      <AuthProvider>
        <Router>
        <Navigation />
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/create" element={<CreateJob />} />
              <Route path="/jobs/edit/:jobId" element={<EditJob />} />
              <Route path="/candidates" element={<Candidates />} />
              <Route path="/candidates/create" element={<CreateCandidate />} />
              <Route path="/candidates/edit/:candidateId" element={<EditCandidate />} />
              <Route path="/interviews" element={<Interviews />} />
              <Route path="/interviews/create" element={<CreateInterview />} />
              <Route path="/interviews/edit/:interviewId" element={<EditInterview />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
      </JobsProvider>
      </CandidateProvider>
    </ErrorBoundary>
  );
}

export default App;
