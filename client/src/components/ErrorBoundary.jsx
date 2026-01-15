import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-8 bg-red-50 min-h-screen">
                    <h1 className="text-2xl font-bold text-red-800 mb-4">Something went wrong</h1>
                    <div className="bg-white p-6 rounded shadow border border-red-200">
                        <h2 className="text-lg font-semibold text-red-600">{this.state.error?.toString()}</h2>
                        <details className="mt-4 text-sm text-gray-700 whitespace-pre-wrap">
                            {this.state.errorInfo?.componentStack}
                        </details>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
