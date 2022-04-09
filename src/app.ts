import {Composable, PageComponent, PageItemComponent} from "./components/page/page.js";
import {ImageComponent} from "./components/page/item/image.js";
import {Component} from "./components/component.js";
import {InputDialog} from "./components/dialog/dialog.js";
import {MediaSectionInput} from "./components/dialog/input/media-input.js";
import {TextSectionInput} from "./components/dialog/input/text-input.js";
import {InputComponent} from "./components/dialog/input/input-component.js";
import {VideoComponent} from "./components/page/item/video.js";
import {NoteComponent} from "./components/page/item/note.js";
import {TodoComponent} from "./components/page/item/todo.js";

class App {
    private readonly page: Component & Composable;

    constructor(appRoot: HTMLElement, body: HTMLBodyElement) {
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot, 'afterbegin')

        // this.page.addChild(
        //     new VideoComponent(
        //         'Video Title'
        //         , 'url')
        // );
        //
        // this.page.addChild(
        //     new NoteComponent('Note Title'
        //         , 'Note Body')
        // );
        //
        // this.page.addChild(
        //     new TodoComponent('Todo Title'
        //         , 'Todo Item')
        // );

        document.querySelectorAll<HTMLButtonElement>('header button').forEach((btn) => {
            btn.addEventListener('click', this.onMenuClick.bind(this));
        });
        // document.querySelector<HTMLButtonElement>('#new-image')!
        //     .addEventListener('click', this.onMenuClick.bind(this));
    }

    private onMenuClick(e: Event): void {
        const target = e.target as HTMLElement;

        let inputComponent!: InputComponent<HTMLElement>;

        switch (target.id) {
            case 'new-image':
                inputComponent = new MediaSectionInput();
                break;
            case 'new-video':
                inputComponent = new MediaSectionInput();
                break;
            case 'new-note':
                inputComponent = new TextSectionInput();
                break;
            case 'new-todo':
                inputComponent = new TextSectionInput();
                break;
            default:
                return;
        }

        const dialog = new InputDialog();
        dialog
            .setParent(document.querySelector<HTMLBodyElement>('body')!)
            .addChild(inputComponent)
            .setOnCloseListener(() => {
                dialog.removeFrom();
            })
            .setOnSubmitListener(() => {
                switch (target.id) {
                    case 'new-image':
                        this.page.addChild(
                            new ImageComponent(inputComponent.title, inputComponent.url)
                        );
                        break;
                    case 'new-video':
                        this.page.addChild(
                            new VideoComponent(inputComponent.title, inputComponent.url)
                        );
                        break;
                    case 'new-note':
                        this.page.addChild(
                            new NoteComponent(inputComponent.title, inputComponent.body)
                        );
                        break;
                    case 'new-todo':
                        this.page.addChild(
                            new TodoComponent(inputComponent.title, inputComponent.body)
                        );
                        break;
                    default:
                        return;
                }

                dialog.removeFrom();
            })
            .attachTo();
    }

}

new App(
    document.querySelector<HTMLElement>('.document')!
    , document.querySelector<HTMLBodyElement>('body')!
);