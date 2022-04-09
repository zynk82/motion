import {BaseComponent} from "../../component.js";

export class ImageComponent extends BaseComponent<HTMLElement> {
    constructor(title: string, url: string) {
        const html = `
            <section class="image">
                <div class="image__holder">
                    <img class="image__thumbnail">
                    <h2 class="image__title"></h2>
                </div>
            </section>`;

        super(html);

        const imageElement = this.element.querySelector('.image__thumbnail')! as HTMLImageElement;
        imageElement.src = url;
        imageElement.alt = title;

        const titleElement = this.element.querySelector('.image__title')! as HTMLParagraphElement;
        titleElement.textContent = title;
    }
}