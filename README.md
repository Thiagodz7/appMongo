# appMongo

essa aplicação roda em container, necessário seguir os passos abaixos caso usar em container:

Antes de rodar o comando docker-compose up, criar a imagem da aplicação. 
caso for fazer fora do container será necessário fazer npm instal mongodb manualmente, 
outra observação, a porta do container que o docker jogou para mim automaticamente foi a 172.20.0.2 ao invés de "localhost", 
descobri isso através do comando "docker inspect nome-container", por isso na string de conexão está esse numero, 
mas isso só acontece quando lançado os dois em container, quando feito a aplicação node manualmente tudo ocorre normal.
