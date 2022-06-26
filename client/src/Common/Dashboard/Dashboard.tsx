import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import LoadingScreen from '../../Common/LoadingScreen';
import { getEntries, clearList } from '../../ClientServer';
import { Entry, Status, getUsernameFromUser } from '../../utils/constants';
import Queue from './Queue';
import Ingame from './Ingame';
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog'; // To use <ConfirmDialog> tag
import { confirmDialog } from 'primereact/confirmdialog'; // To use confirmDialog method
import { io } from 'socket.io-client';
const socket = io(process.env.REACT_APP_API_URL || '', {
    transports: ['websocket'],
});

export default function Dashboard() {
    const { user, isLoading, getAccessTokenSilently } = useAuth0();
    const [entries, setEntries] = useState<null | Entry[]>(null);
    const [manualLoading, setManualLoading] = useState(false);
    const username = getUsernameFromUser(user);

    const loading = isLoading || !entries || manualLoading;

    useEffect(() => {
        getEntries().then(({ data }) =>
            setEntries(
                data.sort(
                    (a: Entry, b: Entry) =>
                        new Date(a.createdAt).getTime() -
                        new Date(b.createdAt).getTime()
                )
            )
        );
    }, [user]);

    useEffect(() => {
        socket.on('fetch-entries', () => {
            getEntries().then(({ data }) => {
                setEntries(
                    data.sort(
                        (a: Entry, b: Entry) =>
                            new Date(a.createdAt).getTime() -
                            new Date(b.createdAt).getTime()
                    )
                );
                setManualLoading(false);
            });
            return function cleanup() {
                socket.off('fetch-entries');
            };
        });
    }, []);

    if (loading || !entries) {
        return <LoadingScreen />;
    }

    const handleClear = async (status: Status) => {
        setManualLoading(true);
        const accessToken = await getAccessTokenSilently({
            scope: 'openid profile email',
        });
        try {
            await clearList(accessToken, {
                user,
                status,
            });
        } catch (e) {
            console.error(e);
        }
        socket.emit('move-entry');
    };

    const handleConfirm = (status: Status) => {
        const message =
            status === 'queue'
                ? 'Clear the whole queue?'
                : 'Clear the whole in-game list?';
        confirmDialog({
            message,
            header: 'Woah there pal',
            icon: 'pi pi-exclamation-triangle',
            accept: () => handleClear(status),
        });
    };

    const queueEntries = entries.filter(entry => entry.status === 'queue');
    const ingameEntries = entries.filter(entry => entry.status === 'ingame');

    const showClearQueue = queueEntries.length > 0;
    const showClearIngame = ingameEntries.length > 0;

    const isUserInQueue =
        !!user && queueEntries.some(entry => entry.username === username);
    const isUserInGame =
        !!user && ingameEntries.some(entry => entry.username === username);

    return (
        <div className="dashboard d-flex flex-row ai-start jc-around flex-wrap">
            <ConfirmDialog />
            <div className="list-container">
                {showClearQueue && (
                    <Button
                        icon="pi pi-power-off"
                        className="clear p-button-rounded p-button-outlined p-button-danger"
                        onClick={() => handleConfirm('queue')}
                        tooltip="Clear the entire queue"
                        tooltipOptions={{ position: 'top' }}
                    />
                )}
                <Queue
                    entries={queueEntries}
                    isUserInGame={isUserInGame}
                    isUserInQueue={isUserInQueue}
                />
            </div>
            <div className="list-container">
                {showClearIngame && (
                    <Button
                        icon="pi pi-power-off"
                        className="clear p-button-rounded p-button-outlined p-button-danger"
                        onClick={() => handleConfirm('ingame')}
                        tooltip="Clear the entire in-game list"
                        tooltipOptions={{ position: 'top' }}
                    />
                )}
                <Ingame entries={ingameEntries} />
            </div>
        </div>
    );
}
