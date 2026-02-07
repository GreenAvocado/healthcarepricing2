import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NationalPage from './pages/NationalPage';
import StatesPage from './pages/StatesPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<NationalPage />} />
            <Route path="/states" element={<StatesPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        <footer className="border-t border-slate-800/50 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-xs text-slate-600">
            <p>PollTracker — 2028 US Election Polling Aggregator</p>
            <p className="mt-1">
              Data is for illustrative purposes. Polls are not predictions.
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
