const name = 'Max';
let age = 29;
const hasHobbies = true;

age = 30;

const summariseUser = function (userName, userAge, userhasHobby)=> {
    return (
        'Name is ' +
        userName +
        ', age is ' +
        userAge +
        ' and the user has hobbies ' +
        userhasHobby
    );
};

//const add = (a, b) => a + b;
const addOne = a => a + 1;

console.log(add(1, 2));

console.log(summariseUser(name, age, hasHobbies));

//console.log(name);