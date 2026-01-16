import React from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface AlertProps {
    type: 'success' | 'error';
    message: string;
}

export function Alert({ type, message }: AlertProps) {
    if (!message) return null;

    const styles = {
        success: 'bg-green-50 text-green-800 border-green-200',
        error: 'bg-red-50 text-red-800 border-red-200',
    };

    const Icon = type === 'success' ? CheckCircle : AlertCircle;

    return (
        <div
            className={`flex items-center p-4 mb-4 rounded-lg border ${styles[type]}`}
            role="alert"
        >
            <Icon className="flex-shrink-0 w-5 h-5 mr-3" />
            <div className="text-sm font-medium">{message}</div>
        </div>
    );
}
