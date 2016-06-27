# StarupProject

## Running docker container:

1. git clone https://github.com/magnusao/StarupProject.git

2. cd StarupProject

3. sudo docker build --no-cache -t "application-name:version" `.`

4. Stop already running container:
 	a. sudo docker ps
	b. sudo docker stop "containerID"

5. sudo docker run -p "port:port" "application-name:version"


## Resources

The general architecture is base on http://joelhooks.com/blog/2016/03/20/build-an-image-gallery-using-redux-saga

