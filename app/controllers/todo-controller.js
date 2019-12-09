import TodoService from "../services/todo-service.js";
import store from "../store.js";

//TODO Create the render function
function _drawTodos() {
  let template = "";
  store.State.todos.map(todo => (template += todo.Template));
  document.getElementById("todos").innerHTML = template;
}

function _drawIncompleteTodos() {
  let incompleteTodos = store.State.incompleteTodos.toString();
  console.log("incomplete todos in draw fn", incompleteTodos);
  document.getElementById(
    "incomplete-todos"
  ).innerHTML = store.State.incompleteTodos.toString();
}
// FIXME this is not being called - console logs show up for drawTodos fn but not drawIncompleteTodos
// After calling it directly in constructor it displays as [object Object on page], probably bc it's not explicitly stored in sandbox and incomplete/complete fn needs time to process since it depends on api

//make draw fn for incomplete todos and register subscriber

export default class TodoController {
  constructor() {
    //TODO Remember to register your subscribers
    TodoService.getTodosAsync();
    store.subscribe("todos", _drawTodos);
    store.subscribe("incompleteTodos", _drawIncompleteTodos);
    // _drawIncompleteTodos();
  }

  async addTodoAsync(e) {
    e.preventDefault();
    let form = e.target;
    console.log("data coming in from form", e.target);
    let todo = {
      //NOTE where is where you build the todo object from the data that comes into this method
      description: form.todo.value
    };
    try {
      await TodoService.addTodoAsync(todo);
    } catch (error) {
      debugger;
      console.error("[ERROR]:", error);
    }
  }

  //NOTE This method will pass an Id to your service for the TODO that will need to be toggled
  async toggleTodoStatusAsync(todoId) {
    try {
      await TodoService.toggleTodoStatusAsync(todoId);
    } catch (error) {
      debugger;
      console.error("[ERROR]:", error);
    }
  }

  async numIncompleteTodosAsync() {
    try {
      await TodoService.numIncompleteTodosAsync();
    } catch (error) {
      console.error("[ERROR}:", error);
    }
  }

  //NOTE This method will pass an Id to your service for the TODO that will need to be deleted
  async removeTodoAsync(todoId) {
    try {
      await TodoService.removeTodoAsync(todoId);
    } catch (error) {
      debugger;
      console.error("[ERROR]:", error);
    }
  }
}
