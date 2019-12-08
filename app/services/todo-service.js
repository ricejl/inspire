import store from "../store.js";
import Todo from "../models/todo.js";

// @ts-ignore
const todoApi = axios.create({
  baseURL: "https://bcw-sandbox.herokuapp.com/api/jenny/todos/",
  timeout: 8000
});

class TodoService {
  constructor() {
    this.getTodosAsync();
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
  // FIXME clear form to reset placeholder after adding todo

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
    console.log("response from put request for todo complete/incomplete", res);
    this.getTodosAsync();
    //TODO get number of items incomplete and print number to page via controller

    // function countNumIncompleteTodos() {
    //   let numTodosIncomplete = 0;
    //   for (let i = 0; i < store.State.todos.length; i++) {
    //     if (!todo.completed) {
    //       // debugger;
    //       numTodosIncomplete++;
    //     }
    //   }
    //   return numTodosIncomplete;
    // }

    // console.log("number of incomplete todos");
    // FIXME refactor incomplete todo counter
    //TODO post to sandbox so it will draw to page
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
