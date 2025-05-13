document.addEventListener('DOMContentLoaded', function() {
  const changeColorButton = document.getElementById('changeColor');
  
  changeColorButton.addEventListener('click', async () => {
    // Get the active tab
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    // Execute script to change the page background color
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => {
        document.body.style.backgroundColor = 
          '#' + Math.floor(Math.random()*16777215).toString(16);
      }
    });
  });
}); 