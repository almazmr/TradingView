const { time } = require('console');
const { chromium }  = require('playwright');
const { test, expect } = require('@playwright/test');
const { compileFunction } = require('vm');
//алерты
test('test', async () => {

    test.setTimeout(0);

    const browser = await chromium.launch({ headless:false, timeout:0 });
    const context = await browser.newContext({ storageState: "./auth2.json"});

    const page = await context.newPage();
    await page.setDefaultTimeout(0);
    await page.setDefaultNavigationTimeout(0);

    //test.setTimeout(0);
    await page.goto('https://ru.tradingview.com/');  
  
    //await page.setDefaultNavigationTimeout(60000);
  
    await page.goto('https://ru.tradingview.com/chart/');
  
    //await page.waitForTimeout(8000);


    //получаем массив из файла 
    const fs = require('fs');
    let array = [];
    
    str = fs.readFileSync('03.10.2021/btc_ready.txt').toString().replace(/\r\n/g,'\n').split("\n");
    str = str.toString();
    
    var result = [];
    str.replace(/(Word[\s\d]+)(?=\sWord)/g, '$1,')
    .split(',')
    .forEach(function(el) { 
    result.push(el.split(' '));
    });

    console.log(result);

    //выбрали пару
    for(let item = 0; item < result.length; ++item) {

        console.log(result[item]);


        await page.click('div[id="header-toolbar-symbol-search"]');
        await page.waitForTimeout(500);
        // Fill [placeholder="Поиск"]
        await page.fill('[placeholder="Поиск"]', 'BINANCE:' + result[item][1]);
        await page.waitForTimeout(500);
        // Press ArrowDown
        await page.press('[placeholder="Поиск"]', 'ArrowDown');
        // Press Enter
        await page.press('[placeholder="Поиск"]', 'Enter');
        await page.waitForTimeout(1000);


        //выбор TF
        const currentTF = result[item][3];  
        await page.click(`[data-value="${currentTF}"]`);
        await page.waitForTimeout(3000);


        //Кнопка создания уведомления
        await page.keyboard.press('Alt+A'); //Shift+O

        //раскрыть список стратегий
        await page.click('div.tv-alert-dialog__group-item.tv-alert-dialog__group-item--left.js-main-series-select-wrap > span > span.tv-control-select__control.tv-dropdown-behavior__button > span');
        for (let a = 1; a < 10; a++ ){
            strategy = await page.textContent(`//*[@id="overlap-manager-root"]/div/div/div[2]/div[1]/div/div/p/form/fieldset/div[1]/span/div[1]/span/span[2]/span/span/span[${a}]`);
            currentStrategy = strategy.includes(result[item][2]);

            if (currentStrategy) {
                await page.click(`//*[@id="overlap-manager-root"]/div/div/div[2]/div[1]/div/div/p/form/fieldset/div[1]/span/div[1]/span/span[2]/span/span/span[${a}]`);
                await page.waitForTimeout(1000);
            }
        }

        description = result[item][1].replace("BTC", "");

        //Бессрочное
        await page.click('//*[@id="overlap-manager-root"]/div/div/div[2]/div[1]/div/div/p/form/fieldset/span[2]/div[3]/label/span[1]/span[2]');

        //заполнить поле описание BUY_EXCHANGE_BTC-ETH
        await page.fill('textarea[name="description"]', `{{strategy.order.action}}_BINANCE_BTC-${description}`);

        await page.screenshot({ path: `alert/${result[item][1]}.png` });

        //Кнопка Сохранить
        await page.click('//*[@id="overlap-manager-root"]/div/div/div[3]/div[2]/span[2]');

    };
    
});