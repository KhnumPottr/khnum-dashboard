for ext_host in "api.dev.plant-irrigation-service.com"
do
  HOST_IP=`/sbin/ip route|awk '/default/ { print $3 }'`
  echo "${HOST_IP} ${ext_host}" | tee -a /etc/hosts
done
exec sh -c "tail -f /dev/null;"