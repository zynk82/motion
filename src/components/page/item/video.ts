import {BaseComponent} from "../../component.js";

export class VideoComponent extends BaseComponent<HTMLElement> {
    constructor(title: string, url: string) {
        super(`
            <section class="video">
                <div class="video__player">
                    <iframe class="video__iframe"/>
                    </iframe>
                </div>
                <h3 class="page-item__title video__title"></h3>
            </section>
        `);

        const iframe = this.element.querySelector<HTMLIFrameElement>('.video__iframe')!;
        iframe.src = this.convertToEmbededURL("https://www.youtube.com/embed/FQPlEnKav48");

        this.element.querySelector<HTMLHeadingElement>('.video__title')!.textContent = title;
    }

    private convertToEmbededURL(url: string): string {
        const regExp: string = '^(?:https?:\\/\\/)?(?:www\\.)?(?:(?:youtube\\.com\\/)(?:(?:watch\\??[vd]?=]?)|(?:embed\\/))([a-zA-Z0-9-]{11})|(?:youtu\\.be\\/)([a-zA-Z0-9-]{11}))';
        const match: RegExpMatchArray | null = url.match(regExp);

        let videoId: string | undefined = match ? match[1] || match[2] : undefined;

        if (videoId) {
            return `https://www.youtube.com/embed/` + videoId;
        }

        return url;
    }
}
