function getLowestPrice(numbers) {
  return Math.min(...numbers.map((num) => num.price))
}

let nums = [
  { price: 4 },
  { price: 23 },
  { price: 6 },
  { price: 3 },
  { price: 34 },
]

let test = getLowestPrice(nums)

console.log(test)
