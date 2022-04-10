import {BaseComponent, Component} from "../component.js";

export interface Composable {
    addChild(child: Component): void;
}

interface SectionContainer extends Component, Composable {
    setOnCloseListener(listener: OnCloseListener): void;

    setOnDragStateListener(listener: OnDragStateListener<PageItemComponent>): void;

    getBoundingRect(): DOMRect;
}

type DragState = 'start' | 'stop' | 'enter' | 'leave';

type OnDragStateListener<T extends Component> = (target: T, state: DragState, e: DragEvent) => void;

type OnCloseListener = () => void;

type SectionContainerConstructor = {
    new(): SectionContainer;

}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
    private children = new Set<SectionContainer>();
    private dragTarget?: PageItemComponent;
    private dropTarget?: PageItemComponent;

    constructor(private pageItemConstructor: SectionContainerConstructor) {
        super(`
            <ul class="page"></ul>
        `);
    }

    private changeItemIndex(e: DragEvent) {
        console.log('drop', this.dropTarget, this.dragTarget);

        if (!this.dropTarget || !this.dragTarget || this.dropTarget === this.dragTarget) {
            return;
        }

        const dropRect: DOMRect = this.dropTarget.getBoundingRect();
        const baseLine: number = dropRect.y + dropRect.height / 2;

        let position: InsertPosition;

        if (e.clientY < baseLine) {
            position = "beforebegin";

        } else {
            position = "afterend";

        }

        this.dragTarget.removeFrom(this.element);
        this.dropTarget.attach(this.dragTarget, position);
    }

    addChild(section: Component) {
        const item = new this.pageItemConstructor;
        item.addChild(section);
        item.attachTo(this.element);
        this.children.add(item);
        item.setOnCloseListener(() => {
            item.removeFrom(this.element);
            this.children.delete(item);
        });
        item.setOnDragStateListener((target: PageItemComponent, state: DragState, e: DragEvent) => {
            // console.log(state, this.dropTarget, this.dragTarget);

            const classLifted: string = 'lifted';
            const classLower: string = 'lower';
            const classDropArea: string = 'drop-area';

            switch (state) {
                case "start":
                    this.dragTarget = target;
                    this.dragTarget.addClass(classLifted);
                    this.dragTarget?.removeClass(classLower);

                    this.hideItem(this.dragTarget);

                    break;
                case "stop":
                    this.dragTarget?.removeClass(classLifted);
                    this.dropTarget?.removeClass(classDropArea);

                    this.changeItemIndex(e);
                    this.showItem(this.dragTarget);

                    this.dragTarget?.addClass(classLower);
                    this.dragTarget = undefined;

                    break;
                case "enter":
                    this.dropTarget = target;
                    this.dropTarget?.addClass(classDropArea);
                    this.dropTarget?.removeClass(classLower);

                    break;
                case "leave":
                    this.dropTarget?.removeClass(classDropArea);

                    this.dropTarget = undefined;
                    break;
                default :
                    throw new Error(`unsupported state : ${state}`)
            }
        });
    };

    private showItem(component?: PageItemComponent) {
        // component?.removeClass('hide');
    }

    private hideItem(component?: PageItemComponent) {
        // component?.addClass('hide');
    }
}

export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer {
    private closeListener?: OnCloseListener;

    private dragStateListener?: OnDragStateListener<PageItemComponent>;

    setOnCloseListener(listener: OnCloseListener) {
        this.closeListener = listener;
    }

    constructor() {
        super(`
            <li draggable="true" class="page-item">
                <section class="page-item__body"></section>
                <div class="page-item__controls">
                    <button class="close">&times;</button>
                </div>
            </li>
        `);


        this.element.addEventListener('dragstart', (e: DragEvent) => {
            this.modifyDragObserver('start', e);
        });

        this.element.addEventListener('dragend', (e: DragEvent) => {
            this.modifyDragObserver('stop', e);
        });

        this.element.addEventListener('dragenter', (e: DragEvent) => {
            this.modifyDragObserver('enter', e);
        });

        this.element.addEventListener('dragleave', (e: DragEvent) => {
            const domRect: DOMRect = this.element.getBoundingClientRect();

            if (e.clientX === 0 && e.clientY === 0) {
                return;
            }

            if (e.clientX < domRect.left
                || domRect.right < e.clientX
                || e.clientY < domRect.top
                || domRect.bottom < e.clientY) {
                this.modifyDragObserver('leave', e);
            }
        });

        const closeBtn = this.element.querySelector<HTMLButtonElement>('.close')!;
        closeBtn.onclick = () => {
            this.closeListener && this.closeListener();
        };
    }

    private modifyDragObserver(state: DragState, e: DragEvent) {
        this.dragStateListener && this.dragStateListener(this, state, e);
    }

    setOnDragStateListener(listener: OnDragStateListener<PageItemComponent>): void {
        this.dragStateListener = listener;
    }

    getBoundingRect(): DOMRect {
        return this.element.getBoundingClientRect();
    }

    addChild(child: Component) {
        const container = this.element.querySelector<HTMLElement>('.page-item__body')!;
        child.attachTo(container);
    }
}

