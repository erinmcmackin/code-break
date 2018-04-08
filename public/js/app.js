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
  this.indexOfEditFormToShow = null;
  this.indexOfImageToShow = null;

  this.showLoginModal = false;
  this.showRegisterModal = false;

  this.newQuery="";
  this.newLimit="";
  this.query="";
  this.limit="";

  this.includePath = 'partials/jokes.html'
  this.changeInclude = (path)=>{
      this.includePath = 'partials/'+path+'.html'
    }

    // =============
    // Body Color
    // =============

    this.chgColor_Home = ()=>{
        this.bodyColor='#b6ecde';
        this.navColor = '#000000';
    }

    this.chgColor_Other = ()=>{
        this.bodyColor='#88a6a7';
        this.navColor ='#FFFFFF';
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
        this.showRegisterModal = false;
      }, (error)=>{error})
  }

  this.openRegisterModal = ()=>{
    this.showRegisterModal = true;
  };

  this.closeRegisterModal = ()=>{
    this.showRegisterModal = false;
  };

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
        this.showLoginModal = false;
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

  this.openLoginModal = ()=>{
    this.showLoginModal = true;
  };

  this.closeLoginModal = ()=>{
    this.showLoginModal = false;
  };

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

  this.openShowModal = (image)=>{
    console.log('show modal');
    $http({
      method: 'GET',
      url: '/forums/' + image._id
    }).then((response)=>{
      console.log(response);
      this.image = response.data;
    }, (error)=>{
      console.log(error);
    });
  };

  this.closeModal = ()=>{
    this.indexOfImageToShow = null;
    this.indexOfEditFormToShow = null;
    // clearing data so it doesn't appear when you go to edit another image
    // this.updatedImage = '';
    // this.updatedCaption = '';
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
      // clearing data so it doesn't appear when you go to edit another image
      // this.updatedImage = '';
      // this.updatedCaption = '';
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

  this.getImages();

// ============
//   GIFYs
// ============

//takes user inputs for gify search query parameters and update gifies
    this.changeQuery =()=>{

          console.log(this.newQuery);
          if(this.newQuery !=="" ){
              this.query= '&q='+ this.newQuery;
          }else{
             this.query= '&q='+ 'programming';
          }

         console.log(this.query);

          if(this.newLimit!==""){
             this.limit= '&limit='+this.newLimit;
          }else{
             this.limit= '&limit='+'24';
          }

         console.log(this.limit);

         this.getGify();
    }


  this.getGify = ()=>{

      //components of gify searchURL
        this.hostURL ='https://'+'api.giphy.com/';
        this.path = 'v1/gifs/'+'search?';
        this.apiKey= 'api_key='+'dhDVb2MRQfDuD2NOgb2f06brp8dfsRlw';
        this.rating ='&rating='+'G';
        this.lang = '&lang='+'en'
            // this.query = '&q='+'programming';
            // this.limit = '&limit='+'24';
                // this.path = 'v1/gifs/'+'random?';
            // this.tag = '&tag='+'programming';
            // this.searchURL = this.hostURL+ this.path + this.apiKey +this.tag;
        this.searchURL = this.hostURL+ this.path + this.apiKey +this.query+this.limit;
            console.log(this.searchURL);

    $http(
        {   method:'GET',
            url: this.searchURL
        }
    ).then(
        (response)=>{
            this.gifys= response.data.data;
            // console.log(response.data.data[0]);
        },
        (error)=>{error}
    )
  };

  this.changeQuery();
  this.getGify();

}])
