export default class Todo {
  constructor(data) {
    this.id = data._id;
    this.description = data.description;
    this.user = data.user;
    this.completed = data.completed;
  }

  get Template() {
    return `
        <li><input type="checkbox" />${this.description}</li>
        `;
  }
}

//   _id: { type: String, required: true, unique: true },
//   completed: { type: Boolean, required: true, default: false },
//   user: { type: String, required: true },
//   description: {
// description: form.value,
// type: String,
// required: true
//   }
