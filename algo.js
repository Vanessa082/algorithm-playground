function fSequence(n){
  if(n == 0 || n == 1){
    return n
  } else {
  return  fSequence(n - 1 ) + fSequence(n - 2)
  }
}

const figSeries = []

for(let i = 0; i <= 10; i++){
  figSeries.push(fSequence(i))
}

console.log(figSeries)