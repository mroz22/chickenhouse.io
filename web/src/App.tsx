
import React from "react";
import Router from './Router';
import { Auth } from './providers/Auth';

export const App: React.FC = () => {
  return (
    <Auth>
      {/* @ts-ignore */}
      <Router  />
    </Auth>
  );
}

export default App;
