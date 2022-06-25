import { useAuth0 } from '@auth0/auth0-react';
import './App.scss';
import './Common/Common.scss';
import CustomNavbar from './Common/CustomNavbar';
import Dashboard from './Common/Dashboard/Dashboard';
import LoadingScreen from './Common/LoadingScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReactGA from 'react-ga';
ReactGA.initialize('G-64D995T32R');
// ReactGA.initialize('UA-000000-01');
ReactGA.pageview(window.location.pathname + window.location.search);
// import ReactGA from 'react-ga4';

// ReactGA.initialize('G-64D995T32R');
// ReactGA.send('pageview');

function App() {
    const { isLoading } = useAuth0();
    return (
        <div className="App">
            <BrowserRouter>
                <CustomNavbar />
                {isLoading ? (
                    <LoadingScreen />
                ) : (
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                    </Routes>
                )}
            </BrowserRouter>
        </div>
    );
}

export default App;
