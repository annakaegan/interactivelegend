/// <amd-dependency path="esri/core/tsSupport/declareExtendsHelper" name="__extends" />
/// <amd-dependency path="esri/core/tsSupport/decorateHelper" name="__decorate" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "esri/core/tsSupport/declareExtendsHelper", "esri/core/tsSupport/decorateHelper", "dojo/i18n!./Info/nls/resources", "esri/core/accessorSupport/decorators", "esri/core/watchUtils", "esri/widgets/Widget", "esri/widgets/support/widget", "./Info/InfoViewModel"], function (require, exports, __extends, __decorate, i18n, decorators_1, watchUtils, Widget, widget_1, InfoViewModel) {
    "use strict";
    //----------------------------------
    //
    //  CSS Classes
    //
    //----------------------------------
    var CSS = {
        base: "esri-info",
        widget: "esri-widget",
        paginationContainer: "esri-info__pagination-container",
        paginationItem: "esri-info__pagination-item",
        paginationItemSelected: "esri-info__pagination-item--selected",
        titleContainer: "esri-info__title-container",
        infoContent: "esri-info__content",
        back: "esri-info__back",
        backText: "esri-info__back-text",
        buttonContainer: "esri-info__button-container",
        nextButton: "esri-info__next",
        list: "esri-info__list",
        listItem: "esri-info__list-item",
        listItemTextContainer: "esri-info__list-item-text-container",
        stepNumberContainer: "esri-info__number-container",
        stepNumber: "esri-info__number",
        explanationItem: "esri-info__explanation-item",
        calciteStyles: {
            btn: "btn"
        },
        icons: {
            widgetIcon: "icon-ui-question"
        }
    };
    var Info = /** @class */ (function (_super) {
        __extends(Info, _super);
        function Info(value) {
            var _this = _super.call(this) || this;
            //----------------------------------
            //
            //  Private Variables
            //
            //----------------------------------
            _this._contentNodes = [];
            _this._paginationNodes = [];
            //----------------------------------
            //
            //  Properties
            //
            //----------------------------------
            // infoContent
            _this.infoContent = null;
            // expandWidget
            _this.expandWidget = null;
            // selectedItemIndex
            _this.selectedItemIndex = null;
            //----------------------------------------------
            //
            //  iconClass and label - Expand Widget Support
            //
            //----------------------------------------------
            // iconClass
            _this.iconClass = CSS.icons.widgetIcon;
            // label
            _this.label = i18n.widgetLabel;
            // viewModel
            _this.viewModel = new InfoViewModel();
            return _this;
        }
        //----------------------------------
        //
        //  Lifecycle
        //
        //----------------------------------
        Info.prototype.postInitialize = function () {
            var _this = this;
            this.own([
                watchUtils.init(this, "content", function () {
                    _this._generateContentNodes();
                })
            ]);
        };
        Info.prototype.render = function () {
            var content = this._renderContent();
            var paginationNodes = this.infoContent.length > 1 ? this._generatePaginationNodes() : null;
            return (widget_1.tsx("div", { class: this.classes(CSS.widget, CSS.base) },
                paginationNodes ? (widget_1.tsx("div", { class: CSS.paginationContainer }, paginationNodes)) : null,
                widget_1.tsx("div", { class: CSS.titleContainer },
                    widget_1.tsx("h1", null, this.infoContent[this.selectedItemIndex].title)),
                widget_1.tsx("div", { class: CSS.infoContent }, content),
                paginationNodes && this.selectedItemIndex !== 0 ? (widget_1.tsx("div", { key: "previous-page", class: CSS.back },
                    widget_1.tsx("span", { bind: this, onclick: this._previousPage, onkeydown: this._previousPage, tabIndex: 0, class: CSS.backText, title: i18n.back }, i18n.back))) : null,
                widget_1.tsx("div", { class: CSS.buttonContainer }, this.selectedItemIndex !== this.infoContent.length - 1 ? (widget_1.tsx("button", { bind: this, onclick: this._nextPage, onkeydown: this._nextPage, tabIndex: 0, class: this.classes(CSS.nextButton, CSS.calciteStyles.btn), title: i18n.next }, i18n.next)) : (widget_1.tsx("button", { bind: this, onclick: this._closeInfoPanel, onkeydown: this._closeInfoPanel, tabIndex: 0, class: this.classes(CSS.nextButton, CSS.calciteStyles.btn), title: i18n.close }, i18n.close)))));
        };
        //   _renderContent
        Info.prototype._renderContent = function () {
            return this._contentNodes[this.selectedItemIndex];
        };
        //   _generateContentNodes
        Info.prototype._generateContentNodes = function () {
            var _this = this;
            this.infoContent.forEach(function (contentItem) {
                var type = contentItem.type;
                if (type === "list") {
                    _this._contentNodes.push(_this._generateListNode(contentItem));
                }
                else if (type === "explanation") {
                    _this._contentNodes.push(_this._generateExplanationNode(contentItem));
                }
            });
        };
        //   _generateListNode
        Info.prototype._generateListNode = function (contentItem) {
            var _this = this;
            var listItemNodes = contentItem.infoContentItems.map(function (listItem, listItemIndex) {
                return _this._generateListItemNodes(listItem, listItemIndex);
            });
            return widget_1.tsx("ul", { class: CSS.list }, listItemNodes);
        };
        //   _generateListItemNode
        Info.prototype._generateListItemNodes = function (listItem, listItemIndex) {
            return (widget_1.tsx("li", { class: CSS.listItem },
                widget_1.tsx("div", { class: CSS.stepNumberContainer },
                    widget_1.tsx("div", { class: CSS.stepNumber }, "" + (listItemIndex + 1))),
                widget_1.tsx("div", { class: CSS.listItemTextContainer },
                    widget_1.tsx("span", null, listItem))));
        };
        //   _generateExplanationNode
        Info.prototype._generateExplanationNode = function (contentItem) {
            var _this = this;
            var explanationItemNodes = contentItem.infoContentItems.map(function (explanationItem, explanationItemIndex) {
                return _this._generateExplanationItemNodes(explanationItem, explanationItemIndex);
            });
            return widget_1.tsx("div", null, explanationItemNodes);
        };
        //   _generateExplanationItemNodes
        Info.prototype._generateExplanationItemNodes = function (explanationItem, explanationItemIndex) {
            return (widget_1.tsx("p", { key: explanationItemIndex, class: CSS.explanationItem }, explanationItem));
        };
        //   _generatePaginationNodes
        Info.prototype._generatePaginationNodes = function () {
            var _this = this;
            this._paginationNodes = [];
            return this.infoContent.map(function (contentItem, contentItemIndex) {
                var paginationClass = _this.selectedItemIndex === contentItemIndex
                    ? _this.classes(CSS.paginationItem, CSS.paginationItemSelected)
                    : CSS.paginationItem;
                var paginationNode = (widget_1.tsx("div", { bind: _this, onclick: _this._goToPage, onkeydown: _this._goToPage, class: paginationClass, "data-pagination-index": "" + contentItemIndex, tabIndex: 0 }));
                _this._paginationNodes.push(paginationNode);
                return paginationNode;
            });
        };
        // _goToPage
        Info.prototype._goToPage = function (event) {
            var node = event.currentTarget;
            var itemIndex = node.getAttribute("data-pagination-index");
            this.viewModel.selectedItemIndex = parseInt(itemIndex);
            this._paginationNodes[this.selectedItemIndex].domNode.focus();
            this.scheduleRender();
        };
        // _nextPage
        Info.prototype._nextPage = function () {
            if (this.selectedItemIndex !== this.infoContent.length - 1) {
                this.selectedItemIndex += 1;
                this._paginationNodes[this.selectedItemIndex].domNode.focus();
            }
        };
        // _previousPage
        Info.prototype._previousPage = function () {
            if (this.selectedItemIndex !== 0) {
                this.selectedItemIndex -= 1;
                this._paginationNodes[this.selectedItemIndex].domNode.focus();
            }
        };
        // _closeInfoPanel
        Info.prototype._closeInfoPanel = function () {
            this.selectedItemIndex = 0;
            this.expandWidget.expanded = false;
        };
        __decorate([
            decorators_1.aliasOf("viewModel.infoContent"),
            decorators_1.property(),
            widget_1.renderable()
        ], Info.prototype, "infoContent", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.expandWidget"),
            decorators_1.property(),
            widget_1.renderable()
        ], Info.prototype, "expandWidget", void 0);
        __decorate([
            decorators_1.aliasOf("viewModel.selectedItemIndex"),
            decorators_1.property(),
            widget_1.renderable()
        ], Info.prototype, "selectedItemIndex", void 0);
        __decorate([
            decorators_1.property()
        ], Info.prototype, "iconClass", void 0);
        __decorate([
            decorators_1.property()
        ], Info.prototype, "label", void 0);
        __decorate([
            widget_1.renderable(),
            decorators_1.property({
                type: InfoViewModel
            })
        ], Info.prototype, "viewModel", void 0);
        __decorate([
            widget_1.accessibleHandler()
        ], Info.prototype, "_goToPage", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Info.prototype, "_nextPage", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Info.prototype, "_previousPage", null);
        __decorate([
            widget_1.accessibleHandler()
        ], Info.prototype, "_closeInfoPanel", null);
        Info = __decorate([
            decorators_1.subclass("Info")
        ], Info);
        return Info;
    }(decorators_1.declared(Widget)));
    return Info;
});
//# sourceMappingURL=Info.js.map