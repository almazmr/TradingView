let arr = [
	['ETHBTC', 'trendweek', 180, -0.91],
	['ETHBTC', 'MA+ATR str my', 180, 20.1],
	['ETHBTC', 'Ratings', 180, 53430.87],
	['ETHBTC', 'Combo', 180, 9380.41],
	['ETHBTC', 'trendweek', 240, 87250.89],
	['ETHBTC', 'MA+ATR str my', 240, -20.4],
	['ETHBTC', 'Ratings', 240, 20386.6],
	['ETHBTC', 'Combo', 240, 2041.22],
	['ETHBTC', 'trendweek', 360, 47627.18],
	['ETHBTC', 'MA+ATR str my', 360, 59.49],
	['ETHBTC', 'Ratings', 360, 12016.61],
	['ETHBTC', 'Combo', 360, 3350.31],
	['ADABTC', 'trendweek', 180, 15179.81],
	['ADABTC', 'MA+ATR str my', 180, 927.1],
	['ADABTC', 'Ratings', 180, 2588.62],
	['ADABTC', 'Combo', 180, 4217.36],
	['ADABTC', 'trendweek', 240, 16593.32],
	['ADABTC', 'MA+ATR str my', 240, 602.71],
	['ADABTC', 'Ratings', 240, 4535.63],
	['ADABTC', 'Combo', 240, 3436.57],
	['ADABTC', 'trendweek', 360, 13667.34],
	['ADABTC', 'MA+ATR str my', 360, 220.59],
	['ADABTC', 'Ratings', 360, 944.24],
	['ADABTC', 'Combo', 360, 738.28],
	['BNBBTC', 'trendweek', 180, 50103.29],
	['BNBBTC', 'MA+ATR str my', 180, 1005.38],
	['BNBBTC', 'Ratings', 180, 25770.24],
	['BNBBTC', 'Combo', 180, 90711.42],
	['BNBBTC', 'trendweek', 240, 55316.93],
	['BNBBTC', 'MA+ATR str my', 240, 158.61],
	['BNBBTC', 'Ratings', 240, 23190.89],
	['BNBBTC', 'Combo', 240, 74459.31],
	['BNBBTC', 'trendweek', 360, 38244.78],
	['BNBBTC', 'MA+ATR str my', 360, 119.73],
	['BNBBTC', 'Ratings', 360, 10792.24],
	['BNBBTC', 'Combo', 360, 26785.7],
	['XRPBTC', 'trendweek', 180, 38244.78],
	['XRPBTC', 'MA+ATR str my', 180, 119.73],
	['XRPBTC', 'Ratings', 180, 10792.24],
	['XRPBTC', 'Combo', 180, 26785.7],
	['XRPBTC', 'trendweek', 240, 38244.78],
	['XRPBTC', 'MA+ATR str my', 240, 2.31],
	['XRPBTC', 'Ratings', 240, 10792.24],
	['XRPBTC', 'Combo', 240, 26785.7],
	['XRPBTC', 'trendweek', 360, 38244.78],
	['XRPBTC', 'MA+ATR str my', 360, 424.59],
	['XRPBTC', 'Ratings', 360, 10792.24],
	['XRPBTC', 'Combo', 360, 26785.7],
	['DOGEBTC', 'trendweek', 180, 38244.78],
	['DOGEBTC', 'MA+ATR str my', 180, 4867.85],
	['DOGEBTC', 'Ratings', 180, 10792.24],
	['DOGEBTC', 'Combo', 180, 26785.7],
	['DOGEBTC', 'trendweek', 240, 38244.78],
	['DOGEBTC', 'MA+ATR str my', 240, 4867.85],
	['DOGEBTC', 'Ratings', 240, 10792.24],
	['DOGEBTC', 'Combo', 240, 26785.7]
  ];

/* for (let i = 0; i < arr.length; i + 11) {
	for (let j = 3; j < arr[i].length; j++) {
    let one = arr[i][j];
    //let two = arr[i+1][j]
		let arr1 = [one];
    console.log(arr1);
  
	}
} */


Sortino = -5;

newProcent = -10;

sumSortuno = +Sortino * +newProcent;

if (+Sortino < 0 && +newProcent < 0) {
  sumSortuno = sumSortuno * 1;
  console.log(sumSortuno, "lol");
}