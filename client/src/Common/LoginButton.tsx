import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'primereact/button';
export default function LoginButton() {
    const { loginWithRedirect } = useAuth0();
    return (
        <Button className="login-twitch" onClick={() => loginWithRedirect()}>
            <img
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.iconsdb.com%2Ficons%2Fdownload%2Fwhite%2Ftwitch-tv-256.png&f=1&nofb=1"
                alt="Login with Twitch"
            />
            <span className="px-3">Login with Twitch to join!</span>
        </Button>
    );
}
