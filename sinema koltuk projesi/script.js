"use strict"

const container = document.querySelector(".container");
const filmsayısı = document.querySelector("#filmsayısı");
let filmücreti = document.querySelector("#ücret");
const film = document.querySelector("#film");
const koltuklar = document.querySelectorAll(".btnkoltuk:not(.reserved)");       // btnkoltuk classını seçer ama içinde reserved classı olanları dahil etmez.

localStoragedenBilgileriAl();
toplamHesapla();

container.addEventListener("click",function(e){
if(e.target.classList.contains("btnkoltuk")){            // Eğer tıkladığımız yerin classında btnkoltuk varsa
    e.target.classList.toggle("seçili");                 // seçili classını ona ekle
    toplamHesapla()
    
    const seçiliKoltuk = document.querySelectorAll(".btnkoltuk.seçili");
    console.log(seçiliKoltuk);

    if(film.value == 0){                                                             //eğer seçilen filmin  valuesi 0 ise
        document.querySelector("#uyarıyazıid").classList.remove("uyarıyazı");        // gizli olan uyarı yazısını açar
    }
    else{
        document.querySelector("#uyarıyazıid").classList.add("uyarıyazı");           // 0 değilse kapatır.
    }

}
});

film.addEventListener("change",function(e){            // eğer film değişirse yeni filme göre fiyatları hesaplar.
    toplamHesapla()
});

function toplamHesapla(){

    let seçiliKoltuklarıSay = container.querySelectorAll(".btnkoltuk.seçili").length;          // seçilikoltuklarısay değişkenine btnkoltuk ve seçili classı içeren clasların kaç
    filmsayısı.textContent = " " + seçiliKoltuklarıSay + " ";                                  // tane olduğunun sayısını eşitliyoruz.

    filmücreti = film.value;                                                                             // film ücreti eşittir filmin valuesi. html kısmında filmlere value verdik.
    document.querySelector("#ücret").textContent = " " + seçiliKoltuklarıSay * filmücreti + " ";         // ücret kısmının yazısına "seçili koltuk sayısı * filmin ücreti" yazar.



    // Aşağıdaki alanı anlamadım.



    const seçilenler = container.querySelectorAll(".btnkoltuk.seçili");       

    const seçiliKoltukArray = [];
    const koltukArray = [];


    seçilenler.forEach(function(koltuk){
        seçiliKoltukArray.push(koltuk);
    });

    koltuklar.forEach(function(koltuk){
        koltukArray.push(koltuk);
    });
    

    let seçiliKoltukİndexleri = seçiliKoltukArray.map(function(koltuk){
        return koltukArray.indexOf(koltuk);
    });

    localStorageKaydet(seçiliKoltukİndexleri);

}

function localStoragedenBilgileriAl(){
const selectedSeats = JSON.parse(localStorage.getItem("seçilenler"));

if(selectedSeats != null && selectedSeats.length > 0){
    koltuklar.forEach(function(koltuk,index){

        if(selectedSeats.indexOf(index) > -1){
            koltuk.classList.add("seçili");
        }
    });
}
}

function localStorageKaydet(indexler){
localStorage.setItem("seçilenler",JSON.stringify(indexler));
localStorage.setItem("FilmÜcreti",film.value);
}

