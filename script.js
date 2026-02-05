let products = [];

// LOAD DATA
fetch("./db.json")
    .then(res => res.json())
    .then(data => {
        products = data.products;
        display(products);
    });


// HIỂN THỊ
function display(list) {

    let html = "";

    list.forEach(p => {

        let style = p.isDeleted
            ? "text-decoration:line-through;color:gray"
            : "";

        html += `
            <tr style="${style}">
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>${p.price.toLocaleString()}</td>
                <td>
                    <button class="btn btn-danger btn-sm"
                        onclick="softDelete('${p.id}')">
                        Xoá
                    </button>
                </td>
            </tr>
        `;
    });

    document.getElementById("tableBody").innerHTML = html;
}


// TÌM KIẾM
function searchByName() {

    let key = document.getElementById("searchInput").value.toLowerCase();

    let result = products.filter(p =>
        p.name.toLowerCase().includes(key)
    );

    display(result);
}


// SẮP XẾP TÊN
function sortNameAsc() {
    let list = [...products].sort((a, b) =>
        a.name.localeCompare(b.name)
    );
    display(list);
}

function sortNameDesc() {
    let list = [...products].sort((a, b) =>
        b.name.localeCompare(a.name)
    );
    display(list);
}


// SẮP XẾP GIÁ
function sortPriceAsc() {
    let list = [...products].sort((a, b) =>
        a.price - b.price
    );
    display(list);
}

function sortPriceDesc() {
    let list = [...products].sort((a, b) =>
        b.price - a.price
    );
    display(list);
}


// XOÁ MỀM
function softDelete(id) {

    let product = products.find(p => p.id === id);

    if (product) {
        product.isDeleted = true;
        display(products);
    }
}


// ID TỰ TĂNG (NẾU SAU NÀY THÊM MỚI)
function genId() {

    if (products.length === 0) return "1";

    let maxId = Math.max(
        ...products.map(p => Number(p.id))
    );

    return String(maxId + 1);
}