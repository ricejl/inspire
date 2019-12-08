export default class Todo {
  constructor(data) {
    this._id = data._id;
    this.description = data.description;
    this.user = data.user;
    this.completed = data.completed;
  }

  get Template() {
    let template = "";
    if (this.completed == false) {
      template = `
        <li><input type="checkbox" onclick="app.todoController.toggleTodoStatusAsync('${this._id}')"/>
        `;
    } else if (this.completed == true) {
      template = `
        <li><input type="checkbox" checked onclick="app.todoController.toggleTodoStatusAsync('${this._id}')"/>
        `;
    }
    template += `
        <label for="todo">${this.description}</label>
        <button class="btn-blank" type="button" onclick="app.todoController.removeTodoAsync('${this._id}')">
            <i class="fa fa-times"></i>
        </button>
        </li>
        `;
    return template;
  }
}

//   _id: { type: String, required: true, unique: true },
//   completed: { type: Boolean, required: true, default: false },
//   user: { type: String, required: true },
//   description: {
//      description: form.value,
//      type: String,
//      required: true
//   }
