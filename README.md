# Mobocker

## ✨ **Functionality**

- The extension is designed to keep the Docker engine running indefinitely. It's particularly useful when the Docker Desktop GUI is in _“Engine running”_ mode

## ⌛ **Resource Saver Mode**

- If the Docker service on **Windows** is in _“Resource Saver mode”_, it automatically stops the Docker Desktop Linux VM when no containers are running for a certain period of time (default is 5 minutes).
- However, if _“Resource Saver mode”_ is on, the **Docker Desktop GUI** may crash and close unexpectedly

[Docker Desktop program shuts down after a few minutes. Traced it to the Resource Saver as cause. ](https://github.com/docker/for-win/issues/13789#issuecomment-1821822102)

## 💻 **PC requirements**

- Docker Desktop: **4.25.0** (126437)
- RAM: **3MB**
- CPU: **2**
