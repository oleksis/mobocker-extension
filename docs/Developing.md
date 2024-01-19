# Developing

- Workflow 

```powershell
docker buildx build --provenance=true --sbom=true --platform=linux/amd64,linux/arm64 --build-arg TAG=0.7.0 -t oleksis/mobocker-extension:0.7.0 .

docker extension update oleksis/mobocker-extension:0.7.0 -f

docker extension dev debug  oleksis/mobocker-extension:0.7.0

docker extension dev ui-source oleksis/mobocker-extension http://localhost:3000

docker buildx build --push --provenance=true --sbom=true --platform=linux/amd64,linux/arm64 --build-arg TAG=0.7.0 -t oleksis/mobocker-extension:0.7.0 .
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
