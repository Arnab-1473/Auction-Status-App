// console.log("hi");
// 
// function getData() {
//     document.getElementById("loader").style.display = "block";
//     fetch("https://gauravgitacc.github.io/postAppData/auctionData.json")
// .then((res) => res.json())
// .then((data) => {
//     console.log("Data", data);
//     
//     
// });
// }
var arr = [];

async function getData() {
//     document.getElementById("loader").style.display = "block";

    try {
        const response = await fetch("https://gauravgitacc.github.io/postAppData/auctionData.json");

        arr = await response.json();
        sessionStorage.setItem("myArr", JSON.stringify(arr));
        if (arr) {
            console.log("Data", arr);
            showData(arr);
//             document.getElementById("loader").style.display = "none";
        }
    } catch (e) {
        console.log("Error", e);
    }
}

if (sessionStorage.getItem("myArr")) {
    var myArr = JSON.parse(sessionStorage.getItem("myArr"));
    showData(myArr);
    arr = myArr;
} else {
    getData();
}

document.getElementById("search").addEventListener("input", () => {
    // search by toLocation
    var newArr = arr.filter((item) =>
        item.toLocation
            .toLowerCase()
            .includes(document.getElementById("search").value.trim().toLowerCase())
    );
    showData(newArr);
    // search by the status
    newArr = arr.filter((item) =>
        item.status
            .toLowerCase()
            .includes(document.getElementById("search").value.trim().toLowerCase())
    );
    showData(newArr);
});

function showData(myArr) {
    document.getElementById("container").innerHTML = "";
    let myHtml = "";
    myArr.forEach((item) => {
        myHtml += `
        <div class='myDiv'>
            <div class="flex-info">
                <div>
                    <div class="chip ${item.status == "PENDING" ? "yellow"
                : item.status == "CANCELLED" ? "red"
                    : ""}">
                        ${item.status}
                    </div>
                        <p>${item.caseNumber}</p>
                </div>
                <p>${item.date}</p>
            </div>
            <hr/>
            <div>
                <strong>${item.fromLocation}</strong>
                <p>${item.toLocation}
                <span>${item.fare}</span></p>
            </div>
        </div>
        `;
    });
    document.getElementById("container").innerHTML = myHtml;

}

