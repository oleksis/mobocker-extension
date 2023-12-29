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

## Build

```powershell
podman build -f podman/Containerfile --platform=linux/amd64,linux/arm64 --build-arg TAG=0.5.1 -t quay.io/oleksis/mobocker-extension:0.5.1 .

podman push quay.io/oleksis/mobocker-extension:0.5.1
```

## Powershell

Check the networks pipes exists

```powershell
➜ [System.IO.Directory]::GetFiles("\\.\\pipe\\") | findstr podman
\\.\\pipe\\podman-machine-default

➜ podman machine inspect --format '{{.ConnectionInfo.PodmanPipe.Path}}'
```

## Container Registry

```bash
openssl req -newkey rsa:4096 -nodes -sha256 -keyout /opt/registry/certs/luna.key -x509 -days 365 -out /opt/registry/certs/luna.crt

ls /opt/registry/certs 
cp /opt/registry/certs/luna.crt /etc/pki/ca-trust/source/anchors/

systemctl restart httpd

openssl s_client -connect luna:5000 -servername luna

podman run --name luna \
-p 5000:5000 \
-v /opt/registry/data:/var/lib/registry:z \
-v /opt/registry/auth:/auth:z \
-e "REGISTRY_AUTH=htpasswd" \
-e "REGISTRY_AUTH_HTPASSWD_REALM=Registry Realm" \
-e REGISTRY_AUTH_HTPASSWD_PATH=/auth/htpasswd \
-v /opt/registry/certs:/certs:z \
-e "REGISTRY_HTTP_TLS_CERTIFICATE=/certs/luna.crt" \
-e "REGISTRY_HTTP_TLS_KEY=/certs/luna.key" \
-e REGISTRY_COMPATIBILITY_SCHEMA1_ENABLED=true \
-d \
docker.io/library/registry:latest
```

## Kubernetes

```powershell
kind create cluster
kubectl cluster-info --context kind-kind
kind get clusters
kubectl get nodes
kubectl run nginx-kind-test --image=nginx
```

## Links

- [](https://www.redhat.com/sysadmin/simple-container-registry)
- [](https://kind.sigs.k8s.io/docs/user/ingress/)
- [](https://kind.sigs.k8s.io/docs/user/local-registry/)
