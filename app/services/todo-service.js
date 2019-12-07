import store from "../store.js";
import Todo from "../models/todo.js";

// @ts-ignore
const todoApi = axios.create({
  baseURL: "https://bcw-sandbox.herokuapp.com/api/jenny/todos/",
  timeout: 8000
});

class TodoService {
  async getTodos() {
    console.log("Getting the Todo List");
    let res = await todoApi.get();
    let todos = res.data.data.map(todo => new Todo(todo));
    store.commit("todos", todos);
  }

  async addTodoAsync(todo) {
    let res = await todoApi.post("", todo);
    this.getTodos();
  }

  async toggleTodoStatusAsync(todoId) {
    let todo = store.State.todos.find(todo => todo._id == todoId);
    console.log("todo with matching id", todo);
    //TODO Make sure that you found a todo,
    //		and if you did find one
    //		change its completed status to whatever it is not (ex: false => true or true => false)
    if (todo.completed == false) {
      todo.completed = true;
    } else if (todo.completed == true) {
      todo.completed = false;
    }
    // FIXME how can I express this as a ternary?
    // todo.completed == false ? todo.completed = true :
    // todo.completed == true ? todo.completed = false
    // FIXME possible to use .checked? How?
    // let completeStatus = document.getElementById("check").checked;
    // console.log("checked?", completeStatus);

    let res = await todoApi.put(todoId, todo);
    //TODO do you care about this data? or should you go get something else?
    //TODO get number of items incomplete and print number to page via controller
    console.log("response from put request for todo complete/incomplete", res);
    this.getTodos();
  }

  async removeTodoAsync(todoId) {
    //TODO Work through this one on your own
    //		what is the request type
    //		once the response comes back, what do you need to insure happens?
  }
}

const todoService = new TodoService();
export default todoService;
