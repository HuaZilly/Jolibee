const Dish = [{
        name: 'CƠM GÀ GIÒN (1 MIẾNG GÀ <br> GIÒN, CƠM VÀ XÀ LÁCH)',
        path: 'https://jollibee.com.vn/uploads/dish/d1834d87116836-2mingggin.png',
        price: 40000,
        quantity: 1
    }, {
        name: '2 MIẾNG GÀ GIÒN + KHOAI <br>TÂY VỪA + NƯỚC NGỌT',
        path: 'https://jollibee.com.vn/uploads/dish/d1834d87116836-2mingggin.png',
        price: 80000,
        quantity: 1
    },
    {
        name: '2 MIẾNG GÀ GIÒN',
        path: 'https://jollibee.com.vn/uploads/dish/d1834d87116836-2mingggin.png',
        price: 60000,
        quantity: 1
    }, {
        name: '4 MIẾNG GÀ GIÒN',
        path: 'https://jollibee.com.vn/uploads/dish/d1834d87116836-2mingggin.png',
        price: 116000,
        quantity: 1
    }, {
        name: '6 MIẾNG GÀ GIÒN',
        path: 'https://jollibee.com.vn/uploads/dish/d1834d87116836-2mingggin.png',
        price: 174000,
        quantity: 1
    }, {
        name: 'CƠM GÀ GIÒN + SÚP BÍ ĐỎ + <br>NƯỚC NGỌT',
        path: 'https://jollibee.com.vn/uploads/dish/d1834d87116836-2mingggin.png',
        price: 40000,
        quantity: 1
    },
    {
        name: ' C4 - CƠM GÀ GIÒN +<br> NƯỚC NGỌT',
        path: "https://jollibee.com.vn/uploads/dish/d1834d87116836-2mingggin.png",
        price: 45000,
        quantity: 1

    }, {
        name: 'C3 - 1 MIẾNG GÀ GIÒN + <br>KHOAI  TÂY VỪA + NƯỚC <br> NGỌT',
        path: 'https://jollibee.com.vn/uploads/dish/d1834d87116836-2mingggin.png',
        price: 50000,
        quantity: 1
    }, {
        name: '1 MIẾNG GÀ GIÒN',
        path: "https://jollibee.com.vn/uploads/dish/d1834d87116836-2mingggin.png",
        price: 30000,
        quantity: 1
    }
]


function Render() {

    let htmls = Dish.map(e =>
        `<div class="ctn-dish">
            <img src=${e.path} alt="" class="path-img">
            <div class="title-dish">
                ${e.name}
            </div>
            <div class="title-cost">
               ${numberWithCommas(e.price*e.quantity+' Đ')}
            </div>
            <div class="dat-hang">
                <button class="btn-dathang" >ĐẶT HÀNG</button>
            </div>
        </div>`
    ).join('');
    document.getElementById('dish').innerHTML = htmls;

}
Render();
const select_dish = [];
//Format Price
function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(".");
}
//UpDate Quantity
function UpdateQuantity(index, quantity) {
    if (quantity < 1) {
        return
    }
    select_dish[index].quantity1 = quantity;
    Addquantity();

}
//Remove Item[i]
function remove(i) {
    select_dish.splice(i, 1);
    document.getElementById('sl').innerText = select_dish.length;
    Addquantity();

}
//Add Items When Click Element Btn__dathang
function add(index) {
    select_dish.push({
        name1: Dish[index].name,
        price1: Dish[index].price,
        quantity1: Dish[index].quantity,
    })
    Addquantity();
}
// Function Add() run

let dathang = [...document.getElementsByClassName('btn-dathang')];
for (let i = 0; i < dathang.length; i++) {
    dathang[i].addEventListener('click', () => {
        document.getElementById('sl').innerText = select_dish.length + 1;
        add(i);
    });
}


//AddQuantity Main Function
function Addquantity() {

    let ctn_order = document.getElementById('ctn-order');
    //Use Map combine Element and Object
    let htmls = select_dish.map(e => `
    <div class="ctn-order-dish" id="ctn-order-dish">
        <div class="name-dish">${e.name1} </div>
        <div class="ctn-quantity">
            <span><button class="trim">-</button></span>
            <span class="quantity">${numberWithCommas(e.quantity1)}</span>
            <span><button class="plus">+</button></span>
            <span class="price">${numberWithCommas(e.price1*e.quantity1 +' Đ')}</span>
        </div>
        <div class="ctn-delete"> <button class="delete">X</button></div>
    </div>
    `).join('');
    ctn_order.innerHTML = htmls;
    let total = 0;
    select_dish.forEach(e =>
        total += e.quantity1 * e.price1)
    document.getElementById('total').innerText = numberWithCommas(total + ' Đ');

    const trim = [...document.getElementsByClassName('trim')];
    const plus = [...document.getElementsByClassName('plus')];
    const Delete = [...document.getElementsByClassName('ctn-delete')];

    for (let j = 0; j < trim.length; j++) {
        trim[j].addEventListener('click', () => {
            UpdateQuantity(j, select_dish[j].quantity1 - 1);
        })
        plus[j].addEventListener('click', () => {
            UpdateQuantity(j, select_dish[j].quantity1 + 1)
        })
        Delete[j].addEventListener('click', () => {
            remove(j);
        })
    }

}


Addquantity();

// function redirect(url) {
//     url = '';
//     var ua = navigator.userAgent.toLowerCase(),
//         isIE = ua.indexOf('msie') !== -1,
//         version = parseInt(ua.substr(4, 2), 10);

//     // Internet Explorer 8 and lower
//     if (isIE && version < 9) {
//         var link = document.createElement('a');
//         link.href = url;
//         link.target = '_blank'
//         document.body.appendChild(link);
//         link.click();
//     }

//     // All other browsers can use the standard window.location.href (they don't lose HTTP_REFERER like Internet Explorer 8 & lower does)
//     else {
//         window.location.href = url;
//     }
// }
// if (select_dish.length > 0) {
//     document.getElementById('check-out').addEventListener('click', () => {
//         redirect('https://prettygirl.info');
//     })
// } else {
//     // alert('Vui lòng thêm đồ ăn');
// }