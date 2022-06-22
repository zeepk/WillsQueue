import { useAuth0 } from '@auth0/auth0-react';
import Logo from '../Assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
export default function CustomNavbar() {
    const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();
    let navigate = useNavigate();
    console.log(user);

    const leftSide = (
        <div className="d-flex ai-start home" onClick={() => navigate('/')}>
            <h1>Will's Queue</h1>
        </div>
    );

    const rightSide = (
        <>
            <div className="d-flex ai-center">
                {isAuthenticated && (
                    <Button
                        className="link"
                        label="Dashboard"
                        onClick={() => navigate('dashboard')}
                    />
                )}
            </div>
            {isAuthenticated ? (
                <div className="d-flex">
                    <img src={user?.picture} alt="user" className="circle" />
                    <Button label="Logout" onClick={() => logout()} />
                </div>
            ) : (
                <Button label="Login" onClick={() => loginWithRedirect()} />
            )}
        </>
    );

    return <Toolbar className="toolbar" left={leftSide} right={rightSide} />;
}
