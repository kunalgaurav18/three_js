function enableTextArea() {
  var el = document.getElementById("local");
  document.getElementById("btngroupLocal").disabled = !el.checked;
}

function save() {
  var a = document.createElement("a");
  with (a) {
    href =
      "data:text/csv;base64," + btoa(document.getElementById("textarea").value);
    download = "csvfile.csv";
  }
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
