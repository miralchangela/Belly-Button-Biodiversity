// get a array using map() method 

var numbers =[1,2,3,4,5];

var addbyfive = numbers.map(
    function(num)
    {
        return num + 5 ;
    }  
);
console.log(addbyfive);

// filter a data with species start with s letter using filter () method

var words = ['seal', 'dog', 'scorpion', 'orangutan', 'salamander'];

var species = words.filter(word => word.charAt(0) == 's');

console.log(species);