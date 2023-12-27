FROM golang:1.21-alpine AS builder
ENV CGO_ENABLED=0
WORKDIR /backend
COPY backend/go.* .
RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    go mod download
COPY backend/. .
RUN --mount=type=cache,target=/go/pkg/mod \
    --mount=type=cache,target=/root/.cache/go-build \
    go build -trimpath -ldflags="-s -w" -o bin/service

FROM --platform=$BUILDPLATFORM node:18.12-alpine3.16 AS client-builder
WORKDIR /ui
# cache packages in layer
COPY ui/package.json /ui/package.json
COPY ui/package-lock.json /ui/package-lock.json
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm ci
# install
COPY ui /ui
RUN npm run build

FROM scratch
LABEL org.opencontainers.image.title="Mobocker" \
    org.opencontainers.image.description="The dummest container, is the smaller running container to keep Docker daemon alive." \
    org.opencontainers.image.vendor="Oleksis Fraga" \
    org.opencontainers.image.source="https://github.com/oleksis/mobocker-extension" \
    com.docker.desktop.extension.api.version="0.3.4" \
    com.docker.extension.screenshots="[ \
    {\"alt\": \"Home page - Mobocker\", \"url\": \"https://raw.githubusercontent.com/oleksis/mobocker-extension/main/docs/images/Mobocker-Home.png\"}, \
    {\"alt\": \"Home page - Mobocker - Start backend container\", \"url\": \"https://raw.githubusercontent.com/oleksis/mobocker-extension/main/docs/images/Mobocker-Home-Start.png\"} \
    ]" \
    com.docker.desktop.extension.icon="https://raw.githubusercontent.com/oleksis/mobocker-extension/main/docker.svg" \
    com.docker.extension.detailed-description="<p><b>Mobocker</b>: It's described as the “dummest container”, and its primary function is to keep the Docker daemon alive.</p> \
    <h2 id="-features">✨ Functionality</h2> \
    <ul> \
    <li>The extension is designed to keep the Docker engine running indefinitely. It's particularly useful when the Docker Desktop GUI is in “Engine running” mode</li> \
    </ul> \
    <h2 id="-resource-saver-mode">⌛ Resource Saver Mode</h2> \
    <ul> \
    <li>If the Docker service on Windows is in “Resource Saver mode”, it automatically stops the Docker Desktop Linux VM when no containers are running for a certain period of time (default is 5 minutes).</li> \
    <li>However, if “Resource Saver mode” is on, the Docker Desktop GUI may crash and close unexpectedly</li> \
    </ul> \
    <h2 id="-pc-requirements">💻 PC requirements</h2> \
    <ul> \
    <li>Docker Desktop: <b>4.25.0</b> (126437)</li> \
    <li>RAM: <b>3MB</b></li> \
    <li>CPU: <b>2</b></li> \
    </ul>" \
    com.docker.extension.publisher-url="https://github.com/oleksis" \
    com.docker.extension.additional-urls="[ \
    {\"title\":\"Motivation\", \"url\":\"https://github.com/oleksis/Mobocker\"}, \
    {\"title\":\"Issues\", \"url\":\"https://github.com/docker/for-win/issues/13789#issuecomment-1821822102\"}, \
    {\"title\":\"Support\", \"url\":\"https://github.com/oleksis/mobocker-extension\"} \
    ]" \
    com.docker.extension.changelog="<ul>\
    <li>UI: Detect Server Engine for Docker and Podman</li> \
    </ul>" \
    com.docker.extension.categories="utilities"

COPY --from=builder /backend/bin/service /
COPY docker-compose.yaml .
COPY metadata.json .
COPY docker.svg .
COPY --from=client-builder /ui/build ui
CMD ["/service"]
