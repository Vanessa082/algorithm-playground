const arr = [2, 2, 1, 3, 2];

const sumArr = (arr) => {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }

  return sum;
}

const ronsBirthday = (arr, d, m) => {
  let possibleDiv = 0;

  for (let i = 0; i < arr.length; i++) {
    const sub = arr.slice(i, i + m);
    const sum = sumArr(sub)
    
    if(sum == d){
      possibleDiv++
    }

    console.log(sub, sum);
  };

  return possibleDiv;
}

console.log(ronsBirthday(arr, 4, 2));

// time complexity o(4)
// space complexity o(4)