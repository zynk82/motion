export class ImageComponent {
    private element: HTMLDivElement;
    private image: HTMLImageElement;

    constructor() {
        const url: string = 'https://i.picsum.photos/id/889/300/200.jpg?hmac=37CVwgMHa5D9vJbXmj0Ajy3IAANPZfE9mbNwnJlFvh4';

        this.image = document.createElement('img') as HTMLImageElement;
        this.image.setAttribute('src', url);

        this.element = document.createElement('div');
        this.element.setAttribute('class', 'image');
        this.element.appendChild(this.image);
    }

    attachTo(parent: HTMLElement, postion: InsertPosition = 'beforeend') {
        parent.insertAdjacentElement(postion, this.element);
    }
}