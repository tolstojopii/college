let products = [
    {
        id: 1,
        name: "Смартфон iPhone 13",
        description: "128GB, черный",
        price: 79990,
        category: "electronics",
        image: "https://avatars.mds.yandex.net/get-mpic/12485547/2a00000192fb929f0eb57e4b8a9d550acdb8/orig"
    },
        {
        id: 2,
        name: "Ноутбук MacBook Air",
        description: "M1, 256GB",
        price: 99990,
        category: "electronics",
        image: "https://avatars.mds.yandex.net/get-marketpic/15415595/picb9bc09418e60c11e7ee5b9c70a0ba35f/orig"
    },
        {
        id: 3,
        name: "Футболка Nike",
        description: "Размер M, белая",
        price: 2490,
        category: "clothing",
        image: "https://cdn1.ozone.ru/s3/multimedia-1-b/6964773023.jpg"
    },
        {
        id: 4,
        name: "Джинсы Levis",
        description: "W32 L34, синий",
        price: 5990,
        category: "clothing",
        image: "https://n.cdn.cdek.shopping/images/shopping/7a7PMZqAWceySh04.jpg?v=1"
    },
        {
        id: 5,
        name: "Книга 'Javascript для детей'",
        description: "Ник Морган",
        price: 1200,
        category: "books",
        image: "https://avatars.mds.yandex.net/get-mpic/14770882/2a00000197b370dbde9297a423b93ecb3e18/orig"
    },
        {
        id: 6,
        name: "Книга Гарри Поттер",
        description: "Дж. Роулинг",
        price: 800,
        category: "books",
        image: "https://avatars.mds.yandex.net/get-marketpic/1105066/pic2e491eb6210430625d471ad937932b22/orig"
    },
    {
        id: 7,
        name: "Спиннинг",
        description: "Карбоновый",
        price: 80000,
        category: "fishing-rods",
        image: "https://avatars.mds.yandex.net/get-mpic/5057162/2a000001905eb2c58cb21b5b2a033703add9/orig"
    },
    {
        id: 8,
        name: "Удочка для рыбалки детская",
        description: "Игрушечная, пластик",
        price: 2400,
        category: "fishing-rods",
        image: "https://avatars.mds.yandex.net/i?id=b2db490738ea4a5875832dfb29c6d7b1_l-12569873-images-thumbs&n=13"
    },
    {
        id: 9,
        name: "Хлеб",
        description: "Мягкий",
        price: 57,
        category: "foodstuff",
        image: "https://main-cdn.sbermegamarket.ru/big2/hlr-system/-12/490/772/781/121/049/100061799221b0.jpg"
    },
    {
        id: 10,
        name: "Шаурма двойная",
        description: "Вкусная",
        price: 400,
        category: "foodstuff",
        image: "https://img.freepik.com/premium-photo/delicious-doner-kebab-wrap-with-grilled-meat-fresh-vegetables-transparent-background_511031-6686.jpg?semt=ais_hybrid&w=740"
    }
    
]


let currentFilter = null;
let nextId = products.length + 1;


const mainContainer = document.querySelector('main')
const titleElement = document.querySelector('h1')
const headerElement = document.querySelector('header')
const footerElement = document.querySelector('footer')
const counter_plus = document.querySelector('[data-counter-plus]')
const counter_delete = document.querySelector('[data-counter-delete]')
const totalCounterElem = document.querySelector('.items-current[data-counter-total]')


function addProduct(){
    const categories = ['electronics', 'clothing', 'books','fishing-rods','foodstuff'];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    let price, name;
    switch(randomCategory){
        case 'electronics':
            price = Math.floor(Math.random() * 50000 + 10000);
            name = `Электроника ${nextId}`;
            break;
        case 'clothing':
            price = Math.floor(Math.random() * 5000 + 1000);
            name = `Одежда ${nextId}`;
            break;
        case 'books':
            price = Math.floor(Math.random() * 2000 + 300);
            name = `Книга ${nextId}`;
            break;
        case 'fishing-rods':
            price = Math.floor(Math.random() * 2000 + 300);
            name = `Удочка ${nextId}`;
            break;
        case 'foodstuff':
            price = Math.floor(Math.random() * 2000 + 300);
            name = `Еда ${nextId}`;
            break;
        
    }
    const newProduct = {
        id: nextId++,
        name: name,
        description: `Новый товар в категории ${randomCategory}`,
        price: price,
        category: randomCategory,
        image : ``
    };

    products.push(newProduct);
    renderProducts();
}

