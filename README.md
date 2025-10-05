# 🌍 Country Info (Angular Test Project)

This project was developed as a **test assessment** for the Angular Engineer role.  
It is a simple Angular application that allows users to search for countries, view their public holidays, and explore random countries with their upcoming holidays.

---

## 🚀 Features

- **Country Search**  
  Search countries by name using data from [Nager.Date API](https://date.nager.at/swagger/index.html).  
  Each result is clickable and navigates to the detailed country page.

- **Random Countries Widget**  
  Displays **3 random countries** with their **next upcoming holiday**.

- **Country Page**  
  - Shows a list of **holidays** for the selected country.  
  - Allows **year switching** (2020–2030) to explore holidays by year.  
  - Includes navigation back to **Home**.

- **Styling & UI**  
  - Built with **Angular Material** components.  
  - Virtual scroll for long lists.  
  - Sticky search bar.  
  - Minimalistic and responsive design.

---

## 🛠️ Tech Stack

- [Angular 19](https://angular.dev/) (Standalone Components)  
- [Angular Material](https://material.angular.io/)  
- [RxJS](https://rxjs.dev/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [ESLint + Prettier](https://eslint.org/) for linting and formatting

---

## ⚙️ Project Structure

```
src/
 ├── app/
 │   ├── pages/
 │   │   ├── home/          # Home page with search & random countries
 │   │   └── country/       # Country details page (holidays per year)
 │   ├── services/          # Country API service
 │   └── widgets/
 │       └── random-countries/  # Random countries widget
 ├── environments/          # Environment configs (dev/prod)
 └── assets/                # Static assets
```

---

## 🔑 Configuration

API base URL is stored in Angular environment files:

- `src/environments/environment.ts` (production)  
- `src/environments/environment.development.ts` (development)

```ts
export const environment = {
  production: false,
  apiBase: 'https://date.nager.at'
};
```

> No `.env` file is required, since the API is public.  
> Configuration is handled through Angular environments.

---

## ▶️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/DmytroFedyshyn/country-info.git
cd country-info
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run in development mode
```bash
ng serve
```
App will be available at **http://localhost:4200/**

### 4. Build for production
```bash
ng build --configuration production
```

---

## 🧪 Linting & Formatting

Run ESLint:
```bash
npm run lint
```

Format with Prettier:
```bash
npm run format
```

---

## 📖 API Reference

This project uses the **Nager.Date API**:  
👉 [Swagger Documentation](https://date.nager.at/swagger/index.html)

Key endpoints used:
- `/api/v3/AvailableCountries`
- `/api/v3/PublicHolidays/{year}/{countryCode}`
- `/api/v3/NextPublicHolidays/{countryCode}`

---

## 📋 Future Improvements

- Add unit tests for components and services.  
- Add error handling (e.g., when API fails).  
- Improve UI/UX with better responsive design.  

---

## 👨‍💻 Author

Developed by **Dmytro Fedyshyn**  
GitHub: [DmytroFedyshyn](https://github.com/DmytroFedyshyn)

