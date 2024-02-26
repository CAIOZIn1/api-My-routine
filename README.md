<h1 align='center'>COMO RODAR O <span style='color: #74E291'>PROJETO?</span></h1>

</hr>

<p>Este projeto está sendo desenvolvido com todo amor e carinho por mim &#10084; e tem como objetivo ser um semi "To Do List" das minhas atividades semanais e mensais da universidade, trabalho e estudos. Quero implementar interações com vários apps e portais para que o mesmo armazene alguns de meus arquivos de estudo, por isso as aspas no To Do List. Eu pretendo que ele seja muito mais que isso. Este é o back, to bolando ele ainda &#128512;</p>

</br>

<p> Passo 1 - Instalar dependencias: </p>

> pnpm i | yarn add | npm i

</br>

<p> Passo 2 - Rodar uma imagem Postgres no docker</p>

> docker run -p 5432:5432 -e POSTGRES_PASSWORD=123456 -d postgres

</br>

<p> Passo 3 - Criar tabela no banco</p>

> pnpm sequelize db:create
