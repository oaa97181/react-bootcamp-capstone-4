import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        }
    }

    static getDerivedStateFromError(error) {
        console.log('in')
        return {hasError: true};
    }

    componentDidCatch(error, errorInfo) {
        console.log('componentDidCatch', {error, errorInfo});
        this.setState({hasError: true});
    }


    render() {
        console.log(this.state)
        if (this.state.hasError) {
            return (
                <div>
                    <h2>Something went wrong.</h2>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;