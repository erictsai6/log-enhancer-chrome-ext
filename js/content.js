
console.log('Initializing log enhancer');

function ready() {
  console.log('main');
  const logContainer = document.getElementsByTagName('pre')[0];
  const logs = logContainer.textContent.split('\n');
  logContainer.innerHTML = '';

  for (const log of logs) {
    const logDiv = document.createElement('div');
    const logContent = document.createTextNode(log);

    logDiv.appendChild(logContent);
    logContainer.appendChild(logDiv);
  }
}

document.addEventListener("DOMContentLoaded", ready, false);

