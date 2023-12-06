## timer с режимом секундомера  

Посмотреть - [ОТКРЫТЬ САЙТ](https://rykitik.github.io/timer/)  
--------------------------  
### API:  
Обьявление нового таймера - сonst timer = new Timer(fiveMinutes, display)  

timer.startTimer() - запуск таймера  
timer.stopTimer() - пауза  
timer.resetTimer() - сброс таймера  
timer.setCountdownMode(true/false) - меняет режим работы таймера в режимы таймер/секудомер  
timer.getElapsedTime() - получить пройденное в секундах время  
timer.getDisplayedTime() - получить отоброжаемое в текстдраве время  
timer.formatTimeToVariables(time) - возвращает секнды минуты и часы из указанного времени time
