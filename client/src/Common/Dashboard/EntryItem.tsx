import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
    Entry,
    Status,
    isAdmin,
    getUsernameFromUser,
} from '../../utils/constants';
import { moveEntry } from '../../ClientServer';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { io } from 'socket.io-client';
const socket = io(process.env.REACT_APP_API_URL || '', {
    transports: ['websocket'],
});

type props = {
    entry: Entry;
};

export default function EntryItem({ entry }: props) {
    const { user, getAccessTokenSilently } = useAuth0();
    const [moveLoading, setMoveLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const isUserAdmin = isAdmin(user);
    const username = getUsernameFromUser(user);
    const isCurrentUser = entry.username === username;

    const canDelete = isUserAdmin || isCurrentUser;

    const isQueueEntry = entry.status === 'queue';

    const userEntryClass = username === entry.username ? 'user-entry' : '';
    const moveIcon = isQueueEntry
        ? 'pi-angle-double-right'
        : 'pi-angle-double-left';
    const moveButtonType = isQueueEntry ? 'success' : 'warning';

    const handleMove = async (status: Status) => {
        status === 'archived' ? setDeleteLoading(true) : setMoveLoading(true);
        const accessToken = await getAccessTokenSilently({
            scope: 'openid profile email',
        });
        await moveEntry(accessToken, {
            user,
            status,
            username: entry.username,
        });
        socket.emit('move-entry');
        setMoveLoading(false);
        setDeleteLoading(false);
    };

    return (
        <div
            className={`entry mb-3 d-flex flex-row ai-center jc-between ${userEntryClass}`}
        >
            <div className="d-flex flex-row ai-center jc-start">
                <img src={entry.avatar} alt="avatar" />
                <h4 className="ml-2">{entry.username}</h4>
            </div>
            <div className="actions d-flex flex-row ai-center jc-end">
                {isUserAdmin && (
                    <div className="action-button-container">
                        <Button
                            icon={`pi ${moveIcon}`}
                            className={`p-button-rounded p-button-${moveButtonType} mr-1`}
                            onClick={() =>
                                handleMove(isQueueEntry ? 'ingame' : 'queue')
                            }
                        />
                    </div>
                )}
                {canDelete && (
                    <div className="action-button-container">
                        {deleteLoading ? (
                            <ProgressSpinner />
                        ) : (
                            <Button
                                icon="pi pi-trash"
                                className="p-button-rounded p-button-outlined p-button-danger ml-1"
                                onClick={() => handleMove('archived')}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
