import { useAuth0 } from '@auth0/auth0-react';
import { Entry, getUsernameFromUser, isAdmin } from '../../utils/constants';
import EntryItem from './EntryItem';
import LoginButton from '../../Common/LoginButton';
import JoinButton from '../../Common/JoinButton';
import { Button } from 'primereact/button';

type props = {
    entries: Entry[];
    isUserInGame: boolean;
    isUserInQueue: boolean;
    handleClearList: () => void;
};

export default function Queue({
    entries,
    isUserInGame,
    isUserInQueue,
    handleClearList,
}: props) {
    const { isAuthenticated, user } = useAuth0();
    const empty = entries.length === 0;

    const username = getUsernameFromUser(user);
    const userPlaceInQueue =
        entries.findIndex(entry => entry.username === username) + 1;

    const cta = isAuthenticated ? (
        <JoinButton
            isUserInGame={isUserInGame}
            isUserInQueue={isUserInQueue}
            userPlaceInQueue={userPlaceInQueue}
        />
    ) : (
        <LoginButton />
    );
    const showClearQueue = isAdmin(user) && entries.length > 0;

    return (
        <div className="list pb-2 d-flex flex-column-reverse ai-center jc-between">
            <div className="list-title-container">
                {showClearQueue && (
                    <Button
                        icon="pi pi-power-off"
                        className="clear p-button-rounded p-button-text p-button-danger"
                        onClick={() => handleClearList()}
                        tooltip="Clear the entire queue"
                        tooltipOptions={{ position: 'top' }}
                    />
                )}
                <h1 className="list-title m-0 pt-2">Queue</h1>
                {empty ? (
                    <h3 className="mt-6">Nobody's in queue yet!</h3>
                ) : (
                    <div className="px-3 entries-list">
                        {entries.map(entry => (
                            <div key={entry.username}>
                                <EntryItem entry={entry} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="my-3">{cta}</div>
        </div>
    );
}
