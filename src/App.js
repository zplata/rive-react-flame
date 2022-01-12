import "./styles.css";
import { useState, useEffect } from "react";
import { useRive, useStateMachineInput } from "rive-react";

export default function App() {
  // Name of the State Machine for this animation
  const STATE_MACHINE_NAME = "State Machine 1";
  // Name of the input used in the state machine to trigger states
  const STATE_MACHINE_INPUT_NAME = "flameRate";

  // Setup the riv file from the public directory and specify the state machine in use
  const { RiveComponent, rive } = useRive({
    src: "flame.riv",
    autoplay: true,
    stateMachines: STATE_MACHINE_NAME,
    artboard: "New Artboard"
  });

  // Grabs the state machine numerical input to manipulate the animations
  const flameRateInput = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    STATE_MACHINE_INPUT_NAME
  );

  const [flameRateValue, setFlameRateValue] = useState(0);

  // When the slider value updates, we'll trigger the state animation input value
  // to set the blend state
  useEffect(() => {
    if (flameRateInput) {
      flameRateInput.value = flameRateValue;
    }
  }, [flameRateValue, flameRateInput]);

  return (
    <div className="App">
      <h1>Runtime Funtime - React</h1>
      <h2>Use the slider to adjust the flames</h2>
      <div className="flex">
        <div className="rive-container">
          <RiveComponent layout={{ fit: "cover", alignment: "center" }} />
        </div>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={flameRateValue}
        step="1"
        onChange={(e) => setFlameRateValue(e.target.value)}
      />
      <p>Flame intensity: {flameRateValue}</p>
    </div>
  );
}
