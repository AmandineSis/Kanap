str = document.URL;
url = new URL(str);

let confirmId = url.searchParams.get("orderId");

document.getElementById("orderId").innerHTML += `${confirmId}`;