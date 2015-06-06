module objects {
    // TEXT CLASS +++++++++++++++++++++++++++++
    export class Text extends createjs.Text {
        // CONSTRUCTOR +++++++++++++++++++++++++++
        constructor(textString: string, x: number, y: number) {
            super(textString, "15px Consolas", "#000000");
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
            
            this.x = x;
            this.y = y;
        }
    }   

} 