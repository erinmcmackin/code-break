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

 // this.createJoke = ()=>{
 //        $http({
 //            method: 'POST',
 //            url: '/jokes',
 //            data:{
 //                joke:
 //                answer:
 //            }
 //        }).then((response)=>{console.log(response); this.joke = response.data.joke; this.answer = response.data.answer},
 //         (error)=>{error}
 //
 // }
// this.getJoke();
this.createUser = ()=>{
    $http(
        {
            method: 'POST',
            url: '/users',
            data:{
                username: this.username,
                password: this.password
            }
        }
    ).then((response)=>{console.log(response);}, (error)=>{error})
}


this.createSession = ()=>{
    $http(
        {
            method: 'POST',
            url: '/sessions',
            data:{
                username: this.username,
                password: this.password
            }
        }
    ).then( (response)=>{console.log(response);},(error)=>{error})
}


}])
