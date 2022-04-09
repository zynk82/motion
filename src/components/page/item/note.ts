import {BaseComponent} from "../../component.js";

export class NoteComponent extends BaseComponent<HTMLElement> {
    constructor(title: string, body: string) {
        super(`
            <section class="note">
                <h2 class="note__title"></h2>
                <p class="note__body"></p>
            </section>
        `);

        this.element.querySelector<HTMLHeadingElement>('.note__title')!.textContent = title;
        this.element.querySelector<HTMLParagraphElement>('.note__body')!.textContent = body;
    }
}

