import {BaseComponent} from "../../component.js";

export abstract class InputComponent<T extends HTMLElement> extends BaseComponent<T> {
    abstract get title(): string

    abstract get url(): string;

    abstract get body(): string;
}