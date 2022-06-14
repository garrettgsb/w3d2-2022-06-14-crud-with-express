const todos = [
  "Get milk",
  "Wash car",
  "Walk dog",
];

function addTodo(todo) {
  todos.push(todo);
}

function removeTodo(idx) {
  if (!todos[idx]) throw new Error(`No todo at index ${idx}!`);
  todos.splice(idx, 1);
}

function updateTodo(idx, newText) {
  if (!todos[idx]) throw new Error(`No todo at index ${idx}!`);
  todos[idx] = newText;
}

function viewTodos() {
  return `<h1>Todos:</h1>
  <ul>
  ${todos.map((todo, idx) => `
    <li>
      ${todo} [${idx}]
      <form method='POST' action='/${idx}/update/'>
        <input name='newTodo'>
        <button>✏️</button>
      </form>
      <form method='POST' action='/${idx}/delete/'>
        <button>🚮</button>
      </form>
    </li>
  `).join('\n')}
  </ul>
  <form method='POST' action='/create'>
    <input name='newTodo'></input>
    <button>✚</button>
  </form>
  `;
}

/*
Create -> addTodo
Read -> viewTodos
Update -> updateTodo
Delete -> removeTodo
*/

const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.get('/', (request, response) => { response.send(viewTodos()) });
app.post('/create', (request, response) => {
  const { newTodo } = request.body;
  // const newTodo = request.body.newTodo;
  todos.push(newTodo);
  response.redirect('/');
});
app.post('/:idx/update', (request, response) => {
  const { idx } = request.params;
  const { newTodo } = request.body
  updateTodo(idx, newTodo);
  response.redirect('/');
});
app.post('/:idx/delete', (request, response) => {
  const { idx } = request.params;
  removeTodo(idx);
  response.redirect('/');
});
app.listen(8080, () => console.log('Express is listening on port 8080'));
