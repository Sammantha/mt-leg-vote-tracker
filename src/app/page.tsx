import styles from "./page.module.css";

const API_KEY = process.env.API_KEY;
const SHEET_ID = "1eyxPg-LHmn4EdWwKyR1hTNzMZoB7YOkBA2YJkPZ8IRs";
const RANGE = "Sheet1!A:C";  // Adjust based on sheet structure

async function fetchData(): Promise<any> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
  try {
      const response = await fetch(url);
      const data = await response.json();
      return data.values;
  } catch (error) {
      console.error("Error fetching data: ", error);
  }
}

export default async function Home() {
  const billData = await fetchData();
  return (
    <div className={styles.page}>
      <main className={styles.main}>
      <h1>Bills</h1>
      <table id="billTable">
          <thead>
              <tr>
                  <th>Bill</th>
                  <th>Title</th>
                  <th>Votes</th>
              </tr>
          </thead>
          <tbody id="votesList">
            { billData.map((bill: any, i: number) => {
              return (
                <tr key={'row_' + i}>
                  <td key={'data_id_' + i}>{bill[0]}</td>
                  <td key={'data_title_' + i}>{bill[1]}</td>
                  <td key={'data_votes_' + i}>{bill[2]}</td>
                </tr>
              )})}
          </tbody>
      </table>
      </main>
    </div>
  );
}
