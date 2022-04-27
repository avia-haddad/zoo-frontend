$("document").ready(function () {
  $.ajax({
    url: "get_current_date.php",
    dataType: "text",
    success: function (data, textStatus, jqXHR) {
      $("#dateTime").html(data);
    },
    error: function (jqXHR, textStatus, errorThrown) {
      console.log("error");
    },
  });

  $("#Btn4").click(function () {
    $.ajax("https://zoo-animal-api.herokuapp.com/animals/rand/4", {
      dataType: "text",
      timeout: 500000,
      success: function (data, textStatus, jqXHR) {
        $("#animalTable").remove();
        $("#information").remove();
        let arr = JSON.parse(data);
        add(arr);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("error");
      },
    });
  });

  $("#Btn8").click(function () {
    $.ajax("https://zoo-animal-api.herokuapp.com/animals/rand/8", {
      dataType: "text",
      timeout: 500000,
      success: function (data, textStatus, jqXHR) {
        $("#animalTable").remove();
        $("#information").remove();
        let arr = JSON.parse(data);
        add(arr);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("error");
      },
    });
  });

  $("#Btn10").click(function () {
    $.ajax("https://zoo-animal-api.herokuapp.com/animals/rand/10", {
      dataType: "text",
      timeout: 500000,
      success: function (data, textStatus, jqXHR) {
        $("#animalTable").remove();
        $("#information").remove();
        let arr = JSON.parse(data);
        add(arr);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("error");
      },
    });
  });
});

function add(arr) {
  let tb = document.createElement("TABLE");
  let main = document.createElement("thead");
  tb.append(main);
  main
    .appendChild(document.createElement("th"))
    .appendChild(document.createTextNode("Animal Name"));
  main
    .appendChild(document.createElement("th"))
    .appendChild(document.createTextNode("Photo"));

  let tbBody = document.createElement("tbody");
  tb.append(tbBody);
  for (let i = 0; i < arr.length; i++) {
    let row = document.createElement("tr");
    let coll = document.createElement("td");
    coll.appendChild(document.createTextNode(arr[i].name));
    row.appendChild(coll);
    coll.setAttribute("id", arr[i].name);
    coll.onclick = function () {
      views(arr[i]);
    };
    coll = document.createElement("td");
    let img = document.createElement("img");
    img.src = arr[i].image_link;
    coll.appendChild(img);
    img.setAttribute("id", arr[i].name);
    img.onclick = function () {
      views(arr[i]);
    };
    row.appendChild(coll);
    tbBody.appendChild(row);
    $(img).css("width", "105px");
    $(img).css("height", "105px");
  }
  tb.setAttribute("id", "animalTable");
  tb.setAttribute("border", "3");
  $("#Total").append(tb);
}

function formatDate(date) {
  var t = new Date(date),
    month = "" + (t.getMonth() + 1),
    day = "" + t.getDate(),
    year = t.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("");
}

function views(animal) {
  $("#information").remove();
  let x = document.createElement("LABEL");
  $("#Total").append(x);
  x.setAttribute("id", "information");

  $("#information").append("<br>Family: " + (animal.animal_type || ""));
  $("#information").append("<br>Food: " + (animal.diet || ""));
  $("#information").append("<br>Life span: " + (animal.lifespan || ""));
  $("#information").append("<br>Length min: " + animal.length_min / 3.2808);
  $("#information").append("<br>Length max: " + animal.length_max / 3.2808);
  $("#information").append("<br>Weight min: " + animal.weight_min * 0.45359237);
  $("#information").append("<br>Weight max: " + animal.weight_max * 0.45359237);

  const exp = new Date();
  let lastWeek = formatDate(
    new Date(exp.getFullYear(), exp.getMonth(), exp.getDate() - 7)
  );
  let today = formatDate(
    new Date(exp.getFullYear(), exp.getMonth(), exp.getDate())
  );

  $.ajax(
    "https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia/all-access/all-agents/" +
      animal.name +
      "/daily/" +
      lastWeek +
      "/" +
      today,
    {
      dataType: "JSON",
      timeout: 50000,
      success: function (data) {
        let viewAmount = 0;
        for (let i = 0; i < data.items.length; i++)
          viewAmount += data.items[i].views;
        $("#information").append("<br>Num of views:" + viewAmount);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.log("error");
      },
    }
  );
}
