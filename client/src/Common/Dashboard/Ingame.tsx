import { useAuth0 } from '@auth0/auth0-react';
import { Entry } from '../../utils/constants';
import EntryItem from './EntryItem';

type props = {
    entries: Entry[];
};

export default function Ingame({ entries }: props) {
    const { user } = useAuth0();

    return (
        <div className="list pb-2 d-flex flex-column ai-center jc-between">
            <div className="list-title-container in-game">
                <h1 className="list-title m-0 pt-2">In-game</h1>
                <div className="px-3 entries-list">
                    {entries.map(entry => (
                        <EntryItem entry={entry} />
                    ))}
                </div>
            </div>
        </div>
    );
}
