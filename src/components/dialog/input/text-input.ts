import {BaseComponent} from "../../component.js";
import {TextData} from "../dialog.js";

export class TextSectionInput extends BaseComponent<HTMLElement> implements TextData {
    constructor() {
        super(`
            <div>
                <div class="form__container">
                    <label for="title">Title</label>
                    <input type="text" id="title">
                </div>
                <div class="form__container">
                    <label for="body">URL</label>
                    <textarea type="text" id="body" rows="3"></textarea>
                </div>
            </div>
        `);
    }

    get title(): string {
        return this.element.querySelector<HTMLInputElement>('#title')!.value;
    }

    get body(): string {
        return this.element.querySelector<HTMLTextAreaElement>('#body')!.value;
    }
}