var mapping_data = null;

function save() {
  var mapping_data = document.getElementById("textarea").value;
  console.log(mapping_data);

  var response = $.ajax({
    url: "save_data.php",
    type: "POST",
    data: { mapping_data: mapping_data },
  });

  response.done(function (msg) {
    console.log("Ajax Success: " + msg);
  });

  response.fail(function (jqXHR, textStatus) {
    console.log("Ajax Request failed: " + textStatus);
  });
}
