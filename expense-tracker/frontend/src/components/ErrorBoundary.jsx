import React from 'react';
import { toast } from 'react-toastify';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
    toast.error('Something went wrong. Please reload.');
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding:20 }}>
          <h2>Oops.</h2>
          <p>An unexpected error occurred.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
