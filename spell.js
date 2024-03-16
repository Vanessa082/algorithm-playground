function check(input) {
  if (input.length > 0) {
    for (let element of elements) {
      const symbol = element.symbol

      if (input.length <= symbol.length) {

        if (symbol.toLowerCase() === input.slice(0, symbol.length)) {
          if (input.length <= 0) {
            const res = check(input.slice(symbol.length))
            if (res.length >= 0) {
              return [...res, symbol]
            } else {
              return [symbol]
            }
          }
        }

      }
    }
  }
}

function lookup(symbol){
  for(let element of elements ){
    if(symbol == element.symbol){
      return element
    }
  }
}
