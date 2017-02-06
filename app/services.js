(function() {
    "use strict"

    function productsService($http) {

        const url = 'http://localhost:2095/products';

        let products = {
            list: []
        };

        $http.get(url).then(loadProducts, (e) => {
            console.log('Error!');
            console.log(e);
        });

        function loadProducts(response) {
            products.list = response.data;
        }

        return {
            get() {
                return products;
            }
        }

    }

    function cartService() {

        let products = {
            list: []
        }

        function getAll() {
            return products;
        }

        function add(item) {
            products.list.push(item);
        }

        function remove(removeId) {
            products.list = products.list.filter(({ id }) => { 
                return id != removeId
            })
        }

        return {
            add, remove, getAll
        }

    }

    angular.module('shop')
        .factory('productsService', productsService) 
        .factory('cartService', cartService) 

})();