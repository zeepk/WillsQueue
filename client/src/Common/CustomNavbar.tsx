import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
export default function CustomNavbar() {
    const { isAuthenticated, logout, user } = useAuth0();
    let navigate = useNavigate();

    const leftSide = (
        <div className="d-flex ai-start home" onClick={() => navigate('/')}>
            <h1>Will's Queue</h1>
        </div>
    );

    const rightSide = isAuthenticated && (
        <div className="d-flex">
            <img src={user?.picture} alt="user" className="circle" />
            <Button label="Logout" onClick={() => logout()} />
        </div>
    );

    return <Toolbar className="toolbar" left={leftSide} right={rightSide} />;
}
