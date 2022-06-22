import { useAuth0 } from '@auth0/auth0-react';
import './App.scss';
import './Common/Common.scss';
import CustomNavbar from './Common/CustomNavbar';
import Dashboard from './Common/Dashboard/Dashboard';
import LoadingScreen from './Common/LoadingScreen';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
