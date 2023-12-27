# Podman Desktop

```powershell
# podman machine rm
# podman machine init
# podman machine start
# podman machine ssh
$Env:DOCKER_HOST = 'npipe:////./pipe/podman-machine-default'
podman system connection list
echo <KEY_OAUTH> |  | podman secret create quayio -
podman login --secret quayio -u oleksis quay.io
podman push quay.io/oleksis/mobocker-extension
➜ docker version --format '{{(index .Server.Components 0).Name}}'
Podman Engine
```

## Powershell

Check the networks pipes exists

```powershell
➜ [System.IO.Directory]::GetFiles("\\.\\pipe\\") | findstr podman
\\.\\pipe\\podman-machine-default

➜ podman machine inspect --format '{{.ConnectionInfo.PodmanPipe.Path}}'
```
