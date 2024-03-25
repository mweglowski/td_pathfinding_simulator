import React, { createContext, useContext, useState } from "react";

const StoreContext = createContext();

export const EnvConfigStoreProvider = ({ children }) => {
  const [state, setState] = useState({
    currentConfig: "none",
    dynamitePositions: [], // [{x: 0, y: 0}, ...]
    startPosition: {x: null, y: null}, // {x: 0, y: 0}
    terminalPosition: {x: null, y: null}, // {x: 0, y: 0}
  });

  const updateCurrentConfig = (newConfig) => {
    console.log("config update", newConfig);
    setState((prevState) => ({
      ...prevState,
      currentConfig: newConfig,
    }));
  };

  const updateDynamitePosition = (position) => {
    setState((prevState) => {
      const dynamitePositions = prevState.dynamitePositions;
      const positionIndex = dynamitePositions.findIndex(
        (dynamitePosition) =>
          dynamitePosition.y === position.y && dynamitePosition.x === position.x
      );

      if (positionIndex >= 0) {
        // REMOVE POSITION
        const updatedPositions = dynamitePositions.filter(
          (_, index) => index !== positionIndex
        );
        console.log("dynamite removed", position);
        return { ...prevState, dynamitePositions: updatedPositions };
      }
      // ADD POSITION
      const updatedPositions = [...dynamitePositions, position];
      console.log("dynamite added", position);
      return { ...prevState, dynamitePositions: updatedPositions };
    });
  };

  const updateStartPosition = (position) => {
    console.log("new start position", position);
    setState((prevState) => ({
      ...prevState,
      startPosition: position,
    }));
  };

  const updateTerminalPosition = (position) => {
    console.log("new terminal position", position);
    setState((prevState) => ({
      ...prevState,
      terminalPosition: position,
    }));
  };

  const value = {
    currentConfig: state.currentConfig,
    updateCurrentConfig,
    updateDynamitePosition,
    dynamitePositions: state.dynamitePositions,
    updateStartPosition,
    startPosition: state.startPosition,
    updateTerminalPosition,
    terminalPosition: state.terminalPosition,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

// CUSTOM HOOK
export const useEnvConfigStore = () => useContext(StoreContext);
