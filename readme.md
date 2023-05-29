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
Header 30m - done in 4 h 30m
Footer 30m - tabs done in 20m
Redux 30m - done in 45m
Animations 4h - done in 30m (with ready to use animations)

Login screen
Form 30m - done in 3h

Main screen
Design with layout 2h - done in 3h
Detail 2h - done in 3h
Favourite feature 1h - done in 1h
Search by name 2h - done in 4h
Local storage 2h - done in 2h

Scan screen
Permissions (added lately - no estimate) - done in 30m
Scanner 3h - done in 30m
Bottom sheet 2h - done in 2h

Favourite screen
List of favourites 30m - done with Favourite feature of main screen
Edit feature 4h - done in 4h

##Notes
Analysis and estimations: 2h

Header took me a lot more time due to uneexpected issues with opening and closing drawer. Had to use different library for drawer.
Login screen took me longer, due to experimentation with grapgical design and with adding ripples correctly.

I had computer malfuctuation which seems related to GPU, it took me 3 days to recover - reinstall windows in my spare time.
After that I had to downgrade reanimated to 2.17.0 because version 3.1.0 had issue with compiling its module dependencies with cmake in 3.18.0.

I have underestimated search because I wanted to have continuous loading and filter options in one place, which took a lot more time to clean up.

When developing favourite edit functionality I have noticed that used solution that seems a litle bit less performant and would need more time to investigate and design more neetly.
Changing order of items is possible via drag & drop.

When developing scanning feature I wanted to implement react native vision package, but due to incompatibility issues on current version I have lost a lot of time trying to make it build.
It took me about 3 hours which I don't count into work done.

##Review and Assesment
iOS compatibility warning - iOS version is not configured completely and not tested
I am sorry, but my personal computer is windows based device and I was not able to run iOS.
Primary aim was android platform.

From point of assignment I think all task are implemented correctly.
From point of developer review, there could be many improvements:

- Add Tests
- Extract comon logic like buttons in to dedicated components (Could be more DRY)
- Extract styles and implement theme
- Add media query responsible system or scale up/down system to fit different screens correctly
- Add perfomance tweaks
- Removal of Pressable as they have issues with ripples for chosen design. (I used TouchableOpacity in my previous projects)
- Compatibility for iOS

For character detail implementation I wanted to go beyond the task and add swipable functionality to fetch prev and next characters.
But with limited time I had in my spare time I didn't developed this feature.

For this project I had no much spare time, so it took long time to deliver it.
The most problematic part was to write code with interuptions and pauses, which took time on getting project started on emulator or mobile device.
Also night shifts are not good, as one does mistakes due to sleepiness.
Over all I have enjoyed developing this task.

Total time spent on this project was:
35H 35M which is approximately 4,5 MD