function deleteProduct(productId){
    products = products.filter(product => product.id !== productId);
    renderProducts();
}

function setFilter(category){
    currentFilter = category;
    renderProducts();
}

function clearFilter(){
    currentFilter = null;
    renderProducts();
}

function renderProducts(){
    let productsToRender = products;
    if (currentFilter) {
        productsToRender = products.filter(product => product.category === currentFilter);
    }

    mainContainer.innerHTML = '';

    if (productsToRender.length === 0){
        const emptyMessage = document.createElement('div');
        emptyMessage.textContent = 'Товары не найдены'
        emptyMessage.style.padding = '20px';
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.width = '100%';
        mainContainer.appendChild(emptyMessage);
        return;
    }

    productsToRender.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.dataset.productId = product.id;
        
        totalCounterElem.dataset.counterTotal = products.length
        totalCounterElem.innerHTML = `<b>${products.length}</b>` // добавил количество товаров(всего)

        // const statsRow = document.createElement('div');
        // statsRow.className= 'stats-row';
        // const label = document.createElement('p');
        // label.textContent = 'Количество товаров: ';


        card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h4>${product.name}<h4>
        <p>${product.description}</p>
        <div class="card-meta">
            <span class="price">${product.price.toLocaleString()} ₽</span>
            <div>
                <button class="but-btn">Купить</button>
                <button class="delete-btn" data-id="${product.id}">Удалить</button>
            </div>
        </div>`;

        mainContainer.appendChild(card);
    });

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const productId = parseInt(btn.dataset.id);
            counter_delete.innerText = ++counter_delete.innerText
            totalCounterElem.innerText = --totalCounterElem.innerText
            deleteProduct(productId);
        });
    });

    
    document.querySelectorAll('.but-btn').forEach(btn => {
        btn.addEventListener('click', function(){
        counter_plus.innerText = ++counter_plus.innerText
        });
    });
}



const titles = [
    "Добро пожаловать в наш магазин!",
    "Лучшие товары по лучишм ценам",
    "Найди то, что тебе нужно",
    "Маркетплейс для всех"
];

function changeTitle(){
    const randomIndex = Math.floor(Math.random() * titles.length);
    titleElement.textContent = titlet[randomIndex];
    titleElement.style.color= getRandomColor();
}

const colors = ['red', 'green', 'blue', 'orange', 'violet'];


function getRandomColor(){
    return colors[Math.floor(Math.random() * colors.length)];
}


function changeHeaderAndFooter(){
    const index = Math.floor(Math.random() * colors.length);
    headerElement.style.backgroundColor = colors[index];
    footerElement.style.backgroundColor = colors[index];


    headerElement.style.color = 'white';
}


function clearAll(){
    products = [];
    currentFilter = null;
    renderProducts();

    titleElement.textContent = 'hello';
    titleElement.style.color = 'black';
}



document.querySelector('#button1').addEventListener('click', changeTitle);
document.querySelector('#button2').addEventListener('click', addProduct);
document.querySelector('#button3').addEventListener('click', changeHeaderAndFooter);



/* document.querySelector('#elec').addEventListener('change', function(){
    if (this.checked) {
        setFilter('electronics');
    } else { 
        clearFilter();
    }
});
document.querySelector('#clothing').addEventListener('change', function(){
    if (this.checked) {
        setFilter('clothing');
    } else {
        clearFilter();
    }
});
document.querySelector('#books').addEventListener('change', function(){
    if (this.checked) {
        setFilter('books');
    } else {
        clearFilter();
    }
}); */

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(checkbox =>{
    checkbox.addEventListener('change', function(){
        if (this.checked) {
            checkboxes.forEach(otherCheckbox =>{
                if (otherCheckbox !== this){
                    otherCheckbox.checked = false;
                }
            });
            const categoryMap = {
                'elec': 'electronics',
                'clothing': 'clothing',
                'books': 'books',
                'fishing-rods':'fishing-rods',
                'foodstuff':'foodstuff'
            };
            setFilter(categoryMap[this.id]);
        }else{
            clearFilter();
        }
    });
});


renderProducts();