import styles from "./page.module.css";
const API_KEY = process.env.API_KEY;
const SHEET_ID = "1eyxPg-LHmn4EdWwKyR1hTNzMZoB7YOkBA2YJkPZ8IRs"; // temp sheet
// const SHEET_ID = "1aJXXfGEBPjTtnf5UBin_x9IBf13kcGybSdkfe05aMoE";

export const runtime = 'edge';

// @ts-ignore typescript-eslint/no-explicit-any
async function fetchData(id: number): Promise<any> {
    const RANGE = `all_members!A${id + 1}:C${id + 1}`;  // Adjust based on sheet structure
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;
  try {
      const response = await fetch(url);
      const data = await response.json();
      return data.values;
  } catch (error) {
      console.error("Error fetching data: ", error);
  }
}

export default async function Member({
    params,
  }: {
    params: Promise<{ id: string }>
  }) {
    const { id } = await params;
    const result = await fetchData(parseInt(id));
    const memberData = result[0];
    console.log('memberData', memberData);

    return <div className={styles.title}>
        <h1>{memberData[1]}</h1>
        <h2>{memberData[2]} member</h2>
    </div>
  }