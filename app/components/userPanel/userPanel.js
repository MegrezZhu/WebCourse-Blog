angular.module('blog.userPanel', ['ngMaterial'])
       .controller('AnimationCtrl', AnimationCtrl)
       .controller('DialogCtrl', DialogCtrl);

function AnimationCtrl($mdPanel) {
    this._mdPanel = $mdPanel;
    this.openFrom = 'button';
    this.closeTo = 'button';
    this.animationType = 'none';
}

AnimationCtrl.prototype.showDialog = function () {
    var position = this._mdPanel.newPanelPosition()
                       .relativeTo('.animation-target')
                       .addPanelPosition(this._mdPanel.xPosition.ALIGN_START, this._mdPanel.yPosition.BELOW);

    var animation = this._mdPanel.newPanelAnimation();

    switch (this.openFrom) {
        case 'button':
            animation.openFrom('.animation-target');
            break;
        case 'corner':
            animation.openFrom({top: 0, left: 0});
            break;
        case 'bottom':
            animation.openFrom({
                top: document.documentElement.clientHeight,
                left: document.documentElement.clientWidth / 2 - 250
            });
    }
    switch (this.closeTo) {
        case 'button':
            animation.closeTo('.animation-target');
            break;
        case 'corner':
            animation.closeTo({top: 0, left: 0});
            break;
        case 'bottom':
            animation.closeTo({
                top: document.documentElement.clientHeight,
                left: document.documentElement.clientWidth / 2 - 250
            });
    }

    switch (this.animationType) {
        case 'custom':
            animation.withAnimation({
                open: 'demo-dialog-custom-animation-open',
                close: 'demo-dialog-custom-animation-close'
            });
            break;
        case 'slide':
            animation.withAnimation(this._mdPanel.animation.SLIDE);
            break;
        case 'scale':
            animation.withAnimation(this._mdPanel.animation.SCALE);
            break;
        case 'fade':
            animation.withAnimation(this._mdPanel.animation.FADE);
            break;
        case 'none':
            animation = undefined;
            break;
    }

    var config = {
        animation: animation,
        attachTo: angular.element(document.body),
        controller: DialogCtrl,
        controllerAs: 'ctrl',
        templateUrl: '/components/userPanel/userPanel.html',
        panelClass: 'demo-dialog-example',
        position: position,
        trapFocus: true,
        zIndex: 150,
        clickOutsideToClose: true,
        clickEscapeToClose: true,
        // hasBackdrop: true,
    };

    this._mdPanel.open(config);
};

// Necessary to pass locals to the dialog template.
function DialogCtrl(mdPanelRef) {
    this._mdPanelRef = mdPanelRef;
}

DialogCtrl.prototype.closeDialog = function () {
    this._mdPanelRef && this._mdPanelRef.close();
};

