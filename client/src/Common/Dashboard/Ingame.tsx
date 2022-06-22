import { useAuth0 } from '@auth0/auth0-react';
import { Entry } from '../../utils/constants';
import EntryItem from './EntryItem';

type props = {
    entries: Entry[];
};

export default function Ingame({ entries }: props) {
    const { user } = useAuth0();

    return (
        <div className="d-flex flex-column ai-center jc-center">
            <h1>In-game</h1>
            {entries.map(entry => (
                <EntryItem entry={entry} />
            ))}
        </div>
    );
}
