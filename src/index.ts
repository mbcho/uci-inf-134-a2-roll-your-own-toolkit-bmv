import {Window} from "./core/ui";
import {Button} from "./widgets/button";
import {Heading} from "./widgets/heading";
import {Checkbox} from "./widgets/checkbox";

let w = new Window(window.innerHeight - 10, '100%');

// Button
let lbl1 = new Heading(w);
lbl1.text = "Button Demo";
lbl1.tabindex = 1;
lbl1.fontSize = 16;
lbl1.move(10, 20);

let btn = new Button(w);
btn.tabindex = 2;
btn.fontSize = 16;
btn.move(10, 50);

btn.onClick(() => {
    lbl1.text = "Button Clicked!";
});

// Checkbox
let lbl2 = new Heading(w);
lbl2.text = "Checkbox Demo";
lbl2.tabindex = 2;
lbl2.fontSize = 16;
lbl2.move(175, 20);

let checkbox = new Checkbox(w);
checkbox.move(220, 60);
