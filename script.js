const services = [
    {
        img: "./images/drycleaning.png",
        type: "Dry Cleaning",
        price: 200.00
    }
    ,
    {
        img: "./images/leather.png",
        type: "Leather & Suede Cleaning",
        price: 999.00
    },
    {
        img: "./images/wedding.png",
        type: "Wedding Dress Cleaning",
        price: 2400.00
    },
    {
        img: "./images/wash.png",
        type: "Wash And Fold",
        price: 140
    },
    {
        img: "./images/stain.png",
        type: "Stain Removal",
        price: 500
    }
];

const ServiceDisplay = document.getElementById("ServiceDisplay");
const skipButton = document.getElementById("skipItem");
const addButton = document.getElementById("additem");

let serviceIndex = 0;
let serialNo = 0;
let totalprice = 0;
const addedService = [];

function displayService(serviceIndex) {
    const service = services[serviceIndex];

    const imgDiv = document.createElement("div");
    const typePrice = document.createElement("div");
    typePrice.classList.add("flex", "justify-between", "font-semibold", "text-xl");

    const img = document.createElement("img");
    img.src = service.img;
    img.alt = service.type;
    img.classList.add("w-[500px]");

    const type = document.createElement("p");
    type.textContent = service.type;

    const price = document.createElement("p");
    price.textContent = `$${service.price}`;
    price.classList.add("text-blue-600");

    typePrice.appendChild(type);
    typePrice.appendChild(price);
    imgDiv.appendChild(img);

    ServiceDisplay.append(imgDiv);
    ServiceDisplay.append(typePrice);

}

displayService(serviceIndex);

function serviceBar() {
    ServiceDisplay.innerHTML = "";
    serviceIndex++;
    if (serviceIndex >= services.length) {
        serviceIndex = 0;
    }
    displayService(serviceIndex);
}

function totalPrice(price) {
    document.getElementById("totalAmount").textContent = "";
    totalprice = totalprice + price;
    document.getElementById("totalAmount").append(`$${totalprice}`);
}

skipButton.addEventListener("click", () => {
    serviceBar();
});

addButton.addEventListener("click", () => {

    const alreadyAdded = addedService.find(
        (s) => s.type === services[serviceIndex].type
    );
    if (alreadyAdded) {
        alert("This service is already added.");
        serviceBar();
        return;
    }

    const hii = document.getElementById("noItems");
    hii.textContent = "";

    serialNo++;

    const tableRow = document.createElement("tr");
    const sNo = document.createElement("td");
    const serviceName = document.createElement("td");
    const price = document.createElement("td");

    sNo.textContent = serialNo;
    serviceName.textContent = services[serviceIndex].type;
    price.textContent = services[serviceIndex].price;

    addedService.push(services[serviceIndex]);
    console.log(addedService);

    tableRow.append(sNo);
    tableRow.append(serviceName);
    tableRow.append(price);
    document.getElementById("cartItems").append(tableRow);

    totalPrice(services[serviceIndex].price);
    serviceBar();
});