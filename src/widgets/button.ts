// importing local code, code we have written
import {IdleUpWidgetState, PressedWidgetState } from "../core/ui";
import {Window, Widget, RoleType, EventArgs} from "../core/ui";
// importing code from SVG.js library
import {Rect, Text, Box} from "../core/ui"; // Removed member Ellipse

class Button extends Widget {
    private _rect: Rect;
    private _text: Text;
    private _input: string;
    private _fontSize: number;
    private _text_y: number;
    private _text_x: number;
    private defaultText: string = "Please Click Me!";
    private defaultFontSize: number = 18;
    private defaultWidth: number = 120;
    private defaultHeight: number = 50;
    private eventrect: Rect;

    constructor(parent: Window) {
        super(parent);
        // set defaults
        this.height = this.defaultHeight;
        this.width = this.defaultWidth;
        this._input = this.defaultText;
        this._fontSize = this.defaultFontSize;
        // set Aria role
        this.role = RoleType.button;
        // render widget
        this.render();
        // set default or starting state
        this.setState(new IdleUpWidgetState());
        // prevent text selection
        this.selectable = false;
        // default color
        this._backcolor = "#e9f5f9";

        // Call the onClick method to set up the event handler
        this.onClick(() => {
            this.pressReleaseState(); // Call the method to handle the click event
        });
    }

    set fontSize(size: number) {
        this._fontSize = size;
        this.update();
    }

    private positionText() {
        let box: Box = this._text.bbox();
        // in TS, the prepending with + performs a type conversion from string to number
        this._text_y = (+this._rect.y() + ((+this._rect.height() / 2)) - (box.height / 2));
        this._text_x = (+this._rect.x() + ((+this._rect.width() / 2)) - (box.width / 2));
        this._text.y(this._text_y);
        this._text.x(this._text_x);
    }

    render(): void {
        this._group = (this.parent as Window).window.group();
        this._rect = this._group.rect(this.width, this.height);
        this._rect.stroke("black");
        this._rect.radius(15, 20);
        this._text = this._group.text(this._input);
        // Set the outer svg element
        this.outerSvg = this._group;
        // Add a transparent rect on top of text to
        // prevent selection cursor and to handle mouse events
        this.eventrect = this._group.rect(this.width, this.height).opacity(0).attr('id', 0);
        // let eventellipse = this._group.ellipse(this.width, this.height).opacity(0).attr('id', 0);
        // register objects that should receive event notifications.
        // for this widget, we want to know when the group or rect objects
        // receive events
        this.registerEvent(this.eventrect);
        // this.registerEvent(eventellipse);
    }

    override update(): void {
        if (this._text != null)
            this._text.font('size', this._fontSize);
        this._text.text(this._input);
        this.positionText();

        if (this._rect != null)
            this._rect.fill(this.backcolor);

        super.update();
    }

    pressReleaseState(): void {
        if (this.previousState instanceof PressedWidgetState)
            this.raise(new EventArgs(this));
    }

    //TODO: implement the onClick event using a callback passed as a parameter
    onClick(callback: () => void): void {
        this.eventrect.on('click', () => {
            callback();
        });
    }

    //TODO: give the states something to do! Use these methods to control the visual appearance of your
    //widget
    // Outside button, not pressing
    idleupState(): void {
        this.backcolor = "#e9f5f9";
        /*
        this._rect.animate(100).size(this.defaultWidth, this.defaultHeight);
        this.eventrect.animate(100).size(this.defaultWidth, this.defaultHeight);
        */
        this.update();
    }
    // Outside button, pressing
    idledownState(): void {
        // this.backcolor = "orange";
        // console.log("Button clicked!");
        this.update();
    }
    // Inside button, pressing
    pressedState(): void {
        this.backcolor = "#92cbdf";
        console.log("Button Clicked!");
        this.update();
    }
    // Inside button, not pressing
    hoverState(): void {
        const delayMs = 2000;
        this.backcolor = "#bee0ec";
        /*
        this._rect.animate(100).size(this.defaultWidth + 5, this.defaultHeight + 5);
        this.eventrect.animate(100).size(this.defaultWidth + 5, this.defaultHeight + 5);
        */
    }
    // Outside button, enter button & keep pressing
    hoverPressedState(): void {
        this.backcolor = "#92cbdf";
        this.update();
    }
    // Inside button, exit button & keep pressing
    pressedoutState(): void {
        // this.backcolor = "purple";
    }
    // Outside button, enter & exit button
    moveState(): void {
        // this.backcolor = "pink";
    }
    // Press any key
    keyupState(keyEvent?: KeyboardEvent): void {
        // this.backcolor = "brown";
    }
}

export { Button };
