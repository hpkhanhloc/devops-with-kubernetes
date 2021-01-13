FROM ubuntu

ADD ./create_todo.sh /usr/src/create_todo.sh

RUN chmod +x /usr/src/create_todo.sh

RUN apt-get update && apt-get install -y curl && apt-get install -y postgresql-client

CMD ["/usr/src/create_todo.sh"]