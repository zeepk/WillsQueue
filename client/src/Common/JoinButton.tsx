import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'primereact/button';
import { createEntry } from '../ClientServer';
import { getUsernameFromUser } from '../utils/constants';
import { io } from 'socket.io-client';
const socket = io(process.env.REACT_APP_API_URL || '', {
    transports: ['websocket'],
});

type props = {
    isUserInGame: boolean;
    isUserInQueue: boolean;
};
export default function JoinButton({ isUserInGame, isUserInQueue }: props) {
    const { user, getAccessTokenSilently } = useAuth0();

    const username = getUsernameFromUser(user);

    const handleJoin = async () => {
        if (!user || !user.sub || !user.picture) {
            return;
        }
        getAccessTokenSilently({
            scope: 'openid profile email',
        }).then(async accessToken => {
            await createEntry(accessToken, {
                authId: String(user.sub),
                username,
                avatar: String(user.picture),
            });
            socket.emit('move-entry');
        });
    };

    const canJoin = !isUserInGame && !isUserInQueue;
    const cannotJoinButtonLabel = isUserInGame
        ? "You're in game!"
        : "You're in queue!";
    const joinButtonLabel = canJoin ? 'Join queue' : cannotJoinButtonLabel;

    const icon = canJoin ? 'pi-sign-in' : 'pi pi-ellipsis-h';
    return (
        <Button disabled={!canJoin} onClick={() => handleJoin()}>
            <i className={`pi ${icon}`} />
            <span className="px-3">{joinButtonLabel}</span>
        </Button>
    );
}
