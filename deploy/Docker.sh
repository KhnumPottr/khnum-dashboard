docker container stop KhnumDashboard
docker image rm khnum-dashboard

docker build -t khnum-dashboard .

docker run -d -name KhnumDashboard -p 3000:3000 khnum-dashboard