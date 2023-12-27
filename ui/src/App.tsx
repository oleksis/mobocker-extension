import React from "react";
import Button from "@mui/material/Button";
import { createDockerDesktopClient } from "@docker/extension-api-client";
import { Stack, TextField, Typography } from "@mui/material";

const FACTOR = 0.0007;
const DEFAULT_SIZE = 20;
const finalSize = 200;
const increaseNeeded = finalSize - DEFAULT_SIZE;
const secondsInAMonth = 60 * 60 * 24 * 30;
const now = new Date();

let elapsedTimeInSeconds = Math.floor(Date.now() / 1000);
let nextMonth = now.getUTCMonth() + 1;
let year = now.getUTCFullYear();

if (nextMonth === 12) {
  nextMonth = 0;
  year++;
}

let endOfMonth = new Date(Date.UTC(year, nextMonth, 1));
endOfMonth.setUTCMilliseconds(endOfMonth.getUTCMilliseconds() - 1);
// const totalMilliseconds = endOfMonth.getTime();
// const secondsLeft = Math.floor((endOfMonth.getTime() - now.getTime()) / 1000);

const secondsSinceEpoch = Math.floor(Date.now() / 1000);
const intervalInSeconds = 10;

let sizeIncrement = increaseNeeded / (secondsSinceEpoch / intervalInSeconds); // global constant for size increment

// Mobocker class
class Mobocker {
  size: number;
  color: string;
  emoji: string;
  lifeTime: number;
  isVisible: boolean;

  constructor(initialSize: number = DEFAULT_SIZE) {
    this.size = initialSize; // size of the emoji for Mobocker
    this.color = "red"; // color of the Mobocker
    this.lifeTime = 4; // life time of the Mobocker is four months
    this.emoji = "🐳"; // emoji for Mobocker
    this.isVisible = true;
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
    return { emoji: this.emoji, size: this.size, isVisible: this.isVisible };
  }
}

// Custom hook to manage Mobocker
function useMobocker(initialSize: number) {
  const [mobocker, setMobocker] = React.useState(new Mobocker());
  const [elapsedTime, setElapsedTime] = React.useState(0); // time elapsed since the hook was first run

  React.useEffect(() => {
    const interval = setInterval(() => {
      const newMobocker = new Mobocker();
      newMobocker.size = mobocker.size;
      newMobocker.color = mobocker.color;
      newMobocker.lifeTime = mobocker.lifeTime;
      newMobocker.emoji = mobocker.emoji;
      newMobocker.incrementSize(sizeIncrement + FACTOR);
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

interface MobockerEmojiProps {
  emoji: string;
  size: number;
  isVisible: boolean;
}

// MobockerEmoji component
function MobockerEmoji({ emoji, size, isVisible }: MobockerEmojiProps) {
  return (
    <span
      style={{ fontSize: `${size}px`, display: isVisible ? "block" : "none" }}
    >
      {emoji}
    </span>
  );
}

interface MobockerComponentProps {
  initialSize: number;
  isVisible: boolean;
}

// Mobocker component
function MobockerComponent({ initialSize, isVisible }: MobockerComponentProps) {
  const mobocker = useMobocker(initialSize);
  mobocker.isVisible = isVisible;

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
  return -2 < differenceInDays && differenceInDays < 7; // change this to the number of days you consider "close" to Christmas
}

// Christmas component
function ChristmasComponent() {
  return (
    <div>
      <span role="img" aria-label="christmas-tree" style={{ fontSize: 50 }}>
        🎄
      </span>
      <p style={{ fontSize: 10 }}>Merry Christmas!</p>
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
  const [response, setResponse] = React.useState<string>("");
  const [isRunning, setIsRunning] = React.useState<boolean>(true);
  const [initialSize, setInitialSize] = React.useState<number>(DEFAULT_SIZE);
  const [mobockerC, setMobockerC] = React.useState<string>(
    "oleksis_mobocker-extension-desktop-extension-service"
  );
  const ddClient = useDockerDesktopClient();

  const detectServerEngine = async () => {
    const result = await ddClient.docker.cli.exec("version", [
      "--format",
      "{{(index .Server.Components 0).Name}}",
    ]);

    const serverEngine = result?.stdout ?? "";

    if (serverEngine.trim() === "Podman Engine") {
      setMobockerC("podman-desktop-ext-mobocker-mobocker-extension-1");
    }
  };

  const checkBackendServiceStatus = async () => {
    const result = await ddClient.docker.cli.exec("container", [
      "inspect",
      "--format",
      "{{.State.Status}}",
      mobockerC,
    ]);
    setIsRunning(result?.stdout.trim() === "running");
  };

  const fetchBackendServiceLogs = async () => {
    const result = await ddClient.docker.cli.exec("container", [
      "logs",
      mobockerC,
    ]);
    const logs = result?.stdout ?? "";
    setResponse(logs);
    // Parse the last log entry
    if (logs) {
      const firstLog = logs.split(/\r?\n/).filter(Boolean)[0];
      console.log(firstLog);

      const firstLogDate = new Date(
        firstLog.split(" ")[0] + " " + firstLog.split(" ")[1] + " UTC"
      );
      console.log(firstLogDate);

      elapsedTimeInSeconds = Math.floor(
        (Date.now() - firstLogDate.getTime()) / 1000
      );

      console.log(
        `${Date.now()} ${increaseNeeded} ${endOfMonth.getTime()} ${secondsSinceEpoch} ${elapsedTimeInSeconds} ${
          increaseNeeded /
          ((endOfMonth.getTime() / 1000 -
            secondsSinceEpoch -
            elapsedTimeInSeconds) /
            intervalInSeconds)
        } ${
          Math.max(
            increaseNeeded /
              (endOfMonth.getTime() / 1000 -
                secondsSinceEpoch -
                elapsedTimeInSeconds) /
              intervalInSeconds,
            sizeIncrement
          ) + DEFAULT_SIZE
        } ${sizeIncrement}`
      );

      let _initialSize = Math.max(
        increaseNeeded /
          (endOfMonth.getTime() / 1000 -
            secondsSinceEpoch -
            elapsedTimeInSeconds) /
          intervalInSeconds,
        sizeIncrement
      );

      sizeIncrement += _initialSize;

      setInitialSize(sizeIncrement);
    }
  };

  const startBackendService = async () => {
    const result = await ddClient.docker.cli.exec("container", [
      "start",
      mobockerC,
    ]);
    setIsRunning(true);
  };

  const stopBackendService = async () => {
    const result = await ddClient.docker.cli.exec("container", [
      "stop",
      mobockerC,
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
    detectServerEngine();
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

        <MobockerComponent initialSize={initialSize} isVisible={isRunning} />

        {isCloseToChristmas() && <ChristmasComponent />}
      </Stack>
    </>
  );
}
