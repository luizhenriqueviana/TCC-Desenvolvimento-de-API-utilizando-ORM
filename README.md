# fastfeetWeb

backend e frontend web da aplicação fastfeet, que é uma aplicação sobre o controle de uma transportadora.

# :star: Funcionalidades

- Cadastro/Edição/Listagem/exclusão de Entregadores
- Cadastro/Edição/Listagem/exclusão de Encomendas
- Cadastro/Edição/Listagem/exclusão de Destinatários

# :gear: Tecnologias

- ReactJS
- Node.js
- Postgres
- Sequelize
- Styled-Components
- Redux/Sagas

## COMO INSTALAR E RODAR A APLICAÇÃO NA SUA MAQUINA

Você precisará ter instalado na sua máquina o Node.js,Yarn, Docker,Insomnia Postbird e VScode. Feitas as configurações, seguem os passos para executar o backend da aplicação:

Iremos instalar a imagem do bancos de dados Postgres, para armazenar nossas tabelas.Abaixo, seguem os respectivos comandos para realizar o download:

Abra a sua pasta no vscode onde contem a pasta backend e frontend. Primeiro iremos resolver o backend.

Clique com o botão direito em cima da pasta backend e depois clique na opção **Open in Terminal**. Aparecerá um terminal na parte baixo referente a esta pasta.
copie e cole esse trecho abaixo no seu terminal e ele irá baixar a imagem do postgres:

> docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

Após o download digite docker ps -a e verá algumas informações sobre os containers do docker que estão no seu computador.

Depois de baixado e instalado o Postbird. Abra-o e aparecerá alguns campos para preenchermos.
Ficará assim:

- Host: localhost
- Port:5432
- Username:postgres
- Password:docker

clique em Test Connection e se tudo deu certo aparecerá uma mensagem dizendo que a conexão foi um sucesso.
Clique em **connect** e em **Select database** clique em **Create Database** e dê o nome de **FastFeet**.

Digite o comando `yarn` para fazer o dowload de todas as dependências necessárias para executar o projeto.

Execute as migrations para que as tabelas sejam criadas:

- yarn sequelize db:migrate

Execute os seeds para que já sejas criado dados no banco:

- yarn sequelize db:seed:all

_Com isso, você terá um usuário administrador com email admin@fastfeet.com e a senha 123456 para fazer autenticação._

Abra o Insomnia que será nosso programa para gerenciar nossas rotas e importe o arquivo json que tem o nome de **Insomnia_2020-06-16.json**. O Insomnia irá carregar todas a rotas do projeto. 

Após isso, execute `yarn dev` para que o backend esteja funcionando.

Agora será a parte do frontend , essa parte é mais simples.
Faremos como no inicio, clique com o botão direito em cima da pasta frontend e depois clique na opção **Open in Terminal**. Aparecerá um terminal na parte baixo referente a esta pasta.

Digite o comando `yarn` para fazer o dowload de todas as dependências necessárias para executar o projeto;

Digite `yarn start` abrirá uma aba para digitarmos nosso email e senha.
