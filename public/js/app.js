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
  this.showRegister = true;
  this.formdata = {};
  this.indexOfEditFormToShow;

  this.newQuery="test";
  this.newLimit="2";

  this.includePath = 'partials/jokes.html'
  this.changeInclude = (path)=>{
      this.includePath = 'partials/'+path+'.html'
    }

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
        this.showRegister = false;
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
        this.showRegister = false;
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
        this.showRegister = true;
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

// ============
//   GIFYs
// ============
  this.getGify = ()=>{
        this.hostURL ='https://'+'api.giphy.com/';
        this.path = 'v1/gifs/'+'search?';
        // this.path = 'v1/gifs/'+'random?';
        this.apiKey= 'api_key='+'dhDVb2MRQfDuD2NOgb2f06brp8dfsRlw';
        this.query = '&q='+'programming';
        this.limit = '&limit='+'24';
        // this.tag = '&tag='+'programming';
        this.rating ='&rating='+'G';
        this.lang = '&lang='+'en'

        // this.searchURL = this.hostURL+ this.path + this.apiKey +this.tag;
        this.searchURL = this.hostURL+ this.path + this.apiKey +this.query+this.limit;


    $http(
        {   method:'GET',
            url: this.searchURL
        }
    ).then(
        (response)=>{
            this.gifys= response.data.data;
            // console.log(response.data);
            // console.log(response.data.data);
            // console.log(response.data.data[0]);
            // console.log(response.data.data[0].embed_url);
        },
        (error)=>{error}
    )
  };

  this.getGify();

}])
