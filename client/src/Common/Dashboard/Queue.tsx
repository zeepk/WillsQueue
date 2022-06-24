import { useAuth0 } from '@auth0/auth0-react';
import { Entry } from '../../utils/constants';
import EntryItem from './EntryItem';
import LoginButton from '../../Common/LoginButton';
import JoinButton from '../../Common/JoinButton';

type props = {
    entries: Entry[];
    isUserInGame: boolean;
    isUserInQueue: boolean;
};

export default function Queue({ entries, isUserInGame, isUserInQueue }: props) {
    const { isAuthenticated } = useAuth0();
    const empty = entries.length === 0;
    const cta = isAuthenticated ? (
        <JoinButton isUserInGame={isUserInGame} isUserInQueue={isUserInQueue} />
    ) : (
        <LoginButton />
    );

    return (
        <div className="queue d-flex flex-column ai-center jc-between">
            <div>
                <h1>Queue</h1>
                {empty && <h3 className="mt-6">Nobody's in queue yet!</h3>}
                <div className="entries-list">
                    {entries.map(entry => (
                        <EntryItem entry={entry} />
                    ))}
                </div>
            </div>
            <div className="mt-2">{cta}</div>
        </div>
    );
}
