interface UIToolkit {
    drawBorder(): void;
    drawImage(src: string): void;
    drawText(text: string): void;
}

abstract class UIElement {
    constructor(public toolkit: UIToolkit) { }
    abstract render(): void;
}

class TextElement extends UIElement {
    constructor(public text: string, toolkit: UIToolkit) {
        super(toolkit);
    }

    render(): void {
        this.toolkit.drawText(this.text);
    }
}

class ImageElement extends UIElement {
    constructor(public src: string, toolkit: UIToolkit) {
        super(toolkit);
    }
    render(): void {
        this.toolkit.drawImage(this.src);
    }
}