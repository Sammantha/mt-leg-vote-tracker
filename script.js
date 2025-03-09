const API_KEY = "AIzaSyAxHEiv0K4bWNI8tCGvYnIKSCSYU-y4CIs";
const SHEET_ID = "1eyxPg-LHmn4EdWwKyR1hTNzMZoB7YOkBA2YJkPZ8IRs";
const RANGE = "Sheet1!A:C";  // Adjust based on your sheet structure

async function fetchData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayData(data.values);
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

function displayData(rows) {
    const billList = document.getElementById("votesList");
    billList.innerHTML = "";
    rows.slice(1).forEach(row => {
        const tr = document.createElement("tr");
        row.forEach(cell => {
            const td = document.createElement("td");
            td.textContent = cell || "-";
            tr.appendChild(td);
        });
        billList.appendChild(tr);
    });
}