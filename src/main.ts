import "./style.css";
import { getDatabase, push, ref, get, remove } from "firebase/database";
import { app } from "./firebase";

class FirebaseTodo extends HTMLElement {
  private form!: HTMLFormElement;
  private ul!: HTMLUListElement;
  private database: ReturnType<typeof getDatabase>;

  constructor() {
    super();
    this.database = getDatabase(app);
  }

  connectedCallback() {
    this.innerHTML = `
    <style>
      .flex-column {
        display: flex;
        flex-direction: column;
      }
    </style>
    <div class="flex-column">
      <form>
        <input type="text" name="title" required>
        <button type="submit">Add</button>
      </form>
      <ul></ul>
    </div>`;
    this.form = this.querySelector("form")!;
    this.ul = this.querySelector("ul")!;

    this.form.addEventListener("submit", this.handleFormSubmission);
    this.updateTodoList();
  }

  private fetchTodos() {
    return get(ref(this.database, "/todos")).then((snapshot) => {
      const data = snapshot.val() as Record<string, string> | null;
      return data ? Object.entries(data) : [];
    });
  }

  private updateTodoList() {
    this.fetchTodos().then((todos) => {
      Array.from(this.ul.children).forEach((li) => li.removeEventListener("click", this.handleLiClick));
      this.ul.innerHTML = "";
      todos.forEach(([key, todo]) => {
        const li = document.createElement("li");
        li.textContent = todo;
        li.id = key;
        li.addEventListener("click", this.handleLiClick);
        this.ul.appendChild(li);
      });
    });
  }

  private handleLiClick: EventListener = (event) => {
    const li = event.currentTarget;
    if (!(li instanceof HTMLLIElement)) throw TypeError();
    const { id } = li;
    remove(ref(this.database, `/todos/${id}`)).then(() => this.updateTodoList());
  };

  private handleFormSubmission: EventListener = (event) => {
    event.preventDefault();
    const formData = new FormData(this.form);
    const todoTitle = formData.get("title")!.toString().trim();
    if (!todoTitle) return;
    push(ref(this.database, "/todos"), todoTitle).then(() => {
      this.form.reset();
      this.updateTodoList();
    });
  };
}

window.customElements.define("firebase-todo", FirebaseTodo);
