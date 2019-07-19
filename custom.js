	function copyToClipboard(txtID,tooltipID) {
  var copyText = document.getElementById(txtID);
  copyText.select();
  document.execCommand("copy");
  
  var tooltip = document.getElementById(tooltipID);
  tooltip.innerHTML = "Copied";
}

function outCopyToClipboard(tooltipID) {
  var tooltip = document.getElementById(tooltipID);
  tooltip.innerHTML = "Copy to clipboard";
}