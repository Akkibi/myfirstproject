//tentative d'utilisation de fetch pour recuperer les informations de data.json
// fetch("text/data.json").then(function (response) {
//   response.json().then(function (donnees) {
//     console.log(donnees);
//   });
// });

//position du curseur de selection de page
var selection = 0;

//remplir la page principale
fillAll();

//stockage des positions des bulles de couleurs pour simplifier son utilisation
var bullePos = [
  { top: "5%", left: "8%" },
  {
    top: "80%",
    left: "45%",
  },
  {
    top: "11%",
    left: "55%",
  },
];

//lorsqu'on clique ou on appuie sur la fleche gauche
function versGauche() {
  if (selection == 0) {
    selection = donnees.length;
  } else {
    selection -= 1;
  }
  fillAll();
}

//lorsqu'on clique ou on appuie sur la fleche droite
function versDroite() {
  if (selection == donnees.length) {
    selection = 0;
  } else {
    selection++;
  }
  fillAll();
}

//remplir toute la page (n'inclut pas la page formulaire)
function fillAll() {
  if (selection == donnees.length) {
    fillQuestionnaire();
  } else {
    navbar();
    remplir();
    document.querySelector("li:nth-child(" + (selection + 1) + ")").className =
      "selected";
    changeColor();
  }
}

function fillQuestionnaire() {
  navbar();
  document.querySelector(".listnav p").className = "selected";
  document.querySelector(".partiesCentre").innerHTML = //debut remplissage
    '<div class="liste"><div class="blocFormulaire">' +
    '<form class = "formulaire" id = "formulaire" method="GET">' +
    "<p>" +
    '<label for="analogie">Titre de la nouvelle page:</label>' +
    "<br>" +
    '<input type="text" placeholder="Si j\'étais... Ex: Race de chat" name="title" id="analogie">' +
    "</p>" +
    "<p>" +
    '<label for="statut">Réponse:</label>' +
    "<br>" +
    '<input type="text" placeholder = "Je serais ... Ex:Bengal" name="respond" id="statut">' +
    "</p>" +
    "<p>" +
    '<label for="text">Text explicatif:</label>' +
    "<br>" +
    '<input type="text" placeholder = "Explications... Ex: c\'est la meilleur race de chat" name="text" id="text">' +
    "</p>" +
    "<p>" +
    '<label for="images">Remplissez les chemin d\'accès aux images souhaitées :</label><br>' +
    '<input type="text" placeholder = "Image 1 EX:https://monjardindidees.fr/wp-content/uploads/2020/03/Chat-du-Bengal-au-jardin-2.jpg" name="image" id="image1">' +
    '<input type="text" placeholder = "Image 3" name="image" id="image3"><br>' +
    '<input type="text" placeholder = "Image 2" name="image" id="image2">' +
    '<input type="text" placeholder = "Image 4" name="image" id="image4">' +
    "</p>" +
    "<p>" +
    '<label for="colors">choisir deux couleurs représentant la page:</label>' +
    "<br>" +
    '<input type="color" class="color" id= "color1">' +
    '<input type="color" class="color" id= "color2">' +
    "</p>" +
    "<br>" +
    '<input type="submit" value="Ajouter la page" class="submit">' +
    '<input type="reset" value="réinitialiser" class="reset"></input>' + //suite
    '</div></div><div class="liste"><div class="bloc">' +
    '<h1 class="pageNumber">' +
    (donnees.length + 1) +
    "</h1>" +
    '<h1 id="titlePage" class="title">' +
    "Si j'étais..." +
    "</h1>" +
    '</div><div class="bloc">' +
    '<h1 id="statutPage" class="status">' +
    "Je serais ..." +
    "</h1>" +
    '</div><div class="bloc">' +
    '<h3 id="textPage" class="text">' +
    "Explications" +
    "</h3>" +
    "</div></div>";

  //ecrire en temps réel sur la page:
  var formAnal = document.querySelector("#analogie");
  formAnal.addEventListener("keyup", function (e) {
    document.querySelector("#titlePage").innerHTML = formAnal.value;
    if (formAnal.value == "") {
      document.querySelector("#titlePage").innerHTML = "Si j'étais...";
    }
  });
  var formStat = document.querySelector("#statut");
  formStat.addEventListener("keyup", function (e) {
    document.querySelector("#statutPage").innerHTML = formStat.value;
    if (formStat.value == "") {
      document.querySelector("#statutPage").innerHTML = "Je serais ...";
    }
  });
  var formText = document.querySelector("#text");
  formText.addEventListener("keyup", function (e) {
    document.querySelector("#textPage").innerHTML = formText.value;
    if (formText.value == "") {
      document.querySelector("#textPage").innerHTML = "Explications";
    }
  });
  //changer les couleurs en temps réel
  document.querySelectorAll(".color").forEach((rTColor) =>
    rTColor.addEventListener("change", function (e) {
      var newColor =
        "linear-gradient(45deg, " +
        document.querySelector("#color1").value +
        ", " +
        document.querySelector("#color2").value +
        ")";
      document.querySelector(".selected").style.background = newColor;
      document
        .querySelectorAll(".bulle")
        .forEach((b) => (b.style.background = newColor));
    })
  );
  effect();
  document.querySelector(".selected").style.background =
    "linear-gradient(45deg, #000000, #ffffff)";
  var x = document.querySelectorAll(".bulle");
  for (i = 0; i < 3; i++) {
    x[i].style.background = "linear-gradient(45deg, #000000, #ffffff)";
  }

  //stoquer le formulaire:
  var form = document.querySelector("#formulaire");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log(form.title.value);
    console.log(form.statut.value);
    console.log(form.text.value);
    console.log(form.color1.value);
    console.log(form.color2.value);
    donnees[donnees.length] = {
      image1: form.image1.value,
      image2: form.image2.value,
      title: form.title.value,
      statut: form.statut.value,
      texte: form.text.value,
      image3: form.image3.value,
      image4: form.image4.value,
      color1: form.color1.value,
      color2: form.color2.value,
    };
    selection = donnees.length - 1;
    fillAll();
    form.reset();
  });
}
//afficher la navbar pour le cas particulier
function navbar() {
  var navbarElements = "";
  for (i = 0; i < donnees.length; i++) {
    navbarElements +=
      '<li class = "unselected" id="select" onclick="selectNavElement(' +
      i +
      ')">' +
      donnees[i].title +
      "</li>";
  }
  document.querySelector(".listnav").innerHTML =
    navbarElements +
    '<p class="unselected" style="font-size: 2.5em; padding: 8.8px 20.3px" onclick="selectNavElement(' +
    donnees.length +
    ')">+</p>';
}

