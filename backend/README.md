---

### Models

---

    --User, Post, Comment, Like, Tag

---

### Registracija

---

    --Registracija sa E-mail adresom i password-om
    --E-mail u DB mora biti unique
    --Password je zaštićen u DB
    --Admin se kreira u bazi

---

### Login

---

    --Kada se korisnik loguje salju se njegovi podaci i token
    --Ne salje se password

---

### Obrada profila

---

    --User može da pregleda i edituje svoje podatke
    --User moze obrisati svoj profil
    --Admin moze obrisati svoj ili profil bilo kog usera
    --User ne moze menjati role, to moze samo admin

---

### Postovi

---

    --Detalji posta sadrze lajkove, komentare, autora, datum objave, datum promene...
    --Postovi se vide od najnovijeg ka najstarijim
    --Uz post idu ime autora, datum, lajkovi
    --User može da obrise i edituje samo svoj post
    --Samo ulogovani korisnici mogu objavljivati postove
    --Svaki post ima datum objave i datum promene

---

### Komentari

---

    --Postove mogu komentarisati samo ulogovani korisnici
    --Komentar moze obrisati samo autor ili admin

---

### File

---

    --Mogu da se dodaju slike
    --Slike se cuvaju u bazi

---

### Obrada postova i pretraga

---

    --Filtriranje postova po tagovima i autorima
    --Pretraga postova po nazivu i tekstu posta
    --Postovi mogu da se edituju

---

### Objavljivanje postova

---

    --Postovi mogu da budu private ili public
    --Public mogu da vide svi korisnici

---

### Bonus-Privatne poruke

---

    --Poslate poruke idu u Sent
    --Nove poruke su hajlajtovane
    --Poruke koje su pročitane su označene kao pročitane

---

### Bonus-Objava reklama

---

    --Svaka reklama se placa
    --Samo placene reklame ce biti vidljive
    --Cena reklame u zavisnosti od duzine trajanja

---

### BE: Project struktura

---

    --server.js - entry point
    --Sve globalne varijable u env fajlu
    --Konfiguraciju servera, rute, kontroleri, modeli, middleware, config razdvojeni u zasebnim folderima
    --Napraviti rest_api sa svim testiranim rutama

---

### Tipovi usera

---

    --Admin i User
    --U zavisnosti od uloge različite funkcionalnosti
