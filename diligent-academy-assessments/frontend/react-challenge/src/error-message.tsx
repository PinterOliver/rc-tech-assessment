import React from 'react';
import './styles.css';

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    return <p className="message error">{message}</p>;
};

export default ErrorMessage;
