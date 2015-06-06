var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // TEXT CLASS +++++++++++++++++++++++++++++
    var Text = (function (_super) {
        __extends(Text, _super);
        // CONSTRUCTOR +++++++++++++++++++++++++++
        function Text(textString, x, y) {
            _super.call(this, textString, "15px Consolas", "#000000");
            this.regX = this.getBounds().width * 0.5;
            this.regY = this.getBounds().height * 0.5;
            this.x = x;
            this.y = y;
        }
        return Text;
    })(createjs.Text);
    objects.Text = Text;
})(objects || (objects = {}));
//# sourceMappingURL=text.js.map