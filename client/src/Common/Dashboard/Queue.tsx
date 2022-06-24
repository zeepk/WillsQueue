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
    const cta = isAuthenticated ? (
        <JoinButton isUserInGame={isUserInGame} isUserInQueue={isUserInQueue} />
    ) : (
        <LoginButton />
    );

    return (
        <div className="d-flex flex-column ai-center jc-center">
            <h1>Queue</h1>
            {entries.map(entry => (
                <EntryItem entry={entry} />
            ))}
            <div className="mt-2">{cta}</div>
        </div>
    );
}
