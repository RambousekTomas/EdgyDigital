##Tech stack
Javascript (ES6)
TypeScript
React NativeGit
RTK (volitelný)
RTK-Query (volitelný)

##API
https://rickandmortyapi.com/api/

##Úvod
Tvým úkolem bude přistupovat k tomuto testovacímu zadání stejně, jako k zadání pro real-world projekt. To znamená, že chceme vidět i strukturu projektu, který je komerční a má předpoklady růstu, a který bude přehledný a snadno udržitelný.
Zároveň by to mělo sloužit i jako prezentace tvých znalostí použitých technologií a jejich best-practices a tvého obecnému uvažováním nad úkolem a jeho následném zpracování.
Na vzhledu aplikace nezáleží, stačí když bude příjemné UX a alespoň nějaké animace. Jaké další knihovny použiješ necháme na tobě, ale očekáváme, že budou použity knihovny minimálně stabilní a dobře udržované.

##Zadání
Vytvoř mobilní aplikaci, která bude sloužit jako “Pokedex” Rick a Morty charakterů.
Bude se skládat z AuthStack navigatoru, kde bude jednoduché přihlášení pomocí uživatelského jména a hesla (ověření údajů není třeba, budou sloužit pro demonstraci udržení “session”).
Po přihlášení se uživatel přesměruje do hlavní aplikace, která bude obsahovat 3 Taby v BottomTab navigaci -> Main, Scan a Favorite.
Main obrazovka bude obsahovat výpis výsledků z EP /character a zároveň zde půjde vyhledávat podle jména. Dále zde taky bude možné se prokliknout na detail postavy, kde si ji půjde přidat do oblíbených, které se budou ukládat pod přihlášený účet do local storage a budou dostupné i offline.
Scan obrazovka bude obsahovat QR skenner, který načte detail postavy a zobrazí ho do BottomSheet komponentu
Favorite obrazovka pak bude sloužit jako výpis všech oblíbených postav. Na vrchu listu bude tlačítko pro úpravu, který mi povolí s položkami manipulovat a měnit jejich pořadí, nebo je úplně smazat.
Na vrchu každého tabu bude Header komponent s uživatelským jménem, které po kliku otevře Drawer s možností odhlášení.
Celý projekt verzuj pomocí gitu do svého repositáře, který nám po dokončení nasdílíš. Všechny případné poznámky, ať už ke kódu, nebo k zpracování napiš do README.

##Estimations:
Project init 3h
Navigation 1h - done in 1h
Header 30m
Footer 30m - tabs done in 20m
Redux 30m
Animations 4h

Login screen
Form 30m

Main screen
Design with layout 2h
Detail 2h
Favourite feature 1h
Search by name 2h
Local storage 2h
Scanner 3h
Bottom sheet 2h

Favourite screen
List of favourites 30m
Edit feature 4h

##Notes
Analysis and estimations: 2h
