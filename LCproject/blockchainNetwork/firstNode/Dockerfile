FROM ethereum/client-go:v1.9.13
WORKDIR /app
ADD . /app
RUN chmod +x /app/entrypoint.sh

VOLUME "/data"
ENTRYPOINT "/app/entrypoint.sh"
EXPOSE 8545 8546 30301/udp 30301/tcp
