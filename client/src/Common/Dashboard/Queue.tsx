import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
    Entry,
    getUsernameFromUser,
    isAdmin,
    Flag,
} from '../../utils/constants';
import { getFlags, changeFlag } from '../../ClientServer';
import EntryItem from './EntryItem';
import LoginButton from '../../Common/LoginButton';
import JoinButton from '../../Common/JoinButton';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { InputSwitch } from 'primereact/inputswitch';
import { io } from 'socket.io-client';
const socket = io(process.env.REACT_APP_API_URL || '', {
    transports: ['websocket'],
});

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
    const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
    const [queueEnabled, setQueueEnabled] = useState<boolean | null>(null);
    const empty = entries.length === 0;

    const username = getUsernameFromUser(user);
    const userPlaceInQueue =
        entries.findIndex(entry => entry.username === username) + 1;

    const cta = isAuthenticated ? (
        <JoinButton
            queueEnabled={Boolean(queueEnabled)}
            isUserInGame={isUserInGame}
            isUserInQueue={isUserInQueue}
            userPlaceInQueue={userPlaceInQueue}
        />
    ) : (
        <LoginButton />
    );

    const showClearQueue = isAdmin(user) && entries.length > 0;
    const showSwitch = isAdmin(user) && queueEnabled !== null;

    useEffect(() => {
        getFlags().then(({ data }) => {
            const flag = data.find(
                (flag: Flag) => flag.name === 'queue-enabled'
            );
            if (flag) {
                setQueueEnabled(flag.enabled);
            }
        });
    }, [user]);

    useEffect(() => {
        socket.on('fetch-flags', () => {
            setQueueEnabled(null);
            getFlags().then(({ data }) => {
                const flag = data.find(
                    (flag: Flag) => flag.name === 'queue-enabled'
                );
                if (flag) {
                    setQueueEnabled(flag.enabled);
                }
            });
            return function cleanup() {
                socket.off('fetch-flags');
            };
        });
    }, []);

    const handleSwitchChange = async (enabled: boolean) => {
        if (!user) {
            return;
        }
        setQueueEnabled(null);
        const accessToken = await getAccessTokenSilently({
            scope: 'openid profile email',
        });
        await changeFlag(accessToken, {
            user,
            name: 'queue-enabled',
            enabled,
        });
        socket.emit('change-flag');
    };

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
                <div className="w-3rem h-2rem queue-toggle">
                    {queueEnabled === null && (
                        <ProgressSpinner
                            className="w-full h-full"
                            strokeWidth="5px"
                        />
                    )}
                    {showSwitch && (
                        <InputSwitch
                            // className="queue-toggle"
                            checked={queueEnabled}
                            onChange={(e: any) => handleSwitchChange(e.value)}
                            tooltip="Toggle ability to join queue"
                            tooltipOptions={{
                                position: 'top',
                                autoZIndex: false,
                            }}
                        />
                    )}
                </div>
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
