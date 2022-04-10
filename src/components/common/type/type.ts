export interface Draggable {
    onDragStart(e: DragEvent): void;

    onDragEnd(e: DragEvent): void;
}

export interface Hoverable {
    onDragEnter(e: DragEvent): void;

    onDragLeave(e: DragEvent): void;
}

export interface Droppable {
    onDragOver(e: DragEvent): void;

    onDrop(e: DragEvent): void;
}