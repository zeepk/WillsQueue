import { ProgressSpinner } from 'primereact/progressspinner';

export default function LoadingScreen() {
    return (
        <div className="loading-screen d-flex ai-center jc-center">
            <ProgressSpinner />
        </div>
    );
}
