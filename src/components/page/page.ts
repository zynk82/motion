import {BaseComponent, Component} from "../component.js";

export interface Composable {
    addChild(child: Component): void;
}

interface SectionContainer extends Component, Composable {
    setOnCloseListener(listener: OnCloseListener): void;
}

type OnCloseListener = () => void;

type SectionContainerConstructor = {
    new(): SectionContainer;
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
    constructor(private pageItemConstructor: SectionContainerConstructor) {
        super(`
            <ul class="page"></ul>
        `);
    }

    addChild(section: Component) {
        const item = new this.pageItemConstructor;
        item.addChild(section);
        item.attachTo(this.element);
        item.setOnCloseListener(() => {
            item.removeFrom(this.element);
        });
    };
}

export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer {
    private closeListener?: OnCloseListener;

    setOnCloseListener(listener: OnCloseListener) {
        this.closeListener = listener;
    }

    constructor() {
        super(`
            <li class="page-item">
                <section class="page-item__body"></section>
                <div class="page-item__controls">
                    <button class="close">&times;</button>
                </div>
            </li>
        `);

        const closeBtn = this.element.querySelector<HTMLButtonElement>('.close')!;
        closeBtn.onclick = () => {
            this.closeListener && this.closeListener();
        };
    }

    addChild(child: Component) {
        const container = this.element.querySelector<HTMLElement>('.page-item__body')!;
        child.attachTo(container);
    }
}

