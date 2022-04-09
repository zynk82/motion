import {PageComponent} from "./components/page/page.js";
import {ImageComponent} from "./components/page/item/image.js";
import {NoteComponent} from "./components/page/item/note.js";
import {TodoComponent} from "./components/page/item/todo.js";

class App {
    private readonly page: PageComponent;

    constructor(appRoot: HTMLElement) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot)

        const image = new ImageComponent('Image Title', 'https://i.picsum.photos/id/889/300/200.jpg?hmac=37CVwgMHa5D9vJbXmj0Ajy3IAANPZfE9mbNwnJlFvh4');
        image.attachTo(appRoot, 'beforeend');

        const note = new NoteComponent('Note Title', 'Note Body');
        note.attachTo(appRoot, 'beforeend');

        const todo = new TodoComponent('Todo Title', 'Todo Item');
        todo.attachTo(appRoot, 'beforeend');
    }
}

new App(document.querySelector('.document')! as HTMLElement);