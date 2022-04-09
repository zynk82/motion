import {BaseComponent, Component} from "../component.js";
import {Composable} from "../page/page.js";

type OnCloseListener = () => void;
type OnSubmitListener = () => void;

export interface Inputtable {
    get title(): string;

    get url(): string;

    get body(): string;
}

export class InputDialog extends BaseComponent<HTMLElement> implements Composable {
    private closeListener?: OnCloseListener;
    private submitListener?: OnSubmitListener;
    private _parent?: HTMLElement;

    setOnCloseListener(value: OnCloseListener): InputDialog {
        this.closeListener = value;
        return this;
    }

    setOnSubmitListener(value: OnSubmitListener): InputDialog {
        this.submitListener = value;
        return this;
    }

    setParent(parent: HTMLElement): InputDialog {
        this._parent = parent;
        return this;
    }

    constructor() {
        super(`
            <dialog class="dialog">
                <div class="dialog__container">
                    <button class="close">&times;</button>
                    <div id="dialog__body"></div>
                    <button class="dialog__submit">ADD</button>
                </div>
            </dialog>
        `);

        this.element.querySelector<HTMLElement>('.close')!.onclick = () => {
            this.closeListener && this.closeListener();
        }

        this.element.querySelector<HTMLElement>('.dialog__submit')!.onclick = () => {
            this.submitListener && this.submitListener();
        }
    }

    addChild(child: Component): InputDialog {
        // child.attachTo(this.element);
        child.attachTo(this.element.querySelector('#dialog__body')!);

        return this;
    }

    attachTo(parent?: HTMLElement, position: InsertPosition = 'beforeend') {
        this._parent?.insertAdjacentElement(position, this.element)
    }

    removeFrom(parent?: HTMLElement) {
        this._parent?.removeChild(this.element);
    }
}