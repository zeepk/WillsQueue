import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'primereact/button';
import { createEntry } from '../ClientServer';
import { getUsernameFromUser } from '../utils/constants';

type props = {
    isUserInGame: boolean;
    isUserInQueue: boolean;
};
export default function JoinButton({ isUserInGame, isUserInQueue }: props) {
    const { user } = useAuth0();

    const username = getUsernameFromUser(user);

    const handleJoin = () => {
        if (!user || !user.sub || !user.picture) {
            return;
        }
        createEntry({ authId: user.sub, username, avatar: user.picture });
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
