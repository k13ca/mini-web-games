interface ErrorWindowProps {
    message: string;
}

export default function ErrorWindow({ message }: ErrorWindowProps) {
    return (
        <div >
            <h2>ERROR_</h2>
            <p>{message}</p>
        </div>
    )
}


