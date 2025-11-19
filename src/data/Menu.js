// C:/brkreact/src/data/menu.js

import pizza1 from '../assets/pizza1.png';
import pizza2 from '../assets/pizza2.png';
import pizza3 from '../assets/pizza3.png';
import donut1 from '../assets/donut1.png';
import drink1 from '../assets/drink1.png';

const menu = [
    { 
        id: 1, 
        pizza: pizza1, 
        name: "Peporoni Pizza", 
        desc: "Lorem ipsum dolor...", 
        rating: 4, 
        price: 50000,
        category: "Pizza",
        stock : 10,
        maxpurchase : 2
    },
    { 
        id: 2, 
        pizza: pizza2, 
        name: "Sushi Pizza", 
        desc: "Lorem ipsum dolor...", 
        rating: 4, 
        price: 50000,
        category: "Pizza",
        stock : 10,
        maxpurchase : 2
    },
    { 
        id: 3, 
        pizza: pizza3, 
        name: "Margarita Pizza", 
        desc: "Lorem ipsum dolor...", 
        rating: 4, 
        price: 50000,
        category: "Pizza",
        stock : 10,
        maxpurchase : 2
    },
    { 
        id: 4, 
        pizza: drink1, 
        name: "Es Teh Manis", 
        desc: "Lorem ipsum dolor...", 
        rating: 5, 
        price: 15000,
        category: "Minuman",
        stock : 10,
        maxpurchase : 2
    },
    { 
        id: 5, 
        pizza: donut1, 
        name: "Donut Coklat", 
        desc: "Lorem ipsum dolor...", 
        rating: 4, 
        price: 10000,
        category: "Donut",
        stock : 10,
        maxpurchase : 2
    },
];

export default menu;