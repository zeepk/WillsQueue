import { useAuth0 } from '@auth0/auth0-react';
import { Entry } from '../../utils/constants';
import { Button } from 'primereact/button';

type props = {
    entry: Entry;
};

export default function EntryItem({ entry }: props) {
    const { user } = useAuth0();

    return (
        <div className="entry ingame mb-2 d-flex flex-row ai-center jc-between">
            <div className="d-flex flex-row ai-center jc-between">
                <img src={entry.avatar} alt="avatar" />
                <h4 className="mr-4">{entry.username}</h4>
            </div>
            <div className="actions d-flex flex-row ai-center jc-between">
                <Button label="test" className="btn btn-primary" />
            </div>
        </div>
    );
}
