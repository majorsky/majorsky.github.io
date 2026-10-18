/* related.js — перелинковка статей блога.
   Выбирает 3 статьи псевдослучайно: набор стабилен для конкретной страницы
   (seed от адреса), но различается между страницами. Так ссылки не «прыгают»
   при каждом заходе и поисковик видит постоянную структуру.
*/
(function () {
  "use strict";

  var ARTICLES = [
    { u: "/html/index.html", t: "Про HTML: примеры разметки" },
    { u: "/html/whatsapp.html", t: "Виджет WhatsApp на сайте" },
    { u: "/blogcss/index.html", t: "Про CSS: примеры оформления" },
    { u: "/blogcss/button.html", t: "Красивая кнопка на CSS" },
    { u: "/blogcss/examples.html", t: "CSS-анимация на сайте" },
    { u: "/video/index.html", t: "Видеомонтаж: примеры работ" },
    { u: "/django/", t: "Django: что это и с чего начать" },
    { u: "/django/ustanovka.html", t: "Установка Django на Windows" },
    { u: "/django/models-i-orm.html", t: "Модели Django и ORM" },
    { u: "/django/views-i-urls.html", t: "Views и URL в Django" },
    { u: "/django/deploy.html", t: "Деплой Django на VPS" },
    { u: "/react/", t: "React с нуля" },
    { u: "/react/ustanovka.html", t: "Установка React и Vite" },
    { u: "/react/hooks.html", t: "React Hooks: useState и useEffect" },
    { u: "/react/components-props.html", t: "Компоненты и props в React" },
    { u: "/react/vs-vue.html", t: "React или Vue" },
    { u: "/wordpress/", t: "WordPress с нуля" },
    { u: "/wordpress/ustanovka.html", t: "Установка WordPress на хостинг" },
    { u: "/wordpress/plugins.html", t: "Плагины WordPress" },
    { u: "/wordpress/skorost.html", t: "Как ускорить WordPress" },
    { u: "/wordpress/bezopasnost.html", t: "Защита WordPress от взлома" },
    { u: "/javascript/", t: "JavaScript с нуля" },
    { u: "/javascript/peremennye.html", t: "Переменные: let, const, var" },
    { u: "/javascript/funkcii.html", t: "Функции и замыкания" },
    { u: "/javascript/massivy.html", t: "Методы массивов" },
    { u: "/javascript/dom.html", t: "DOM и события" },
    { u: "/javascript/async-await.html", t: "Промисы и async/await" }
  ];

  var host = document.querySelector(".about-content");
  if (!host) return;

  function norm(path) {
    return path.replace(/\/+$/, "").replace(/\/index\.html$/, "") || "/";
  }

  var current = norm(window.location.pathname);
  var pool = ARTICLES.filter(function (a) {
    return norm(a.u) !== current;
  });

  var seed = 7;
  for (var i = 0; i < current.length; i++) {
    seed = (seed * 31 + current.charCodeAt(i)) % 2147483647;
  }
  for (var k = pool.length - 1; k > 0; k--) {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    var j = seed % (k + 1);
    var tmp = pool[k];
    pool[k] = pool[j];
    pool[j] = tmp;
  }

  var picked = pool.slice(0, 3);

  var title = document.createElement("h3");
  title.textContent = "Читайте также";

  var line = document.createElement("p");
  picked.forEach(function (a, index) {
    if (index > 0) line.appendChild(document.createTextNode(", "));
    var link = document.createElement("a");
    link.href = a.u;
    link.textContent = a.t;
    line.appendChild(link);
  });

  host.appendChild(title);
  host.appendChild(line);
})();
