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

    const initialDisplay = document.getElementById("noItems");
    initialDisplay.classList.add("hidden");

    serialNo++;

    const tableRow = document.createElement("tr");
    tableRow.id = "tablerow";
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


const bookButton = document.getElementById("bookButton");

function checkBookingForm () {
    const userName = document.getElementById("userName").value.trim();
    const emailId = document.getElementById("userEmail").value.trim();
    const PhoneNumber = document.getElementById("phoneNumber").value.trim();

    if(!userName || !emailId || !PhoneNumber) {
        alert("please fill in all fields");
        return false;
    }
    return true;
}

function checkAddedService() {
    if(addedService.length === 0) {
        alert("Add services");
        return false;
    } 
    return true;
}

function resetBooking() {
    document.getElementById("userName").value = "";
    document.getElementById("userEmail").value = "";
    document.getElementById("phoneNumber").value = "";


    const table = document.getElementById("tablerow");
    table.innerHTML = "";

    document.getElementById("noItems").classList.remove("hidden");

    totalprice = 0;
    serialNo = 0;
    document.getElementById("totalAmount").textContent = "$0";

    addedService.length = 0;

    serviceIndex = 0;
    ServiceDisplay.innerHTML = "";
    displayService(serviceIndex);

    document.getElementById("confirmationMessage").classList.add("hidden");
}

bookButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (!checkAddedService()) return;
    if (!checkBookingForm()) return;

    // If both checks pass
    document.getElementById("confirmationMessage").textContent =
        `Thank you! Your booking has been confirmed.`;
    document.getElementById("confirmationMessage").classList.remove("hidden");

    setTimeout(() => {
        resetBooking();
    },3000);
});
