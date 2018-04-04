console.log("app.js is connected");

//create module with name app.
const app = angular.module('codeBreak', []);
//'ngRoute'
// app.config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider){
//     $locationProvider.html5Mode({enabled:true});
//     $routeProvider.when('/forums', {
//         templateUrl: 'forums.html',
//         controller:'codeBreak',
//         controllerAs: 'ctrl'
//     })
// }])

// Create controller: takes 2 parameters controllerName and and array. A function must be the last element in the array. call the angular $http module in the function & a variable for it
app.controller('codeBreak', ['$http',function($http){

  this.test="testing"
  this.answer= "";
  this.showLogOut = false;
  this.showLogIn = true;
  this.showCreateUser = true;
  this.formdata = {};
  this.indexOfEditFormToShow;

  // =============
  // JOKES
  // =============

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
              this.showJoke = true;
              this.joke = response.data.setup;
              this.answer = response.data.punchline;
              this.showAnswer = false;
              console.log();
          },
          (error)=>{error})
        }


   this.getAnswer =()=>{
      this.showAnswer=true;
      this.showJoke = false;
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

  // =============
  // USERS
  // =============

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
      ).then((response)=>{
        console.log(response);
        this.showLogIn = true;
        this.showCreateUser = false;
      }, (error)=>{error})
  }

// this.deleteUser = (id)=>{
//     $http(
//         {
//             method:'DELETE',
//             url:'/users/' + id
//         }
//     )then.((response)=>{console.log(response);}, (error)=>{console.log(error);})
// }

  // =============
  // SESSIONS
  // =============

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
      ).then( (response)=>{
        console.log(response);
        this.showLogIn = false;
        this.showCreateUser = false;
        this.showLogOut = true;
      },(error)=>{error})
  }

  this.deleteSession = ()=>{
      $http(
          {
              method: 'DELETE',
              url: '/sessions'
          }
      ).then((response)=>{
        this.showLogIn = true;
        this.showCreateUser = true;
        this.showLogOut = false;
        console.log(response);
      }, (error)=>{error})
  }

  // =============
  // IMAGES
  // =============

  this.createImage = ()=>{
    $http({
      method: 'POST',
      url: '/forums',
      data: {
        image: this.image,
        caption: this.caption
      }
    }).then((response)=>{
      console.log(response);
      this.getImages();
    }, (error)=>{
      console.log(error);
    });
  };

  this.getImages = ()=>{
    $http({
      method: 'GET',
      url: '/forums'
    }).then((response)=>{
      console.log(response);
      this.images = response.data;
    }, (error)=>{
      console.log(error);
    });
  };

  this.editImage = (image)=>{
    $http({
      method: 'PUT',
      url: '/forums/' + image._id,
      data: {
        image: this.updatedImage,
        caption: this.updatedCaption
      }
    }).then((response)=>{
      this.indexOfEditFormToShow = null;
      this.getImages();
    });
  };

  this.deleteImage = (image)=>{
    $http({
      method: 'DELETE',
      url: '/forums/' + image._id
    }).then((response)=>{
      console.log(response);
      this.getImages();
    });
  };

  // reactivate once routes are up
  this.getImages();

}])
