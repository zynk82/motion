import {BaseComponent} from "../../component.js";

export class TodoComponent extends BaseComponent<HTMLElement> {
    constructor(title: string, todo: string) {
        super(`
            <section class="todo">
                <h2 class="todo__title"></h2>
                <input type="checkbox" class="todo-checkbox">
            </section>
        `);

        this.element.querySelector<HTMLHeadingElement>('.todo__title')!
            .textContent = title;

        this.element.querySelector<HTMLInputElement>('.todo-checkbox')!
            .insertAdjacentHTML('afterend', todo);
    }
}

