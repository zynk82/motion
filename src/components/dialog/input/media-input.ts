import {Inputtable} from "../dialog.js";
import {InputComponent} from "./input-component.js";

export class MediaSectionInput extends InputComponent<HTMLElement> implements Inputtable {
    constructor() {
        super(`
            <div>
                <div class="form__container">
                    <label for="title">Title</label>
                    <input type="text" id="title">
                </div>
                <div class="form__container">
                    <label for="url">URL</label>
                    <input type="text" id="url">
                </div>
            </div>
        `);
    }

    get title(): string {
        return this.element.querySelector<HTMLInputElement>('#title')!.value;
    }

    get url(): string {
        return this.element.querySelector<HTMLInputElement>('#url')!.value;
    }

    get body(): string {
        return '';
    }
}