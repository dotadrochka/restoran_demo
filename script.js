const RESTAURANT_CONFIG = {
  name: "АБАЖУР • ART-CAFÉ",
  cityBadge: "г. Владимир, ул. Княгининская, 7 • Ежедневно",
  title: "Уютное арт-кафе в центре Владимира для ужинов и праздников",
  subtitle: "Авторская европейская и русская кухня, круглогодичная веранда, банкеты, свадьбы и новогодние корпоративы. Удобная бронь столика онлайн за 30 секунд.",
  address: "г. Владимир, ул. Княгининская, 7",
  phone: "+7 (4922) 42-11-56",
  hours: "Вс–Чт: 12:00–23:00 | Пт–Сб: 12:00–01:00",
  developerTelegram: "@outworld_destroyi",
  isDemo: true,
  menu: [
    {
      category: "Горячие блюда",
      title: "Медальоны из говяжьей вырезки",
      price: "1 190 ₽",
      weight: "290 г",
      desc: "Нежная вырезка с печёным картофелем, овощами гриль и авторским ягодным соусом.",
      img: "https://unsplash.com"
    },
    {
      category: "Горячие блюда",
      title: "Филе судака под сливочным соусом",
      price: "780 ₽",
      weight: "270 г",
      desc: "Запечённое филе волжского судака со шпинатом, томатами черри и воздушным пюре.",
      img: "https://unsplash.com"
    },
    {
      category: "Салаты и закуски",
      title: "Тёплый салат с ростбифом и вешенками",
      price: "560 ₽",
      weight: "240 г",
      desc: "Сочный ростбиф, обжаренные грибы, микс салатов, кедровый орех и медово-горчичная заправка.",
      img: "https://unsplash.com"
    },
    {
      category: "Салаты и закуски",
      title: "Ассорти сыров и брускетт к вину",
      price: "890 ₽",
      weight: "350 г",
      desc: "Фермерские сыры, хрустящие брускетты с лососем и печёным перцем, мёд и орехи.",
      img: "https://unsplash.com"
    },
    {
      category: "Банкеты и десерты",
      title: "Фирменный штрудель с мороженым",
      price: "390 ₽",
      weight: "210 г",
      desc: "Тёплый яблочный штрудель с корицей, грецким орехом и шариком ванильного пломбира.",
      img: "https://unsplash.com"
    },
    {
      category: "Банкеты и десерты",
      title: "Банкетное меню «Под ключ»",
      price: "от 2 500 ₽ / чел.",
      weight: "Индивидуально",
      desc: "Полное сопровождение свадеб, юбилеев и новогодних корпоративов на уютной веранде или в основном зале.",
      img: "https://unsplash.com"
    }
  ]
};

document.title = `${RESTAURANT_CONFIG.name} — Прототип нового сайта`;
document.getElementById("navLogo").textContent = RESTAURANT_CONFIG.name;
document.getElementById("heroCity").textContent = RESTAURANT_CONFIG.cityBadge;
document.getElementById("heroTitle").textContent = RESTAURANT_CONFIG.title;
document.getElementById("heroSubtitle").textContent = RESTAURANT_CONFIG.subtitle;
document.getElementById("contactAddress").textContent = RESTAURANT_CONFIG.address;
document.getElementById("contactPhone").textContent = RESTAURANT_CONFIG.phone;
document.getElementById("contactHours").textContent = RESTAURANT_CONFIG.hours;
document.getElementById("footerCopy").textContent = `© 2026 ${RESTAURANT_CONFIG.name}. Концепт обновления официального сайта.`;

const categories = ["Все", ...new Set(RESTAURANT_CONFIG.menu.map(item => item.category))];
const tabsContainer = document.getElementById("categoryTabs");
const menuGrid = document.getElementById("menuGrid");
let activeCategory = "Все";

function renderTabs() {
  tabsContainer.innerHTML = "";
  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.className = `tab-btn ${cat === activeCategory ? "active" : ""}`;
    btn.textContent = cat;
    btn.onclick = () => {
      activeCategory = cat;
      renderTabs();
      renderMenu();
    };
    tabsContainer.appendChild(btn);
  });
}

function renderMenu() {
  menuGrid.innerHTML = "";
  const filtered = activeCategory === "Все"
    ? RESTAURANT_CONFIG.menu
    : RESTAURANT_CONFIG.menu.filter(item => item.category === activeCategory);

  filtered.forEach(dish => {
    const card = document.createElement("div");
    card.className = "dish-card";
    card.innerHTML = `
      <img src="${dish.img}" alt="${dish.title}" class="dish-img" loading="lazy" />
      <div class="dish-body">
        <div class="dish-top">
          <div class="dish-title">${dish.title}</div>
          <div class="dish-price">${dish.price}</div>
        </div>
        <p class="dish-desc">${dish.desc}</p>
        <div class="dish-weight">Порция: ${dish.weight}</div>
      </div>
    `;
    menuGrid.appendChild(card);
  });
}

renderTabs();
renderMenu();

document.getElementById("guestDate").value = new Date().toISOString().split("T");

if (RESTAURANT_CONFIG.isDemo) {
  const banner = document.createElement("div");
  banner.style.cssText = `
    position: fixed; bottom: 0; left: 0; width: 100%; z-index: 9999;
    background: rgba(212, 163, 89, 0.96); color: #111; text-align: center;
    padding: 10px 16px; font-size: 13px; font-weight: 600;
    box-shadow: 0 -4px 20px rgba(0,0,0,0.4);
  `;
  banner.innerHTML = `ДЕМО-ПРОТОТИП ДЛЯ «${RESTAURANT_CONFIG.name}» • Подключение на ваш домен и настройка заявок: ${RESTAURANT_CONFIG.developerTelegram}`;
  document.body.appendChild(banner);
  document.body.style.paddingBottom = "46px";
}

document.getElementById("bookingForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("guestName").value.trim();
  const date = document.getElementById("guestDate").value;
  const time = document.getElementById("guestTime").value;
  const guests = document.getElementById("guestCount").value;

  if (RESTAURANT_CONFIG.isDemo) {
    alert(
      `ДЕМО-РЕЖИМ:\n\nВ рабочей версии сайта заявка на стол (${name}, ${date} в ${time}, ${guests}) моментально отправится в Telegram администратора заведения.\n\nДля запуска сайта на вашем домене напишите разработчику: ${RESTAURANT_CONFIG.developerTelegram}`
    );
    return;
  }
});
