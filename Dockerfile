# Set the base image to Ubuntu
FROM    node

# File Author / Maintainer
MAINTAINER Alfredo Clemente

# Install Node.js and other dependencies
RUN git clone https://github.com/magnusao/StarupProject.git && \
    cd StarupProject && \
	npm install && \
	npm run build
	
	
WORKDIR /StarupProject

# Expose port
EXPOSE  3000


CMD ["npm", "start"]