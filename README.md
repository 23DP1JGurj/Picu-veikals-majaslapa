# PizzaShop Majaslapa [LV]

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5\&logoColor=white)   ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3\&logoColor=white)   ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript\&logoColor=black)   ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js\&logoColor=white)   ![Express](https://img.shields.io/badge/Express-000000?logo=express\&logoColor=white)

```
   ____  _                        _ _         _
  |  _ \(_) ___ _   _  __   _____(_) | ____ _| |___    
  | |_) | |/ __| | | | \ \ / / _ \ | |/ / _` | / __|  
  |  __/| | (__| |_| |  \ V /  __/ |   < (_| | \__ \   
  |_|   |_|\___|\__,_|   \_/ \___|_|_|\_\__,_|_|___/ 
              PizzaShop Console App
```

## Autori

- **Jegors Gurjevs** <br> [![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white)](https://github.com/23DP1JGurj)
- **Rodions Poplavskis** <br> [![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white)](https://github.com/23DP1RPopl)


## Apraksts

PizzaShop ir interaktīva tīmekļa vietne, kas paplašina konsoles lietotni picas pasūtīšanai ar modernu front-end saskarni. Vietnē pieejamas šādas sadaļas:

1. **Header** – fiksēta navigācijas josla ar logo, lapas saites, valodas un tēmas pārslēdzējiem.
2. **Hero** – ievada sadaļa ar projekta nosaukumu un īsu aprakstu.
3. **About** – četras mini-sekcijas ar ikonām un aprakstiem: picu katalogs, pasūtīšana, atsauksmes un profila pārvaldība.
4. **Download** – pogas nospiešana uzsāk animētu "kravas automašīnas" lejupielādi un sagatavo ZIP arhīvu.
5. **Guide** – sadaļa ar lietotāja ceļvedi, kas attēlots slaidu veidā.
6. **Contacts** – informācija par izstrādātājiem un pogas "Atsauksmes" atvēršana/lappuses labās malas panelis.
7. **Footer** – autoru tiesību informācija.

Papildus funkcionalitāte:

* Tēmas pārslēdzējs (tumšā/gaišā režīma atbalsts ar gludu pāreju).
* Valodas pārslēdzējs (latviešu un angļu valoda, teksti ielādēti `translation.js`).
* Atsauksmju sistēma: zvaigžņu vērtējums, vārds, teksts, dati tiek glabāti `reviews.json` serverī.
* Adaptīva izkārtojuma atbalsts dažādiem ekrāna izmēriem.

## Projekta struktūra

```
/ (repo sakne)
├─ src/
│  ├─ css/main.css
│  ├─ js/main.js
│  ├─ js/translation.js
│  └─ image/…
├─ reviews.json    # automātiski ģenerējas
├─ server.js
└─ README.md       # šo failu
```

## Instalācija

1. Klonējiet repozitoriju:

   ```bash
   git clone https://github.com/23DP1JGurj/Picu-veikals.git
   cd Picu-veikals
   ```
2. Instalējiet atkarības:

   ```bash
   npm install
   ```
3. Palaidiet serveri:

   ```bash
   npm start
   ```
4. Atveriet pārlūkprogrammā:

   ```
   http://localhost:3000
   ```

## Kontakti

Ja vēlies ziņot par kļūdām vai iesniegt ieteikumus, raksti uz: **[piceveikals@example.com](mailto:piccaveikalsad@gmail.com)**

Musu programma [https://github.com/23DP1JGurj/Picu-veikals-majaslapa](https://github.com/23DP1JGurj/Picu-veikals)

---
<br><br>

# PizzaShop Website [ENG]

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5\&logoColor=white)   ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3\&logoColor=white)   ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript\&logoColor=black)   ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js\&logoColor=white)   ![Express](https://img.shields.io/badge/Express-000000?logo=express\&logoColor=white)

```
   ____  _                        _ _         _
  |  _ \(_) ___ _   _  __   _____(_) | ____ _| |___    
  | |_) | |/ __| | | | \ \ / / _ \ | |/ / _` | / __|  
  |  __/| | (__| |_| |  \ V /  __/ |   < (_| | \__ \   
  |_|   |_|\___|\__,_|   \_/ \___|_|_|\_\__,_|_|___/  
              PizzaShop Console App
```

## Authors

- **Jegors Gurjevs** <br> [![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white)](https://github.com/23DP1JGurj)
- **Rodions Poplavskis** <br> [![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white)](https://github.com/23DP1RPopl)


## Description

PizzaShop is an interactive website that extends the console-based pizza ordering application with a modern front-end interface. The site includes the following sections:

1. **Header** – a fixed navigation bar with logo, links, language and theme toggles.
2. **Hero** – an introductory section with the project title and a brief subtitle.
3. **About** – four mini-sections with icons and descriptions: pizza catalog, ordering, reviews, and profile management.
4. **Download** – clicking the button triggers an animated "truck" download and prepares a ZIP archive.
5. **Guide** – a user guide section displayed as a slider of tutorial images.
6. **Contacts** – developer information and an "Open Reviews" button that reveals a slide-in panel.
7. **Footer** – copyright information.

Additional features:

* **Theme Switcher**: Dark/Light mode support with smooth transitions and saved preference.
* **Language Switcher**: Latvian and English support, translations loaded from `translation.js`.
* **Reviews System**: Star rating, name, and review text stored in `reviews.json` on the server.
* **Responsive Design**: Adapts layout to various screen sizes and mobile devices.

## Project Structure

```
/ (project root)
├─ src/
│  ├─ css/main.css
│  ├─ js/main.js
│  ├─ js/translation.js
│  └─ image/…
├─ reviews.json    # auto-generated by server
├─ server.js       # Node.js + Express API
└─ README.md       # this file
```

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/23DP1JGurj/Picu-veikals.git
   cd Picu-veikals
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the server:

   ```bash
   npm start
   ```
4. Open in your browser:

   ```
   http://localhost:3000
   ```


## Contact & Feedback

Report issues or suggest improvements via email: **[piceveikals@example.com](mailto:piccaveikalsad@gmail.com)**

Project repository: [https://github.com/23DP1JGurj/Picu-veikals](https://github.com/23DP1JGurj/Picu-veikals)

---
