export interface Component {
    attachTo(parent: HTMLElement, position?: InsertPosition): void;

    removeFrom(parent: HTMLElement): void;

    attach(component: Component, position?: InsertPosition): void
}

export class BaseComponent<T extends HTMLElement> implements Component {
    protected readonly element: T;

    constructor(htmlString: string) {
        const template = document.createElement('template');
        template.innerHTML = htmlString;

        this.element = template.content.firstElementChild as T;
    }

    addClass(className: string): void {
        this.element.classList.add(className);
    }

    removeClass(className: string): void {
        this.element.classList.remove(className);
    }

    setAttribute(field: string, value: string): void {
        this.element.setAttribute(field, value);
    }

    removeAttribute(field: string): void {
        this.element.removeAttribute(field);
    }

    attachTo(parent?: HTMLElement, position: InsertPosition = 'beforeend') {
        parent?.insertAdjacentElement(position, this.element)
    }

    removeFrom(parent: HTMLElement) {
        if (parent !== this.element.parentElement) {
            throw new Error('Parent mismatch!');
        }

        parent.removeChild(this.element);
    }

    attach(component: Component, position?: InsertPosition): void {
        component.attachTo(this.element, position);
    }
}