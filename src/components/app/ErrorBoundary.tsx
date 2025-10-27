import * as React from "react";

export class ErrorBoundary extends React.Component<{ children: React.ReactNode; fallback: React.ReactNode }> {
  static getDerivedStateFromError(_error: Error) {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: React.ErrorInfo) {}

  render() {
    return this.props.children;
  }
}
