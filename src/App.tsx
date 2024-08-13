import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
//import UserAgreement from './components/UserAgreement';
//import PrivacyPolicy from './components/PrivacyPolicy';
//import Sitemap from './components/Sitemap';

const App: React.FC = () => {
  //const loggedIn = false;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/user-agreement" element={<UserAgreement />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/sitemap" element={<Sitemap />} /> */}
      </Routes>
    </Router>
  )
}

export default App
