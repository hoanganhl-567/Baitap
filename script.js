const apiUrl = "db.json";

let products = [];
let filteredProducts = [];
let nameAsc = true;
let priceAsc = true;

// Load dữ liệu từ GitHub
async function loadData() {
    const response = await fetch(apiUrl);
    const data = await response.json();
    products = data.products;
    filteredProducts = [...products];
    renderTable(filteredProducts);
}

// Hiển thị bảng
function renderTable(data) {
    const table = document.getElementById("productTable");
    table.innerHTML = "";

    data.forEach(p => {
        table.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>${p.price.toLocaleString()}</td>
            </tr>
        `;
    });
}

// 🔍 Tìm kiếm theo tên (onChanged)
function searchByName() {
    const keyword = document.getElementById("searchInput").value.toLowerCase();
    filteredProducts = products.filter(p => p.name.toLowerCase().includes(keyword));
    renderTable(filteredProducts);
}

// 🔤 Sắp xếp theo tên tăng/giảm
function sortByName() {
    filteredProducts.sort((a, b) => {
        return nameAsc
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
    });
    nameAsc = !nameAsc;
    renderTable(filteredProducts);
}

// 💰 Sắp xếp theo giá tăng/giảm
function sortByPrice() {
    filteredProducts.sort((a, b) => {
        return priceAsc ? a.price - b.price : b.price - a.price;
    });
    priceAsc = !priceAsc;
    renderTable(filteredProducts);
}

// Khi mở trang
loadData();
