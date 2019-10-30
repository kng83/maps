
abstract class UIComponent {
    abstract draw(): void;
    }
    
    class Text1 {
      content: string='';
      setColor(color: string): void { }
      setFont(font: string): void { }
      draw(): void { }
    }
    
    class Decorator extends UIComponent {
      constructor(public component: TextComponent) {
        super();
    }
      get texts(): Text1[] {
        return this.component.texts;
    }
      draw(): void {
      this.component.draw();
      }
    }
    
    class TextComponent extends UIComponent {
      texts: Text1[] = [];
      draw(): void {
        for (let text of this.texts) {
        text.draw();
        }
      }
    }
    
    class ColorDecorator extends Decorator {
    constructor(component: TextComponent,public color: string) {
      super(component);
    }
    draw(): void {
      for (let text of this.texts) {
      text.setColor(this.color);
      }
      super.draw();
      }
    }
    
    let decoratedComponent = new ColorDecorator( new TextComponent(),'black');
    console.log(decoratedComponent.color);
    let txt = new Text1();
    txt.content = 'jakis cyrk'
    decoratedComponent.component.texts = [txt];
    decoratedComponent.draw();
    console.log(decoratedComponent.texts[0].content);