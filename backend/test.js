const url = "http://141.45.191.149:7777/bikelin/api/incidents/";

async function getData() {
  try {
    const response = await fetch(url);
    console.log(response);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
}
const urlItem = 'http://141.45.191.149:7777/bikelin/api/incident/image/';
async function getOnItem() {
    try {
        const response = await fetch(urlItem + document.getElementById('id-dropdown').value +".jpg");
        console.log(response);
        document.getElementById('imageTest').src = response.url;

        if (!response.ok) {
            document.getElementById('imageTest').alt = "Image not found"; 
          throw new Error(`Response status: ${response.status}`);
          
        }
    } catch (error) {
        console.error(error.message);
    }}

document.addEventListener('DOMContentLoaded', () => {
  const allData = document.getElementById('allData');
  const itemData = document.getElementById('itemData');

  if (allData) allData.addEventListener('click', getData);
  if (itemData) itemData.addEventListener('click', getOnItem);});



