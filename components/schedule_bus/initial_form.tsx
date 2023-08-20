interface InitialFormProps {
    isInitialForm: boolean;
    setIsInitialForm: (value: boolean) => void;
}

export default function InitialForm({ isInitialForm, setIsInitialForm }: InitialFormProps) {
    return (
        <p>Initial Form</p>
    );
}