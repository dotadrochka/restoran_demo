const RESTAURANT_CONFIG = {
  name: "УГЛИ & МЯСО",
  cityBadge: "г. Владимир • Работаем ежедневно",
  title: "Настоящий вкус мяса и огня в центре Владимира",
  subtitle: "Сочные стейки, фирменные бургеры и горячие блюда на мангале. Забронируйте столик онлайн без звонков.",
  address: "г. Владимир, ул. Большая Московская, 19",
  phone: "+7 (4922) 00-00-00",
  hours: "Пн–Чт: 12:00–23:00 | Пт–Вс: 12:00–01:00",
  telegramUsername: "telegram",
  menu: [
    {
      category: "Горячее",
      title: "Стейк Рибай на углях",
      price: "1 490 ₽",
      weight: "320 г",
      desc: "Мраморная говядина зернового откорма, розмарин, чесночное масло и перечный соус.",
      img: "https://unsplash.com"
    },
    {
      category: "Горячее",
      title: "Шашлык из свиной шеи",
      price: "690 ₽",
      weight: "280 г",
      desc: "Маринованная шея на березовых углях, красный лук, зелень и фирменный соус.",
      img: "https://unsplash.com"
    },
    {
      category: "Бургеры",
      title: "Фирменный Чизбургер Блэк",
      price: "590 ₽",
      weight: "360 г",
      desc: "Котлета из мраморной говядины, двойной чеддер, бекон, солёный огурчик и картофель фри.",
      img: "https://unsplash.com"
    },
    {
      category: "Закуски",
      title: "Тёплый салат с говядиной",
      price: "540 ₽",
      weight: "250 г",
      desc: "Обжаренная вырезка, микс салатов, томаты черри, печёный перец и горчичная заправка.",
      img: "https://unsplash.com"
    },
    {
      category: "Закуски",
      title: "Хачапури по-аджарски",
      price: "490 ₽",
      weight: "400 г",
      desc: "Румяная лодочка из теста с тянущимся сулугуни, сливочным маслом и желтком.",
      img: "https://unsplash.com"
    },
    {
      category: "Напитки",
      title: "Домашний ягодный лимонад",
      price: "320 ₽",
      weight: "500 мл",
      desc: "Освежающий напиток из свежей малины, мяты, лайма и тростникового сиропа.",
      img: "https://unsplash.com"
    }
  ]
};

document.title = `${RESTAURANT_CONFIG.name} — Официальный сайт`;
document.getElementById("navLogo").textContent = RESTAURANT_CONFIG.name;
document.getElementById("heroCity").textContent = RESTAURANT_CONFIG.cityBadge;
document.getElementById("heroTitle").textContent = RESTAURANT_CONFIG.title;
document.getElementById("heroSubtitle").textContent = RESTAURANT_CONFIG.subtitle;
document.getElementById("contactAddress").textContent = RESTAURANT_CONFIG.address;
document.getElementById("contactPhone").textContent = RESTAURANT_CONFIG.phone;
document.getElementById("contactHours").textContent = RESTAURANT_CONFIG.hours;
document.getElementById("footerCopy").textContent = `© 2026 ${RESTAURANT_CONFIG.name}. Все права защищены.`;

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

document.getElementById("bookingForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("guestName").value.trim();
  const date = document.getElementById("guestDate").value;
  const time = document.getElementById("guestTime").value;
  const guests = document.getElementById("guestCount").value;

  const message = `Здравствуйте! Хочу забронировать стол в «${RESTAURANT_CONFIG.name}».\nИмя: ${name}\nДата: ${date}\nВремя: ${time}\nГостей: ${guests}`;
  const tgUrl = `https://t.me{RESTAURANT_CONFIG.telegramUsername}?text=${encodeURIComponent(message)}`;
  window.open(tgUrl, "_blank");
});