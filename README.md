# StarupProject

## Running docker container:

1. `git clone https://github.com/magnusao/StarupProject.git`

2. `cd StarupProject`

3. `sudo docker build --no-cache -t "application-name:version" .`

4. Stop already running container:
 	a. `sudo docker ps`
	b. `sudo docker stop "containerID"`

5. `sudo docker run -p "port:port" "application-name:version"`

## Local development

For rapid development there is a live reload task that rebuilds build.js whenever changes to front end files are detected. This means you will see changes live on the page as you make changes. To start this server navigate to the root project folder and run `npm run start-reload`.

## Resources

The general architecture is base on http://joelhooks.com/blog/2016/03/20/build-an-image-gallery-using-redux-saga