(function () {
    'use strict';

    angular.module('panelDemo', ['ngMaterial'])
           .controller('BasicDemoCtrl', BasicDemoCtrl)
           .controller('PanelDialogCtrl', PanelDialogCtrl);

    function BasicDemoCtrl($mdPanel) {
        this._mdPanel = $mdPanel;

        this.desserts = [
            'Apple Pie',
            'Donut',
            'Fudge',
            'Cupcake',
            'Ice Cream',
            'Tiramisu'
        ];

        this.selected = {favoriteDessert: 'Donut'};
        this.disableParentScroll = false;
    }

    // BasicDemoCtrl.prototype.showDialog = function () {
    //     var position = this._mdPanel.newPanelPosition()
    //                        .absolute()
    //                        .center();
    //
    //     var config = {
    //         attachTo: angular.element(document.body),
    //         controller: PanelDialogCtrl,
    //         controllerAs: 'ctrl',
    //         disableParentScroll: this.disableParentScroll,
    //         templateUrl: 'panel.tmpl.html',
    //         hasBackdrop: true,
    //         panelClass: 'demo-dialog-example',
    //         position: position,
    //         trapFocus: true,
    //         zIndex: 150,
    //         clickOutsideToClose: true,
    //         escapeToClose: true,
    //         focusOnOpen: true
    //     };
    //
    //     this._mdPanel.open(config);
    // };

    BasicDemoCtrl.prototype.showMenu = function (ev) {
        var position = this._mdPanel.newPanelPosition()
                           .relativeTo('.demo-menu-open-button')
                           .addPanelPosition(this._mdPanel.xPosition.ALIGN_START, this._mdPanel.yPosition.BELOW);

        var config = {
            attachTo: angular.element(document.body),
            controller: PanelMenuCtrl,
            controllerAs: 'ctrl',
            template: '<div class="demo-menu-example" ' +
            '     aria-label="Select your favorite dessert." ' +
            '     role="listbox">' +
            '  <div class="demo-menu-item" ' +
            '       ng-class="{selected : dessert == ctrl.favoriteDessert}" ' +
            '       aria-selected="{{dessert == ctrl.favoriteDessert}}" ' +
            '       tabindex="-1" ' +
            '       role="option" ' +
            '       ng-repeat="dessert in ctrl.desserts" ' +
            '       ng-click="ctrl.selectDessert(dessert)"' +
            '       ng-keydown="ctrl.onKeydown($event, dessert)">' +
            '    {{ dessert }} ' +
            '  </div>' +
            '</div>',
            panelClass: 'demo-menu-example',
            position: position,
            locals: {
                'selected': this.selected,
                'desserts': this.desserts
            },
            openFrom: ev,
            clickOutsideToClose: true,
            escapeToClose: true,
            focusOnOpen: false,
            zIndex: 2
        };

        this._mdPanel.open(config);
    };

    function PanelDialogCtrl(mdPanelRef) {
        this._mdPanelRef = mdPanelRef;
    }

    PanelDialogCtrl.prototype.closeDialog = function () {
        var panelRef = this._mdPanelRef;

        panelRef && panelRef.close().then(function () {
            angular.element(document.querySelector('.demo-dialog-open-button')).focus();
            panelRef.destroy();
        });
    };

    function PanelMenuCtrl(mdPanelRef, $timeout) {
        this._mdPanelRef = mdPanelRef;
        this.favoriteDessert = this.selected.favoriteDessert;
        $timeout(function () {
            var selected = document.querySelector('.demo-menu-item.selected');
            if (selected) {
                angular.element(selected).focus();
            } else {
                angular.element(document.querySelectorAll('.demo-menu-item')[0]).focus();
            }
        });
    }

    PanelMenuCtrl.prototype.selectDessert = function (dessert) {
        this.selected.favoriteDessert = dessert;
        this._mdPanelRef && this._mdPanelRef.close().then(function () {
            angular.element(document.querySelector('.demo-menu-open-button')).focus();
        });
    };

    PanelMenuCtrl.prototype.onKeydown = function ($event, dessert) {
        var handled;
        switch ($event.which) {
            case 38: // Up Arrow.
                var els = document.querySelectorAll('.demo-menu-item');
                var index = indexOf(els, document.activeElement);
                var prevIndex = (index + els.length - 1) % els.length;
                els[prevIndex].focus();
                handled = true;
                break;

            case 40: // Down Arrow.
                var els = document.querySelectorAll('.demo-menu-item');
                var index = indexOf(els, document.activeElement);
                var nextIndex = (index + 1) % els.length;
                els[nextIndex].focus();
                handled = true;
                break;

            case 13: // Enter.
            case 32: // Space.
                this.selectDessert(dessert);
                handled = true;
                break;

            case 9: // Tab.
                this._mdPanelRef && this._mdPanelRef.close();
        }

        if (handled) {
            $event.preventDefault();
            $event.stopImmediatePropagation();
        }

        function indexOf(nodeList, element) {
            for (var item, i = 0; item = nodeList[i]; i++) {
                if (item === element) {
                    return i;
                }
            }
            return -1;
        }
    };

})();