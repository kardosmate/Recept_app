# Recept App

Ez az alkalmazás lehetőséget ad saját receptek tárolására, rendszerezésére és kezelésére.  
A fő funkciók között megtalálható az új receptek hozzáadása, keresés, kategória szerinti szűrés valamint egy dinamikus bevásárlólista összeállítása.

![Kezdőlap](images/home_screen.png)

## Fő funkciók

### Új recept hozzáadása
Lehetőség van saját receptek létrehozására, ahol megadhatod:
- Recept nevét
- Hozzávalókat
- Leírást
- Elkészítési időt
- Kategóriát

![Új recept hozzáadása](images/add_recipe.png)

---

### Receptek keresése
A meglévő receptek között gyorsan kereshetsz:
- **Név alapján**
- **Hozzávalók alapján**
- **Kategória alapján**

![Receptek keresése](images/search_recipe.png)

---

### Bevásárlólista
A bevásárlólista automatikusan összegyűjti a kiválasztott kedvenc receptek hozzávalóit, így könnyedén tervezheted meg a vásárlást.

![Bevásárlólista](images/shopping_list.png)

---

## Technológiák
- **React** + **TypeScript**
- **React Router** az oldalak közötti navigációhoz
- **CSS** az alapvető stílushoz
- **Custom Hookok** (`useLocalStorage`, `useFetch`) az adatok kezelésére
- **LocalStorage** használata a receptek mentéséhez

## Futtatás

Az alkalmazás elérhető a [http://kardosmate.github.io/Recept_app/dist](http://kardosmate.github.io/Recept_app/dist) címen.
