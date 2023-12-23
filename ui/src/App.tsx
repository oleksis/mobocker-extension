import React from "react";
import Button from "@mui/material/Button";
import { createDockerDesktopClient } from "@docker/extension-api-client";
import { Stack, TextField, Typography } from "@mui/material";

const initialSize = 20;
const finalSize = 200;
const increaseNeeded = finalSize - initialSize;
const secondsInAMonth = 60 * 60 * 24 * 30;
const intervalInSeconds = 10;
const SIZE_INCREMENT = increaseNeeded / (secondsInAMonth / intervalInSeconds); // global constant for size increment

// Mobocker class
class Mobocker {
  size: number;
  color: string;
  emoji: string;
  lifeTime: number;

  constructor() {
    this.size = initialSize; // size of the emoji for Mobocker
    this.color = "red"; // color of the Mobocker
    this.lifeTime = 4; // life time of the Mobocker is four months
    this.emoji = "🐳"; // emoji for Mobocker
  }

  // Function to increment the size of the emoji for Mobocker
  incrementSize(hours: number) {
    this.size += hours;
  }

  // Function to change the color of the Mobocker
  changeColor() {
    // change the color by month
  }

  // Function to display the Mobocker
  display() {
    return { emoji: this.emoji, size: this.size };
  }
}

// Custom hook to manage Mobocker
function useMobocker() {
  const [mobocker, setMobocker] = React.useState(new Mobocker());
  const [elapsedTime, setElapsedTime] = React.useState(0); // time elapsed since the hook was first run

  React.useEffect(() => {
    const interval = setInterval(() => {
      const newMobocker = new Mobocker();
      newMobocker.size = mobocker.size;
      newMobocker.color = mobocker.color;
      newMobocker.lifeTime = mobocker.lifeTime;
      newMobocker.emoji = mobocker.emoji;
      newMobocker.incrementSize(SIZE_INCREMENT);
      newMobocker.changeColor();
      setMobocker(newMobocker);

      // Increment the elapsed time by 10 seconds
      setElapsedTime((prevTime) => prevTime + 10);
    }, 10000); // run the interval every 10 seconds

    // Clear the interval when it reaches one month in seconds
    if (elapsedTime >= secondsInAMonth) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [elapsedTime]);

  return mobocker;
}

type MobockerEmojiProps = {
  emoji: string;
  size: number;
};

// MobockerEmoji component
function MobockerEmoji({ emoji, size }: MobockerEmojiProps) {
  return <span style={{ fontSize: size }}>{emoji}</span>;
}

// Mobocker component
function MobockerComponent() {
  const mobocker = useMobocker();

  return (
    <>
      <MobockerEmoji {...mobocker.display()} />
    </>
  );
}

function isCloseToChristmas() {
  const today = new Date();
  const christmas = new Date(today.getFullYear(), 11, 25); // Christmas day
  const differenceInDays = Math.floor(
    (christmas.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );
  return differenceInDays <= 7; // change this to the number of days you consider "close" to Christmas
}

// Christmas component
function ChristmasComponent() {
  return (
    <div>
      <span role="img" aria-label="christmas-tree" style={{ fontSize: 50 }}>
        🎄
      </span>
      <p>Merry Christmas!</p>
    </div>
  );
}

// Note: This line relies on Docker Desktop's presence as a host application.
// If you're running this React app in a browser, it won't work properly.
const client = createDockerDesktopClient();

function useDockerDesktopClient() {
  return client;
}

export function App() {
  const [response, setResponse] = React.useState<string>();
  const [isRunning, setIsRunning] = React.useState<boolean>(true);
  const ddClient = useDockerDesktopClient();

  const checkBackendServiceStatus = async () => {
    const result = await ddClient.docker.cli.exec("container", [
      "inspect",
      "--format",
      "{{.State.Status}}",
      "oleksis_mobocker-extension-desktop-extension-service",
    ]);
    setIsRunning(result?.stdout.trim() === "running");
  };

  const fetchBackendServiceLogs = async () => {
    const result = await ddClient.docker.cli.exec("container", [
      "logs",
      "oleksis_mobocker-extension-desktop-extension-service",
    ]);
    setResponse(result?.stdout ?? "");
  };

  const startBackendService = async () => {
    const result = await ddClient.docker.cli.exec("container", [
      "start",
      "oleksis_mobocker-extension-desktop-extension-service",
    ]);
    setIsRunning(true);
  };

  const stopBackendService = async () => {
    const result = await ddClient.docker.cli.exec("container", [
      "stop",
      "oleksis_mobocker-extension-desktop-extension-service",
    ]);
    setIsRunning(false);
  };

  const handleButtonClick = async () => {
    if (isRunning) {
      stopBackendService();
    } else {
      startBackendService();
    }
    await checkBackendServiceStatus();
  };

  React.useEffect(() => {
    checkBackendServiceStatus();
    fetchBackendServiceLogs();
  }, [isRunning]);

  return (
    <>
      <Typography variant="h3">Mobocker</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        The dummest container, is the smaller running container to keep Docker
        daemon alive.
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        Pressing the below button will start/stop the backend. The standard
        output will appear in the textarea.
      </Typography>
      <Stack direction="row" alignItems="start" spacing={2} sx={{ mt: 4 }}>
        <Button
          variant="contained"
          onClick={handleButtonClick}
          style={{ backgroundColor: isRunning ? "red" : "green" }}
        >
          {isRunning ? "Stop" : "Start"}
        </Button>

        <TextField
          label="Backend response"
          sx={{ width: 480 }}
          disabled
          multiline={true}
          variant="outlined"
          minRows={5}
          value={response ?? ""}
        />

        {isRunning && <MobockerComponent key={Date.now()} />}
        {isCloseToChristmas() && <ChristmasComponent />}
      </Stack>
    </>
  );
}
