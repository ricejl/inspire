export default class Quote {
  constructor(data) {
    this.quote = data.body;
    this.author = data.author;
  }

  get Template() {
    return `
        <div class="bg-dark-transparent text-white p-3">
          <p>${this.quote}</p>
          <p class="text-muted">${this.author}</p>
        </div>
        `;
  }
}
