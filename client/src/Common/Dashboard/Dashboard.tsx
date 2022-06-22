import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import LoadingScreen from '../../Common/LoadingScreen';
import { getEntries } from '../../ClientServer';
import { Entry } from '../../utils/constants';
import Queue from './Queue';
import Ingame from './Ingame';

export default function Dashboard() {
    const { user, isLoading } = useAuth0();
    const [entries, setEntries] = useState<null | Entry[]>(null);

    const loading = isLoading || !entries;

    useEffect(() => {
        getEntries().then(({ data }) => setEntries(data));
    }, [user]);

    if (loading || !entries) {
        return <LoadingScreen />;
    }

    const queueEntries = entries.filter(entry => entry.status === 'queue');
    const ingameEntries = entries.filter(entry => entry.status === 'ingame');

    return (
        <div className="d-flex flex-row ai-start jc-center">
            <div className="col-container d-flex flex-column ai-center jc-center mr-8">
                <Queue entries={queueEntries} />
            </div>
            <div className="col-container d-flex flex-column ai-center jc-center ml-8">
                <Ingame entries={ingameEntries} />
            </div>
        </div>
    );
}
