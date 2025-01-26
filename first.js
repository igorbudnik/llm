// function directions(...args) {
//     let [start, ...remaining] = args;
//     let [finish, ...stops] = remaining.reverse();
// console.log(`drive through ${args.length} towns`);
// console.log(`start in ${start}`);
// console.log(`the destination is ${finish}`);
// console.log(`stopping ${stops.length} times in between`);
// }
// directions("Truckee", "Tahoe City", "Sunnyside", "Homewood", "Tahoma");

// const morning = {
//     breakfast: "oatmeal",
//     lunch: "peanut butter and jelly"
//     };
// const dinner = "mac and cheese";
// const backpackingMeals = {
//     ...morning,
//     dinner
// };

// console.log(backpackingMeals);

// fetch("https://swapi.dev/api/people")
//     .then(res => res.json())
//     .then(json => json.results)
//     .then(console.log)
//     .catch(console.error);

// const getFakePerson = async () => {
//   try {
//     let res = await fetch("https://api.randomuser.me/?nat=US&results=1");
//     let { results } = await res.json();
//     console.log(results[0].location);
//   } catch (error) {
//     console.error(error, "123123123");
//   }
// };
// getFakePerson();

// var XMLHttpRequest = require('xhr2');

// const getPeople = count =>
// new Promise((resolves, rejects) => {
//     const api = `https://api.randomuser.me/?nat=US&results=${count}`;
//     const request = new XMLHttpRequest();
//     request.open("GET", api);
//     request.onload = () =>
//     request.status === 200
//     ? resolves(JSON.parse(request.response).results)
//     : rejects(Error(request.statusText));
//     request.onerror = err => rejects(err);
//     request.send();
// });

// getPeople(5)
//     .then(members => console.log(members))
//     .catch(error => console.error(`getPeople failed: ${error.message}`))

const separateNums = (exp) => {
  return exp.split(/[^\d]/);
};

const separateSigns = (exp) => {
  return exp.split(/\d+/).filter((x) => x);
};

console.log(separateNums("1+3/12*321"));
console.log(separateSigns("1+3/12*321"));
