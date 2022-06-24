import { useAuth0 } from '@auth0/auth0-react';
import { Entry, isAdmin, getUsernameFromUser } from '../../utils/constants';
import { Button } from 'primereact/button';

type props = {
    entry: Entry;
};

export default function EntryItem({ entry }: props) {
    const { user } = useAuth0();
    const isUserAdmin = isAdmin(user);
    const username = getUsernameFromUser(user);

    const userEntryClass = username === entry.username ? 'user-entry' : '';
    const moveIcon =
        entry.status === 'queue'
            ? 'pi-angle-double-right'
            : 'pi-angle-double-left';
    const moveButtonType = entry.status === 'queue' ? 'success' : 'warning';

    return (
        <div
            className={`entry mb-2 d-flex flex-row ai-center jc-between ${userEntryClass}`}
        >
            <div className="d-flex flex-row ai-center jc-start">
                <img src={entry.avatar} alt="avatar" />
                <h4 className="mr-4">{entry.username}</h4>
            </div>
            {isUserAdmin && (
                <div className="actions d-flex flex-row ai-center jc-end">
                    <Button
                        icon={`pi ${moveIcon}`}
                        className={`p-button-rounded p-button-${moveButtonType} mr-1`}
                    />
                    <Button
                        icon="pi pi-trash"
                        className="p-button-rounded p-button-outlined p-button-danger ml-1"
                    />
                </div>
            )}
        </div>
    );
}
