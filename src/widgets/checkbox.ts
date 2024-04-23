// importing local code, code we have written
import {IdleUpWidgetState, PressedWidgetState } from "../core/ui";
import {Window, Widget, RoleType, EventArgs} from "../core/ui";
// importing code from SVG.js library
import {Rect, Text, Box} from "../core/ui";

class Checkbox extends Widget {
    private _rect: Rect;
    private _text: Text;
    private _input: string;
    private _fontSize: number;
    private _text_y: number;
    private _text_x: number;
    private defaultWidth: number = 25;
    private defaultHeight: number = 25;
    private eventrect: Rect;
    private checked: Boolean;

    constructor(parent: Window) {
        super(parent);
        // set defaults
        this.height = this.defaultHeight;
        this.width = this.defaultWidth;
        // set Aria role
        this.role = RoleType.checkbox;
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

    render(): void {
        this._group = (this.parent as Window).window.group();
        this._rect = this._group.rect(this.width, this.height);
        this._rect.stroke("black");
        this._rect.radius(5, 5);
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
        if (this.checked == false) {
            this.backcolor = "#e9f5f9";
        }
        else {
            this.backcolor = "#92cbdf";
        }

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
        if (this.checked) {
            this.checked = false;
        }
        else {
            this.checked = true;
        }
        this.update();
    }
    // Inside button, not pressing
    hoverState(): void {

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

export { Checkbox };
