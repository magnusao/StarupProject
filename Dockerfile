# Set the base image to Ubuntu
FROM    node

# File Author / Maintainer
MAINTAINER Alfredo Clemente

# Install Node.js and other dependencies
RUN git clone https://github.com/magnusao/StarupProject.git && \
    cd StarupProject && \
	npm --loglevel=silent install


WORKDIR /StarupProject

RUN npm run build

# Expose port
EXPOSE  1337


CMD ["npm", "start"]
