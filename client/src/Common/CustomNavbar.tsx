import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { getUsernameFromUser, isAdmin } from '../utils/constants';
import logo from '../Assets/images/logo.png';

export default function CustomNavbar() {
    const { isAuthenticated, logout, user } = useAuth0();
    const username = getUsernameFromUser(user);
    let navigate = useNavigate();

    const usernameString = `${username}${isAdmin(user) ? ' (admin)' : ''}`;

    const leftSide = (
        <div className="d-flex ai-center home" onClick={() => navigate('/')}>
            <img src={logo} className="logo" alt="logo" />
            <h1 className="m-0">Will's Queue</h1>
        </div>
    );

    const rightSide = isAuthenticated && (
        <div className="d-flex">
            <img src={user?.picture} alt="user" className="circle" />
            <h3 className="mx-2 my-auto">{usernameString}</h3>
            <Button label="Logout" onClick={() => logout()} />
        </div>
    );

    return <Toolbar className="toolbar" left={leftSide} right={rightSide} />;
}
