import React, { createContext, useState } from "react";

const FitnessItems = createContext();

const FitnessContext = ({ children }) => {
  const [completed, setCompleted] = useState([]);
  const [workout, setWorkout] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [calories, setCalories] = useState(0); // ADD THIS LINE
  
  return (
    <FitnessItems.Provider 
      value={{
        completed,
        setCompleted,
        workout,
        setWorkout,
        minutes,
        setMinutes,
        calories,      // ADD THIS LINE
        setCalories,   // ADD THIS LINE
      }}
    >
      {children}
    </FitnessItems.Provider>
  );
};

export { FitnessContext, FitnessItems };