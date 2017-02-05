(function() {
    "use strict"

    class shopComponent {
        constructor() {
            this.template = `
                <h1>sklep z czeskimi majtkami</h1>
                <h6>lorem ipsum dolor set amit</h6>
                <cart-component></cart-component>
                <items-list></items-list>
                <h6>abcdef</h6>
            `
        }
    }

    class itemComponent {
        constructor() {
            this.template = `
                <div class="item">
                    <h2 class="item-title">{{$ctrl.product.name}}</h2>
                    <p class="item-description">{{$ctrl.product.description}}</p>
                    <img ng-src ={{$ctrl.product.image}} class="item-image">
                    <button class="item-button" ng-click="$ctrl.addToCart($ctrl.product)">dodaj</button>
                </div>`,
            this.bindings = {
                product: '<'
            },
            this.controller = function(cartService) {
                this.addToCart = (item) => {
                    cartService.add(item);
                }
            }
        }
    }

    class itemsList {
        constructor() {
            this.template = `
                <ul class="items-list">
                    <item product="product" ng-repeat="product in $ctrl.products.list"></item>
                </ul>
            `,
            this.controller = function(productsService) {
                this.products = productsService.get();
            }
        }
    }

    class cartComponent {
        constructor() {
            this.template = `
                <ul class="cart">
                    <cart-item cart="cart" ng-repeat="cart in $ctrl.cart.list"></cart-item>
                </ul>
            `,
            this.controller = function(cartService) {
                this.cart = cartService.getAll();
            }
        }
    }

    class cartItem {
        constructor() {
            this.template = `
                <li>
                    <p>{{$ctrl.cart.name}}</p>
                    <button ng-click="$ctrl.removeFromCart($ctrl.cart)">X</button>
                </li>
            `,
            this.bindings = {
                cart: '<'
            },
            this.controller = function(cartService) {
                this.removeFromCart = ({ id }) => {
                    cartService.remove(id);
                }
            }
        }
    }

    angular.module('shop')
        .component('shopComponent', new shopComponent())
        .component('item', new itemComponent())
        .component('itemsList', new itemsList())
        .component('cartComponent', new cartComponent())
        .component('cartItem', new cartItem())
})();