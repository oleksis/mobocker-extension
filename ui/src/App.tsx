import React from 'react';
import Button from '@mui/material/Button';
import { createDockerDesktopClient } from '@docker/extension-api-client';
import { Stack, TextField, Typography } from '@mui/material';

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
    const result = await ddClient.docker.cli.exec('container', ['inspect', '--format', '{{.State.Status}}', 'oleksis_mobocker-extension-desktop-extension-service']);
    setIsRunning(result?.stdout.trim() === 'running');
  };

  const startBackendService = async () => {
    const result = await ddClient.docker.cli.exec('container', ['start', 'oleksis_mobocker-extension-desktop-extension-service']);
    // setResponse(JSON.stringify(result));
    setResponse('Mobocker container running...')
    setIsRunning(true);
  };

  const stopBackendService = async () => {
    const result = await ddClient.docker.cli.exec('container', ['stop', 'oleksis_mobocker-extension-desktop-extension-service']);
    //setResponse(JSON.stringify(result));
    setResponse('Mobocker container exited!')
    setIsRunning(false);
  };

  const handleButtonClick = () => {
    if (isRunning) {
      stopBackendService();
    } else {
      startBackendService();
    }
  };

  React.useEffect(() => {
    checkBackendServiceStatus();
  }, []);

  return (
    <>
      <Typography variant="h3">Mobocker</Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        The dummest container, is the smaller running container to keep Docker daemon alive.
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
        Pressing the below button will start/stop the backend. The standard output
        will appear in the textarea.
      </Typography>
      <Stack direction="row" alignItems="start" spacing={2} sx={{ mt: 4 }}>
        <Button variant="contained" onClick={handleButtonClick} style={{ backgroundColor: isRunning ? 'red' : 'green' }}>
          {isRunning ? 'Stop' : 'Start'} backend
        </Button>

        <TextField
          label="Backend response"
          sx={{ width: 480 }}
          disabled
          multiline
          variant="outlined"
          minRows={5}
          value={response ?? ''}
        />
      </Stack>
    </>
  );
}
