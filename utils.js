const { google } = require('googleapis');
// Initializes the Google APIs client library and sets up the authentication using service account credentials.
const auth = new google.auth.GoogleAuth({
    keyFile: './google.json',  // Path to your service account key file.
    scopes: ['https://www.googleapis.com/auth/spreadsheets']  // Scope for Google Sheets API.
});

const spreadsheetId = '1ZIP1hSz-tmJSuXUFcVgNCEmOvcLJEOJUhuqNMxYp5QM';

// async function readSheet(range) {
//     const sheets = google.sheets({
//         version: 'v4', auth
//     });

//     try {
//         const response = await sheets.spreadsheets.values.get({
//             spreadsheetId, range
//         });
//         const rows = response.data.values; // Extracts the rows from the response.
//         return rows; // Returns the rows.
//     } catch (error) {
//         console.error('error', error); // Logs errors.
//     }
// }


async function searchValueInSheet(sheetName, searchValue) {
    const sheets = google.sheets({
        version: 'v4', auth
    });

    try {
        // Specify the range to cover the entire sheet
        const range = `${sheetName}!A:Z`; // Adjust the range as needed

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId, range
        });

        const rows = response.data.values; // Extracts the rows from the response.
        if (!rows) {
            console.log('No data found.');
            return null;
        }

        // Obtiene los encabezados de la primera fila
        const headers = rows[0];
        // Remueve la fila de encabezados de las filas
        const dataRows = rows.slice(1);

        // Filtra las filas para encontrar el valor de búsqueda
        const matchingRow = dataRows.find(row => row.includes(searchValue));

        if (matchingRow) {
            let result = {};
            headers.forEach((header, index) => {
                result[header] = matchingRow[index];
            });
            return result; // Retorna el objeto encontrado.
        } else {
            return null; // O devuelve un valor apropiado si no se encuentra ninguna coincidencia.
        }

    } catch (error) {
        console.error('Error:', error); // Logs errors.
    }
}

module.exports = { searchValueInSheet}