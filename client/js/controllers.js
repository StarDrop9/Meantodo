todoApp.controller('TodoCtrl', function($rootScope, $scope, todosFactory,$timeout) {
  $scope.todos = [];
  $scope.isEditable = [];
  $scope.rowLimit = 12 ;
  $scope.priorities=[{priority:"Urgent"},{priority:"Now"},{priority:"Today" },{priority:"Action" },{priority:"High"},{priority:"Medium"},{priority:"Low"},{priority:"Completed"}];
  $scope.label = "Category";
  $scope.labels = [{ label: "Inspiration" },{ label: "Design" },{ label: "Personal" },{ label: "Magnetism" },{ label: "Drones" },{ label: "Anti-Hacking" },{ label: "Splitting Water" },{ label: "Antigravity" }, { label: "Flying" }, { label: "Tech Scouting"}, { label: "Free Energy"}, { label: "Coding"},{ label: "Health"}, { label: "Survival Training"}]
  $scope.image = "/pics/plus.png";   
  $scope.header = {name: "header.html", url: "/partials/header.html"};
  $scope.imagePath='url("https://meantodo1.herokuapp.com/pics/snow-boarder.png")'; 
 //$scope.imagePath='url("https://ZZZ.png?w=400&amp;auto=format&amp;usm=20&amp;vib=10&amp;sat=10&amp;chromasub=444&amp;q=55&amp;fm=png8")';
 // $scope.todo.item = 1 
$scope.myValue = true; 

$scope.test = function() {
console.log($scope.todo.label);}

var watcher = $scope.$watch('myVar', function(newValue, oldValue) {
   // console.log("newValue=" + newValue);
   // console.log("oldValue=" + oldValue);
       //  if newvalue = "login" {}
        });
// watcher(); to clear watcher



$scope.getBodyStyle = function () {
  debugger
return "{'background-image':'url(https://www.google.com/images/srpr/logo4w.png)'}"
   // return "{backgroundImage:imagePath,'backgroundRepeat':'no-repeat','background-size':'cover'}";
};


  $scope.change = function() {
        $scope.priority="Now";
      };
     

  $scope.setlogin = function(){
   debugger;
   //$scope.loginState ="false";
   alert("In Process")
   }

  $scope.added = function(){
   debugger;
    $scope.appState ="added";
    $timeout(function () {
    var appState = $scope.appState = "removed";
    console.log(appState);
    }, 2000);
  }

  // get all Todos on Load would like to add label and priority focus for loads
  todosFactory.getTodos().then(function(data) {
    $scope.todos = data.data;
   // $scope.data = data.data;
  });

  // Save a Todo to the server kps tried 07/27PM || $scope.addInput 
  $scope.save = function($event,label, priority) {
   debugger; // Set the debugger inside 
      console.log(priority);
    if ( $event.which == 13 && $scope.todoInput ) {
      todosFactory.saveTodo({
        "todo": $scope.todoInput,
        "isCompleted": false,
        "label": label,
        "priority" : priority
      }).then(function(data) {
       $scope.todos.push(data.data);
             });
      $scope.todoInput = '';
    // $scope.todo.Label = '';
    $scope.added();
      }
  };


$scope.add = function($event,label, priority) {
   debugger; // Set the debugger inside 
      console.log(priority);
    if ( $event.which == 1 && $scope.todoInput ) {
      todosFactory.saveTodo({
        "todo": $scope.todoInput,
        "isCompleted": false,
        "label": label,
        "priority" : priority
      }).then(function(data) {
       $scope.todos.push(data.data);
             });
      $scope.todoInput = '';
    // $scope.todo.Label = '';
    $scope.added();
    
      }
  };

 //update the Label of the Todo try to work around the factory service with Jquery pput or replace 
 //since the factory appears to be failing at this time start with a new updateLabelTest control

$scope.updateLabelTest = function($event, _id, i, label) {
       //var label = $event.target.id.value.trim()    
       var _t = $scope.todos[i];
    //console.log(_t);
     todosFactory.updateTodoLabel({
      _id: _id,
      todo: _t.todo,
      isCompleted: false,
      label: label,
      priority : priority    
    }).then(function(data) {
      if (data.data.updatedExisting) {
       // _t.label=label;
      } else {
        alert('Oops something went wrong!');
      }
    });
  };


 $scope.updateLabel = function($event, _id, i, label) {
       //var label = $event.target.id.value.trim()    
       var _t = $scope.todos[i];
    //console.log(_t);
     todosFactory.updateTodoLabel({
      _id: _id,
      todo: _t.todo,
      isCompleted: false,
      label: label,
      priority: priority    
    }).then(function(data) {
      if (data.data.updatedExisting) {
       // _t.label=label;
      } else {
        alert('Oops something went wrong!');
      }
    });
  };

     
    $scope.totalDisplayed = 0;          
    $scope.loadMore = function () {
      $scope.totalDisplayed += 3;
         };
    
      $scope.cleartotalDisplayed = function () {
      $scope.totalDisplayed = 0;
         };
 

  //update the status of the Todo
  $scope.updateStatus = function($event, _id, i) {
    var cbk = $event.target.checked;
    var _t = $scope.todos[i];
    todosFactory.updateTodo({
      _id: _id,
      isCompleted: cbk,
      todo: _t.todo
    }).then(function(data) {
      if (data.data.updatedExisting) {
        _t.isCompleted = cbk;
      } else {
        alert('Oops something went wrong!');
      }
    });
  };

  // Update the edited Todo
  $scope.edit = function($event, i, label,priority) {
   if ($event.which == 13 && $event.target.value.trim()) {
     var _t = $scope.todos[i];
      todosFactory.updateTodoTest({
       "_id": _t._id,
      "todo": $event.target.value.trim(),
       "isCompleted": _t.isCompleted,
       "label": label,
       "priority":priority
      }).then(function(data) {
        console.log(label);
       if (data.data.updatedExisting) {
         _t.todo = $event.target.value.trim();
        _t.label = label;
        _t.priority = priority;
          $scope.isEditable[i] = false;
        } else {
          alert('Oops something went wrong!');
        }
      });
    }
  };


// Working 
 $scope.updateTodo = function($event, i, label,priority,todoInput) {
   debugger;
   if ($event.which == 1) {
     var _t = $scope.todos[i];
      todosFactory.updateTodoTest({
       "_id": _t._id,
      "todo": todoInput,
       "isCompleted": _t.isCompleted,
       "label": label,
       "priority":priority
      }).then(function(data) {
        console.log(label);
       if (data.data.updatedExisting) {
         _t.todo = todoInput;
        _t.label = label;
        _t.priority = priority;
          $scope.isEditable[i] = false;
        } else {
          alert('Oops something went wrong!');
        }
      });
    }
  };




  // Delete a Todo

  $scope.delete = function(i) {
  //debugger;
    todosFactory.deleteTodo($scope.todos[i]._id).then(function(data) {
     // alert(data);
      if (data.data) {
        $scope.todos.splice(i, 1);
      }
    });
  };


 $scope.ChooseLabelString = function(label) {
      $scope.filters = label;
    };


$scope.isActive = function(todo) {
        return todo.isCompleted === false;
    };
    

$scope.isComplete = function(todo) {
        return todo.isCompleted === true;
    };

 $scope.isInteresting = function (todo) {
//        debugger;
        if ($scope.AAA == undefined) {
  //       console.log($scope.AAA); 
            return true;
        }
    //    console.log($scope.AAA);
        return todo.todo.indexOf($scope.AAA) !== -1;
    };

 $scope.isLabel = function (todo) {
        debugger;
        if ($scope.BBB == undefined) {
         console.log($scope.BBB); 
            return true;
        }
        console.log($scope.BBB);
        return todo.label.indexOf($scope.BBB) !== -1;
    };

 $scope.isPriority = function (todo) {
//        debugger;
        if ($scope.CCC == undefined) {
  //       console.log($scope.BBB); 
            return true;
        }
    //    console.log($scope.AAA);
        return todo.priority.indexOf($scope.CCC) !== -1;
    };

$scope.clearlabel = function (){
 //debugger;
$scope.label = "";
   }

$scope.clearpriority = function (){
$scope.priority = "";
   }

$scope.cleartodopriority = function (priority){
debugger ;
$scope.priority = "Priority";
     }
$scope.ngChangeLabel = function (label){
 console.log(label);
  var label = label;
   }

$scope.ngChangeUpdatedLabel = function (label){
  var updatedlabel = label;
  console.log(updatedlabel); 
 }


$scope.onUpdate = function ($index){
$scope.isEditable[$index] = true;
   }


$scope.templates =
      [ { name: 'template1.html', url: '/partials/homep.html'},
        { name: 'template2.html', url: '/partials/todo.html'} ];
    $scope.template = $scope.templates[0];
});

todoApp.controller ('homeCtrl', function($scope) {
$scope.message = "Be Brave and confront evil with Valor"
}) ;

todoApp.controller ('loginCtrl', function($scope,$rootScope) {

$rootScope.hidePic = false;
$rootScope.status = "Logged In";
//console.log($rootScope.hidePic)
//console.log($rootScope.status)
}) ;


todoApp.controller('elasticDemoController', ['$scope', '$log', function($scope, $log){
        'use strict';

        $scope.foo = 'This textarea is going to grow when you fill it with text. Just type a few more words in it and you will see. This textarea is going to grow when you fill it with text.';
        $scope.bar = 'Elastic with a CSS transition. Try typing something...';

        $scope.submit = function(){
          $scope.bar = '';
        };

        $scope.show = true;
      }])
      .controller('elasticCallbackController', ['$scope', '$log', function($scope, $log){
        'use strict';

        $scope.$on('elastic:resize', function(){
          $log.log('Height was adjusted!');
        });
      }]);