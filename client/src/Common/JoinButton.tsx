import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { createEntry } from '../ClientServer';
import {
    getUsernameFromUser,
    getFriendlyQueuePosition,
} from '../utils/constants';
import { io } from 'socket.io-client';
const socket = io(process.env.REACT_APP_API_URL || '', {
    transports: ['websocket'],
});

type props = {
    isUserInGame: boolean;
    isUserInQueue: boolean;
    userPlaceInQueue: number;
};
export default function JoinButton({
    isUserInGame,
    isUserInQueue,
    userPlaceInQueue,
}: props) {
    const { user, getAccessTokenSilently } = useAuth0();
    const [loading, setLoading] = useState(false);

    const username = getUsernameFromUser(user);

    const handleJoin = async () => {
        if (!user || !user.sub || !user.picture) {
            return;
        }
        setLoading(true);
        const accessToken = await getAccessTokenSilently({
            scope: 'openid profile email',
        });
        await createEntry(accessToken, {
            authId: String(user.sub),
            username,
            avatar: String(user.picture),
        });
        socket.emit('move-entry');
        setLoading(false);
    };

    const canJoin = !isUserInGame && !isUserInQueue;
    const cannotJoinButtonLabel = isUserInGame
        ? "You're in game!"
        : `You're ${getFriendlyQueuePosition(userPlaceInQueue)} in queue!`;
    const joinButtonLabel = canJoin ? 'Join queue' : cannotJoinButtonLabel;

    const icon = canJoin ? 'pi-sign-in' : 'pi pi-ellipsis-h';

    return (
        <Button
            className="join-button d-flex jc-center"
            disabled={!canJoin}
            onClick={() => handleJoin()}
        >
            {loading ? (
                <ProgressSpinner />
            ) : (
                <>
                    <i className={`pi ${icon}`} />
                    <span className="px-3">{joinButtonLabel}</span>
                </>
            )}
        </Button>
    );
}
