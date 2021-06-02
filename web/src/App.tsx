
import React from "react";
import Router from './Router';
import { ProvideAuth } from "./hooks";

export const App: React.FC = () => {
  return (
    <ProvideAuth>
      <Router />
    </ProvideAuth>

  );
}

export default App;
