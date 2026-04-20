"use client";
import { Component, ReactNode } from "react";

type Props = { children: ReactNode; fallback?: ReactNode };
type State = { hasError: boolean; error?: Error };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: unknown) {
    console.error("[ErrorBoundary]", error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center" style={{ background: "#020612" }}>
          <div className="text-red-400 text-sm mb-3">Erreur lors du chargement de ce composant</div>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="px-3 py-1 text-xs font-mono border border-slate-600 rounded text-slate-400 hover:text-slate-200 transition-colors"
          >
            Réessayer
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
