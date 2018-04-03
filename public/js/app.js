console.log("app.js is connected");

//create module with name app.
const app = angular.module('codeBreak', []);

// Create controller: takes 2 parameters controllerName and and array. A function must be the last element in the array. call the angular $http module in the function & a variable for it
app.controller('codeBreak', ['$http',function($http){

this.test="testing"
  this.answer= "";
        this.getJoke = ()=>{

            //call $http function, takes an object parameter with method, url, and data propeties
            $http(
                {
                    method:'GET',
                    url:"https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke"

                }
            ).then(
                (response)=>{
                    console.log(response);
                    console.log(response.data);
                    console.log(response.data.setup);
                    console.log(response.data.punchline);
                    this.joke = response.data.setup;
                    this.answer = response.data.punchline;
                    this.showAnswer = false;
                    console.log();
                },
                (error)=>{error})
        }


 this.getAnswer =()=>{
    this.showAnswer=true;
 }
// this.getJoke();

}])
