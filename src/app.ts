import {Composable, PageComponent, PageItemComponent} from "./components/page/page.js";
import {ImageComponent} from "./components/page/item/image.js";
import {Component} from "./components/component.js";
import {InputDialog, MediaData, TextData} from "./components/dialog/dialog.js";
import {MediaSectionInput} from "./components/dialog/input/media-input.js";
import {TextSectionInput} from "./components/dialog/input/text-input.js";
import {VideoComponent} from "./components/page/item/video.js";
import {NoteComponent} from "./components/page/item/note.js";
import {TodoComponent} from "./components/page/item/todo.js";

type InputComponentConstructor<T = Component & (MediaData | TextData)> = {
    new(): T
};

class App {
    private readonly page: Component & Composable;

    constructor(appRoot: HTMLElement, body: HTMLBodyElement) {
        this.page = new PageComponent(PageItemComponent);
        this.page.attachTo(appRoot, 'afterbegin')

        this.page.addChild(new NoteComponent('title1', 'body'));
        this.page.addChild(new NoteComponent('title2', 'body'));
        this.page.addChild(new NoteComponent('title3', 'body'));
        this.page.addChild(new NoteComponent('title4', 'body'));
        this.page.addChild(new NoteComponent('title5', 'body'));
        this.page.addChild(new NoteComponent('title6', 'body'));
        this.page.addChild(new NoteComponent('title7', 'body'));
        this.page.addChild(new NoteComponent('title8', 'body'));
        this.page.addChild(new NoteComponent('title9', 'body'));
        this.page.addChild(new NoteComponent('title10', 'body'));
        this.page.addChild(new NoteComponent('title11', 'body'));

        this.bindElementToDialog<MediaSectionInput>(
            '#new-image'
            , MediaSectionInput
            , (inputComponent: MediaSectionInput) => new ImageComponent(inputComponent.title, inputComponent.url)
        );

        this.bindElementToDialog<MediaSectionInput>(
            '#new-video'
            , MediaSectionInput
            , (inputComponent: MediaSectionInput) => new VideoComponent(inputComponent.title, inputComponent.url)
        );

        this.bindElementToDialog<TextSectionInput>(
            '#new-note'
            , TextSectionInput
            , (inputComponent: TextSectionInput) => new NoteComponent(inputComponent.title, inputComponent.body)
        );

        this.bindElementToDialog<TextSectionInput>(
            '#new-todo'
            , TextSectionInput
            , (inputComponent: TextSectionInput) => new TodoComponent(inputComponent.title, inputComponent.body)
        );
    }

    private bindElementToDialog<T extends Component & (MediaData | TextData)>(
        selector: string
        , InputSectionComponent: InputComponentConstructor<T>
        , makeSection: (inputComponent: T) => Component
    ) {
        document.querySelector<HTMLButtonElement>(selector)!
            .addEventListener('click', () => {
                const input = new InputSectionComponent();

                const dialog = new InputDialog();
                dialog
                    .setParent(document.querySelector<HTMLBodyElement>('body')!)
                    .addChild(input)
                    .setOnCloseListener(() => {
                        dialog.removeFrom();
                    })
                    .setOnSubmitListener(() => {
                        this.page.addChild(makeSection(input));

                        dialog.removeFrom();
                    })
                    .attachTo();
            });
    }
}

new App(
    document.querySelector<HTMLElement>('.document')!
    , document.querySelector<HTMLBodyElement>('body')!
);