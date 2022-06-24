import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import LoadingScreen from '../../Common/LoadingScreen';
import { getEntries } from '../../ClientServer';
import { Entry, getUsernameFromUser } from '../../utils/constants';
import Queue from './Queue';
import Ingame from './Ingame';

export default function Dashboard() {
    const { user, isLoading } = useAuth0();
    const [entries, setEntries] = useState<null | Entry[]>(null);
    const username = getUsernameFromUser(user);

    const loading = isLoading || !entries;

    useEffect(() => {
        getEntries().then(({ data }) => setEntries(data));
    }, [user]);

    if (loading || !entries) {
        return <LoadingScreen />;
    }

    const queueEntries = entries.filter(entry => entry.status === 'queue');
    const ingameEntries = entries.filter(entry => entry.status === 'ingame');

    const isUserInQueue =
        !!user && queueEntries.some(entry => entry.username === username);
    const isUserInGame =
        !!user && ingameEntries.some(entry => entry.username === username);

    return (
        <div className="dashboard d-flex flex-row ai-start jc-around flex-wrap">
            <div className="list-container">
                <Queue
                    entries={queueEntries}
                    isUserInGame={isUserInGame}
                    isUserInQueue={isUserInQueue}
                />
            </div>
            <div className="list-container">
                <Ingame entries={ingameEntries} />
            </div>
        </div>
    );
}
