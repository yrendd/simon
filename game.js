var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = []; //kullanıcı tarafından tıklanan butonların id değerlerini saklamak için

var started = false; //baslangic durumu
var level = 0; //seviye

//klavye tusuna basildiginda
$(document).keypress(function () {
  if (!started) {
    //baslamadiysa
    $("#level-title").text("Level " + level); //seviyeyi guncelle
    nextSequence(); //yeni sira
    started = true; //basladi olarak ayarla
  } else {
    console.log("oyun basladi ki");
  }
});

//butona tiklandiginda
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id"); //tiklanan buton rengi
  userClickedPattern.push(userChosenColour); // kullanici desenine ekle

  playSound(userChosenColour); //ses cal
  animatePress(userChosenColour); // animasyon yap

  checkAnswer(userClickedPattern.length - 1); //cevabi kontrol et
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //dogruysa
    if (userClickedPattern.length === gamePattern.length) {
      //tamamlandiysa
      setTimeout(function () {
        nextSequence(); //yeni sira
      }, 1000);
    }
  } else {
    playSound("wrong"); //yanlis sesi cal
    $("body").addClass("game-over"); // game-overe ekle
    $("#level-title").text("Game Over, Press Any Key to Restart"); //basligi guncelle

    setTimeout(function () {
      $("body").removeClass("game-over"); //game-over i kaldir
    }, 200);

    startOver(); //oyunu sifirla
  }
}

//yeni sira olustur
function nextSequence() {
  userClickedPattern = []; //Next Sequence() tetiklendiğinde userClickedPattern'i bir sonraki seviyeye hazır boş bir diziye sıfırlayın
  level++; //seviyeyi arttir
  $("#level-title").text("Level " + level); //seviyeyi guncelle
  var randomNumber = Math.floor(Math.random() * 4); //rastgele sayi
  var randomChosenColour = buttonColours[randomNumber]; //rastgele renk
  gamePattern.push(randomChosenColour); //randomChoseColor i gamePattern in sonuna ekler

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100); //animasyon
  playSound(randomChosenColour); //secilen rengin sesini cal
}

//belirtilen rengi animasyonla vurgula
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed"); // pressed sinifini ekle
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed"); // pressed sinifini kaldir
  }, 100); // 0/1 sn sonra
}

//belirtilen sesi cal
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3"); // ses dosyasini al
  audio.play(); //sesi cal
}

//oyunu sifirla
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
