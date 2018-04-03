console.log("app.js is connected");

//create module with name app.
const app = angular.module('codeBreak', []);

// Create controller: takes 2 parameters controllerName and and array. A function must be the last element in the array. call the angular $http module in the function & a variable for it
app.controller('codeBreak', ['$http',function($http){

this.test="testing"

        // this.getJokes = ()=>{
        //
        //
        // }

}])
