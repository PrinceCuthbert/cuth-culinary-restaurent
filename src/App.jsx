import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import useOnlineStatus from "./hooks/useOnlineStatus";
import OfflineView from "./components/OfflineView";
import GenericErrorView from "./components/GenericErrorView";
import Home from "./pages/Home";
import Login from "./Login";

function App() {
  const isOnline = useOnlineStatus();
  const navigate = useNavigate();
  const isProd = import.meta.env.PROD;
  const isLoginEnabled = !isProd;

  const handleLogin = () => {
    navigate("/", { replace: true });
  };

  const handleLogout = () => {
    navigate(isLoginEnabled ? "/login" : "/", { replace: true });
  };

  if (!isOnline) {
    return <OfflineView />;
  }

  return (
    <AuthProvider>
      <ErrorBoundary
        FallbackComponent={({ error, resetErrorBoundary }) => (
          <GenericErrorView
            message={error.message}
            onRetry={resetErrorBoundary}
          />
        )}
        onReset={() => window.location.reload()}>
        <Routes>
          <Route path="/" element={<Home onLogout={handleLogout} />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route
            path="/login"
            element={
              isLoginEnabled ? (
                <Login onLogin={handleLogin} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App;
