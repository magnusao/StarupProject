# StarupProject

Running docker container:

1. git clone https://github.com/magnusao/StarupProject.git

2. (sudo) docker build --no-cache -t <application-name:version>

3. Stop already running container:
	a. (sudo) docker ps
	b. (sudo) docker stop <containerID>

4. (sudo) docker run -p <port>:<port> <application-name:version>