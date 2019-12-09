import store from "../store.js";
import Todo from "../models/todo.js";

// @ts-ignore
const todoApi = axios.create({
  baseURL: "https://bcw-sandbox.herokuapp.com/api/jenny/todos/",
  timeout: 8000
});

class TodoService {
  constructor() {
    this.numIncompleteTodosAsync();
  }
  async getTodosAsync() {
    console.log("Getting the Todo List");
    let res = await todoApi.get();
    let todos = res.data.data.map(todo => new Todo(todo));
    store.commit("todos", todos);
  }

  async addTodoAsync(todo) {
    let res = await todoApi.post("", todo);
    console.log(res);
    this.getTodosAsync();
  }

  async toggleTodoStatusAsync(todoId) {
    let todo = store.State.todos.find(todo => todo._id == todoId);
    console.log("todo with matching id", todo);
    //TODO Make sure that you found a todo,
    //		and if you did find one
    //		change its completed status to whatever it is not (ex: false => true or true => false)
    todo.completed = !todo.completed;

    // if (todo.completed == false) {
    //   todo.completed = true;
    // } else if (todo.completed == true) {
    //   todo.completed = false;
    // }

    // NOTE possible to use .checked? How? must get controller to get this info and pass it down. service doesn't have access to the DOM (or it shouldn't)
    // let completeStatus = document.getElementById("check").checked;
    // console.log("checked?", completeStatus);

    let res = await todoApi.put(todoId, todo);
    //TODO do you care about this data? or should you go get something else?
    console.log("response from put request for todo complete/incomplete", res);
    this.getTodosAsync();
    console.log("store within todo toggler", store.State.todos);
    this.numIncompleteTodosAsync();
  }

  async numIncompleteTodosAsync() {
    await this.getTodosAsync();
    let incompleteTodos = store.State.todos.filter(todo => !todo.completed);
    console.log("num incomplete todos", incompleteTodos.length);
    store.commit("incompleteTodos", incompleteTodos.length);
    console.log("updated store incomplete todos", store.State.incompleteTodos);
  }

  async removeTodoAsync(todoId) {
    let deleteTodo = store.State.todos.find(todo => todoId == todo._id);
    console.log("todo to delete", deleteTodo);
    let res = await todoApi.delete(deleteTodo._id);
    console.log(res);
    this.getTodosAsync();
  }
}

const todoService = new TodoService();
export default todoService;
