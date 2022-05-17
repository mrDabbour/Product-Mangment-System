
//==============================================
let title = document.getElementById('title')
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

console.log(title, price, taxes, ads, discount, total, count, category, submit);
// console.log(price);
// console.log(taxes);
// console.log(ads);
// console.log(discount);
// console.log(total);
// console.log(count);i
// console.log(category);
// console.log(submit);
//get total
function getTotal() {

    if (price.value != "") {
        let result = (+price.value + +taxes.value + +ads.value)
            - +discount.value;
        total.innerHTML = result;
        total.style.background = '#040'
    } else {
        total.innerHTML = '';
        total.style.background = 'rgb(230, 0, 0)'
    }
}

//create product
let dataPro;
if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [];
}




submit.onclick = function () {
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),

    }
    // //count
    if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
            dataPro.push(newPro);
        }
    } else {
        dataPro.push(newPro);
    }



    //save localstorge
    //  dataPro.push(newPro);
    localStorage.setItem('product', JSON.stringify(dataPro))
    console.log(dataPro);

    clearDate()
    showData()
}


//clear inputs

function clearDate() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}

// //count
// if (newPro.count > 1) {
//     for (let i = 0; i < newPro.count; i++) {
//         dataPro.push(newPro);
//     }
// }else{
//     dataPro.push(newPro);
// }

//read

function showData() {

    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button id = "update">update</button></td>
        <td><button onclick ="deleteData(${i})" id = "delete">delete</button></td>
    </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDeleteAll = document.getElementById("deleteALL");
    if (dataPro.length > 0) {
        btnDeleteAll.innerHTML = ` <button onclick="deleteAll()">delete All(${dataPro.length})</button>`
    } else {
        btnDeleteAll.innerHTML = '';
    }

}
showData()
//delete

function deleteData(i) {
    dataPro.splice(i, 1)
    localStorage.product = JSON.stringify(dataPro)
    showData()
}

function deleteAll() {
    localStorage.clear()
    dataPro.splice(0)
    showData()
}


//update                                                                                   
//search
let searchMood = 'title';

function getSearchMood(id) {
    let search = document.getElementById('search')
    if (id == 'searchTitle') {
        searchMood = 'title';
        //search.placeholder = 'Search by Title';
    } else {
        searchMood = 'category';
       // search.placeholder = 'Search by Category';

    }
    search.placeholder = 'Search By ' + searchMood;
    search.focus();
    search.value = '';
    showData()
    // console.log(searchMood);
} function searchData(value) {
    let table = '';

    // console.log(value);
    if (searchMood == 'title') {

        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button id = "update">update</button></td>
                <td><button onclick ="deleteData(${i})" id = "delete">delete</button></td>
            </tr>
                `;


                // console.log(i);
            } 
        }
    }else{
        for (let i = 0; i < dataPro.length; i++) {
            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `
                <tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button id = "update">update</button></td>
                <td><button onclick ="deleteData(${i})" id = "delete">delete</button></td>
            </tr>
                `;


                // console.log(i);
            }
        }
    }
        document.getElementById('tbody').innerHTML = table;
}