//remplir le centre de la page (n'incluant pas la page de formulaire)
function remplir() {
  document.querySelector(".partiesCentre").innerHTML =
    '<div class="liste"><div class="bloc picture">' +
    '<div class="divbloc" style="background-image: url(\'' +
    donnees[selection].image1 +
    "');\"></div>" +
    '</div><div class="bloc picture">' +
    '<div class="divbloc" style="background-image: url(\'' +
    donnees[selection].image2 +
    "');\"></div>" +
    '</div></div><div class="liste"><div class="bloc">' +
    '<h1 class="pageNumber">' +
    (selection + 1) +
    "</h1>" +
    '<h1 class="title">' +
    donnees[selection].title +
    "</h1>" +
    '</div><div class="bloc">' +
    '<h1 class="status">' +
    donnees[selection].statut +
    "</h1>" +
    '</div><div class="bloc" class="bloc">' +
    '<h3 class="text">' +
    donnees[selection].texte +
    "</h3>" +
    '</div></div><div class="liste"><div class="bloc picture">' +
    '<div class="divbloc" style="background-image: url(\'' +
    donnees[selection].image3 +
    "');\"></div>" +
    '</div><div class="bloc" class="bloc picture">' +
    '<div class="divbloc" style="background-image: url(\'' +
    donnees[selection].image4 +
    "');\"></div>" +
    "</div></div>";
  effect();
  //pictures();
}
function effect() {
  VanillaTilt.init(document.querySelectorAll(".bloc"), {
    max: 25,
    speed: 400,
    scale: 0.9,
    glare: true,
    "max-glare": 0.5,
  });
}
function pictures() {
  console.log("true");
  for (i = 0; i < 4; i++) {
    document.querySelectorAll(".divbloc")[i].style.backgroundImage =
      "url(" + donnees[selection].image2 + ")";
  }
}
//changer la couleur des bulles de fond (et dans la navbar)
function changeColor() {
  document.querySelector(".selected").style.background =
    "linear-gradient(45deg, " +
    donnees[selection].color1 +
    ", " +
    donnees[selection].color2 +
    ")";
  var x = document.querySelectorAll(".bulle");
  for (i = 0; i < 3; i++) {
    x[i].style.background =
      "linear-gradient(45deg, " +
      donnees[selection].color1 +
      ", " +
      donnees[selection].color2 +
      ")";
  }
}

function selectNavElement(number) {
  selection = number;
  fillAll();
}

// fetch("text/data.json").then(function (response) {
//   response.json().then(function (data) {
//     donnees = data;
//   });
//});
//   });
// });

//gerer l'affichage des mentions légales
function popup() {
  var x = document.getElementById("cover");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function updateDisplay(event) {
  for (i = 0; i < 3; i++) {
    document
      .querySelectorAll(".bulle")
      [i].style.setProperty(
        "left",
        "calc(" +
          bullePos[i]["left"] +
          " + " +
          event.pageX / (10 + i * 3) +
          "px)"
      );
    document
      .querySelectorAll(".bulle")
      [i].style.setProperty(
        "top",
        "calc(" +
          bullePos[i]["top"] +
          " + " +
          event.pageY / (10 + i * 3) +
          "px)"
      );
  }
}
document.addEventListener("mousemove", updateDisplay, false);
document.addEventListener("mouseenter", updateDisplay, false);
document.addEventListener("mouseleave", updateDisplay, false);

//navigation au clavier
document.onkeydown = (e) => {
  switch (e.keyCode) {
    case 37:
      versGauche();
      break;
    case 39:
      versDroite();
      break;
  }
};
