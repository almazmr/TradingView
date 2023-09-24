//const { test }  = require('@playwright/test');
const { time } = require('console');
const { chromium }  = require('playwright');

//test('test',
(async () => {
  const browser = await chromium.launch({ headless:false });
  const context = await browser.newContext({ storageState: "./auth2.json"});

  const page = await context.newPage();
  //test.setTimeout(0);
  await page.goto('https://ru.tradingview.com/');  

  //await page.setDefaultNavigationTimeout(60000);

  await page.goto('https://ru.tradingview.com/chart/');

  //await page.waitForTimeout(8000);


  //какую крипту проверяем  
  const fs = require('fs');
  let pairs = fs.readFileSync('03.10.2021/btc.txt').toString().replace(/\r\n/g,'\n').split("\n");

  Data = new Date();
  Year = Data.getFullYear();
  Month = Data.getMonth();
  Day = Data.getDate();
  Hour = Data.getHours();
  Minutes = Data.getMinutes();
  Seconds = Data.getSeconds();

  // Вывод
  let now = (Year + Month + Day + Hour + "." + Minutes + "." + Seconds);
  page.setDefaultNavigationTimeout(60000);
  page.setDefaultTimeout(0);

  function txt(data, clear) {
    if (clear) {
      fs.writeFileSync('log.txt', data);
    } else {
      let cur = fs.readFileSync('log.txt');
      fs.writeFileSync('log.txt', cur + "\n" + data); 
    }
  }

  let procent = 0;
  let obj = {};

  txt(now, false);

  //прогон крипты
  for(let item = 0; item < pairs.length; ++item) {

    let old = [pairs[item], 0, 0, 0, 0, 0];

    maxProcent = [];
    //obj[pairs[item]] = {};
    //obj[pair[item]] = pairs[item];
    
    await page.click('div[id="header-toolbar-symbol-search"]');
    await page.waitForTimeout(500);

    // Fill [placeholder="Поиск"]
    //await page.fill('[placeholder="Поиск"]', 'BINANCE:' + pairs[item]);
    await page.fill('[placeholder="Поиск"]', pairs[item]);
    await page.waitForTimeout(500);

    // Press ArrowDown
    await page.press('[placeholder="Поиск"]', 'ArrowDown');
    // Press Enter
    await page.press('[placeholder="Поиск"]', 'Enter');

    await page.waitForTimeout(1000);
    
    const timeframe = [120, 180, 240, 360, 480, 720];
    // Выбор таймфрейма
    for(let i = 0; i < timeframe.length; ++i) {
      const currentTF = timeframe[i];  
      await page.click(`[data-value="${currentTF}"]`);

      await page.waitForTimeout(3000);

      //выбор стратегии
      const strategy = ['RSIAlgo'];
      
      for(let a = 0; a < strategy.length; ++a) {

        const currentStrategy = strategy[a];


         //раскрытие списка стратегий
        // Click #bottom-area >> :nth-match(div:has-text("Noro's MA+ATR Strategy"), 4)
        
        await page.click('#bottom-area > div.bottom-widgetbar-content.backtesting > div.backtesting-head-wrapper > div:nth-child(1) > div > span.caption');


        // Click span:has-text("trendweek")
        await page.click(`span:has-text("${currentStrategy}")`);

        // Click text=145.3 %
        let newProcent = procent;
        



        try {
          await page.waitForSelector('div > div.report-data > div:nth-child(1) > strong', {timeout: 10000});
          profit = await page.textContent('div > div.report-data > div:nth-child(1) > strong');

          //клик на Сводка показателей
          await page.click('div.backtesting-head-wrapper > div.backtesting-select-wrapper > ul > li:nth-child(2)');
          Sortino = await page.textContent('table > tbody > tr:nth-child(7) > td:nth-child(2)');

          invest = await page.textContent('table > tbody > tr:nth-child(5) > td:nth-child(2) > div:nth-child(2) > span');

          //клик на Обзор
          await page.click('div.backtesting-head-wrapper > div.backtesting-select-wrapper > ul > li:nth-child(1)');

        } catch (error) {
          profit = '0 BTC';
          Sortino = '0';
          invest = '0';
        }

        if (profit !== '0 BTC'){
          await page.waitForTimeout(1000);
          procent = await page.textContent('div > div.report-data > div:nth-child(1) > p > span', {timeout: 0});
          procent = procent.replace(/[%\s]/g, '');

          while (newProcent === procent){
            await page.waitForTimeout(3000);
            newProcent = await page.textContent('div > div.report-data > div:nth-child(1) > p > span');
            newProcent = +newProcent.replace(/[%\s]/g, '');
  
            console.log('newProcent === procent');
          }
          newProcent = +procent;

        } else {
          newProcent = 0;

        }

        sumSortuno = +Sortino * +newProcent;

        if (+Sortino < 0 && +newProcent < 0) {
          sumSortuno = sumSortuno * -1;
        }

        //console.log("['" + pairs[item] + "', '" + currentStrategy + "', " + currentTF + ", " + +newProcent.toFixed(2) + ", " + +Sortino + ", " + +sumSortuno.toFixed(2) + "'],");

        let current = [pairs[item], currentStrategy, currentTF, +newProcent.toFixed(2), Sortino, +sumSortuno.toFixed(2), invest];
        
        txt(current, false);
        //console.log(current);


        if (current[5] > old[5]) {
          //console.log(`Больше, ${current[5]} > ${old[5]}`);
          await page.screenshot({ path: `screenshots/${now}/${pairs[item]}_${currentStrategy}_${currentTF}_${newProcent}_${Sortino}_${sumSortuno}.png` });
          old = current;
        } else {
          //console.log(`Меньше, ${current[5]} < ${old[5]}`);
        }
      }
    }
    console.log(old);
   }
   //await page.pause();
   await context.close();
})();