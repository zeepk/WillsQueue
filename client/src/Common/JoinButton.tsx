import { useAuth0 } from '@auth0/auth0-react';
import { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { createEntry } from '../ClientServer';
import { Toast } from 'primereact/toast';
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
    queueEnabled: boolean;
};
export default function JoinButton({
    isUserInGame,
    isUserInQueue,
    userPlaceInQueue,
    queueEnabled,
}: props) {
    const { user, getAccessTokenSilently } = useAuth0();
    const [loading, setLoading] = useState(false);
    const toast = useRef<Toast>(null);

    const username = getUsernameFromUser(user);

    const handleJoin = async () => {
        if (!user || !user.sub || !user.picture || !queueEnabled) {
            return;
        }
        setLoading(true);
        try {
            const accessToken = await getAccessTokenSilently({
                scope: 'openid profile email',
            });
            await createEntry(accessToken, {
                authId: String(user.sub),
                username,
                avatar: String(user.picture),
            });
        } catch (e) {
            setLoading(false);
            console.error(e);
            toast?.current?.show({
                severity: 'error',
                summary: 'Error Message',
                detail: 'Unable to add you to the queue. Please contact an administrator or mod.',
                life: 10000,
            });
        }
        socket.emit('move-entry');
        setLoading(false);
    };

    const canJoin = !isUserInGame && !isUserInQueue;
    const cannotJoinButtonLabel = isUserInGame
        ? "You're in game!"
        : `You're ${getFriendlyQueuePosition(userPlaceInQueue)} in queue!`;
    let joinButtonLabel = canJoin ? 'Join queue' : cannotJoinButtonLabel;

    if (!queueEnabled && canJoin) {
        joinButtonLabel = 'Queue is turned off';
    }

    const icon = queueEnabled && canJoin ? 'pi-sign-in' : 'pi-ellipsis-h';

    return (
        <Button
            className="join-button d-flex jc-center"
            disabled={!canJoin || !queueEnabled}
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
