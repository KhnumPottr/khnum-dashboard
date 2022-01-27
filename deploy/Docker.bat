ECHO Building docker container
docker build -t khnum-dashboard .

ECHO Launching docker container
docker run -d -p 3000:3000 khnum-dashboard