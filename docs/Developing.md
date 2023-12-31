# Developing

- Workflow 

```powershell
docker buildx build --provenance=true --sbom=true --platform=linux/amd64,linux/arm64 --build-arg TAG=0.5.2 -t oleksis/mobocker-extension:0.5.2 .

docker extension update oleksis/mobocker-extension:0.5.2 -f

docker extension dev debug  oleksis/mobocker-extension:0.5.2

docker buildx build --push --provenance=true --sbom=true --platform=linux/amd64,linux/arm64 --build-arg TAG=0.5.2 -t oleksis/mobocker-extension:0.5.2 .
```

## Fronted

- Font size

```javascript
const getFontSize = (fontSize) => { return window.getComputedStyle($0, null).getPropertyValue('font-size')};
```

## Docker

- Events

```powhershell
docker events --filter container=oleksis_mobocker-extension-desktop-extension-service
```
