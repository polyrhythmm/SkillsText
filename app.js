const inquirer = require('inquirer')
var grid = [
    [false,false,false,false,false], 
    [false,false,false,false,false],
    [false,false,false,false,false],
    [false,false,false,false,false],
    [false,false,false,false,false]
];
var direction = 'north';

var questions = [{
  type: 'list',
  name: 'option',
  message: "What would you like to do?",
  choices: [ "Place", "Move", "Left", "Right", "Report" ]
}];

var options = [{
    type: 'input',
    name: 'place',
    message: "Give coordinates in 2 numbers separated by a comma",
  }];

askQuestion();

function askQuestion() {
    inquirer.prompt(questions).then(answers => {
        if(answers['option'].toLowerCase() == 'move') {
       
            if(locate() == undefined) {
                console.log("You first must set a location with Place");
            } else {
                move();
            }

            askQuestion();
        } else if(answers['option'].toLowerCase() == 'left') {
            if(locate() == undefined) {
                console.log("You first must set a location with Place");
            } else {
                setDirection('left');
            }
           
            askQuestion();
        } else if(answers['option'].toLowerCase() == 'right') {
            if(locate() == undefined) {
                console.log("You first must set a location with Place");
            } else {
                setDirection('right');
            }

            askQuestion();
        } else if(answers['option'].toLowerCase() == 'place') {
            inquirer.prompt(options).then(answers => { 
                var coordinates = [answers.place.charAt(0), answers.place.charAt(2)];
                if(coordinates[0] > 4 || coordinates[0] < 0) {
                    console.log("Those are invalid coordinates");
                } else if(coordinates[1] > 4 || coordinates[1] < 0) {
                    console.log("Those are invalid coordinates");
                } else {
                    setInitialLocation(coordinates[0], coordinates[1])
                    console.log('The coordinates of the robot it ' + coordinates);
                }
                
                askQuestion();
            });
        } else if(answers['option'].toLowerCase() == 'report') {
            if(locate() == undefined) {
                console.log("You first must set a location with Place");
            } else {
                console.log("The position of the robot is " + locate())
            }
            askQuestion();
        }
      }).catch(error => {
          console.log(error)
      });
}

function move() {
    var location = locate(); 

    if(direction == 'north') {
        if(location[0] == 0) {
            console.log("You can't move in that direction");
        } else if(location[0] > 0) {
            setLocation(location[0], location[1], 'north')
        }    
    } else if(direction == 'south') {
        if(location[0] == 4) {
            console.log("You can't move in that direction");
        } else if(location[0] < 4) {
            setLocation(location[0], location[1], 'south')
        }  
    } else if(direction == 'east') {
        if(location[1] == 4) {
            console.log("You can't move in that direction");
        } else if(location[1] < 4) {
            setLocation(location[0], location[1], 'east')
        }  
    } else if(direction == 'west') {
        if(location[1] == 0) {
            console.log("You can't move in that direction");
        } else if(location[1] > 0) {
            setLocation(location[0], location[1], 'west')
        }  
    }

}

function locate() {
    for(var i = 0; i < grid.length; i++) {
        for(var j = 0; j < grid[i].length; j++) {
            if(grid[i][j] == true) {
                return [i,j];
            }
        }
    }
}

function setLocation(loc0, loc1, move) {
    grid[loc0][loc1] = false;

    if(move == 'north') {
        grid[loc0 - 1][loc1] = true;
        console.log("The robot is now at " + [loc0 - 1, loc1]);
    } else if(move == 'south') {
        grid[loc0 + 1][loc1] = true;
        console.log("The robot is now at " + [loc0 + 1, loc1]);
    } else if(move == 'east') {
        grid[loc0][loc1 + 1] = true;

        console.log("The robot is now at " + [loc0, loc1 + 1]);
    } else if(move == 'west') {
        grid[loc0][loc1 - 1] = true;
        console.log("The robot is now at " + [loc0, loc1 - 1]);
    }
}

function setInitialLocation(loc0, loc1) {
    grid[loc0][loc1] = true;
}



function setDirection(dir) {
    if(direction == 'north') {
        if(dir == 'left') {
            direction = 'west';
            console.log("The robot is now facing west");
        } else if(dir == 'right') {
            direction = 'east';
            console.log("The robot is now facing east");
        }
    } else if(direction == 'east') {
        if(dir == 'left') {
            direction = 'north';
            console.log("The robot is now facing north");
        } else if(dir == 'right') {
            direction = 'south';
            console.log("The robot is now facing south");
        }
    } else if(direction == 'south') {
        if(dir == 'left') {
            direction = 'east';
            console.log("The robot is now facing east");
        } else if(dir == 'right') {
            direction = 'west';
            console.log("The robot is now facing west");
        }
    } else if(direction == 'west') {
        if(dir == 'left') {
            direction = 'south';
            console.log("The robot is now facing south");
        } else if(dir == 'right') {
            direction = 'north';
            console.log("The robot is now facing north");
        }
    }
}
 