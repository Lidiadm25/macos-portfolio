# macOS Portfolio

An interactive developer portfolio inspired by the macOS desktop experience. The project presents personal information, projects, professional experience and contact details through draggable desktop windows, a top bar and a dock.

## Live Demo

[View the portfolio](https://lidiadm25.github.io/macos-portfolio/)

## Current Features

- macOS-inspired desktop layout with wallpaper, top bar, desktop icons and dock
- Draggable portfolio windows managed through a central window service
- About, projects, experience and contact sections
- Project links for Pizza4You, LMS Platform and this portfolio
- Professional experience details, including the Innovasur internship and competitive esports background
- External press links related to the esports experience
- English and Spanish translations using `@ngx-translate`
- Responsive Angular UI styled with Tailwind CSS
- Lucide icons and GSAP available for interface details and animation

## Tech Stack

- Angular 21
- TypeScript
- Tailwind CSS 4
- Angular CDK
- RxJS
- `@ngx-translate/core`
- Lucide Angular
- GSAP
- Vitest

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
npm install
```

### Development server

```bash
npm run start
```

Open `http://localhost:4200/` in a browser. The application reloads automatically when source files change.

### Production build

```bash
npm run build
```

## Project Structure

```text
src/
  app/
    components/       Reusable desktop, dock and window components
    core/data/        Central portfolio window and project configuration
    core/models/      Shared TypeScript models
    core/services/    Window state and interaction logic
  styles.scss         Global styles
public/assets/
  i18n/               English and Spanish translation files
  images/             Wallpaper and image assets
```

The portfolio window catalogue in `src/app/core/data/portfolio-windows.data.ts` is the main source of truth for available windows, their initial layout, desktop or dock visibility and displayed content.

## Work In Progress

- [ ] Replace and refine the desktop and dock icons
- [ ] Finish the remaining web refinements for Pizza4You
- [ ] Finish the Android refinements for Pizza4You
- [ ] Remove the standalone About Me component and reuse the existing text viewer or another shared viewer
- [ ] Add the remaining project visuals and images
- [ ] Review window sizes and positions on small screens
- [ ] Clean up unused or commented-out portfolio entries and temporary console logging

## Project Links

- [Pizza4You Backend](https://github.com/Lidiadm25/Pizza4You-Backend)
- [LMS Platform](https://github.com/Lidiadm25/lms-platform)
- [Portfolio macOS](https://github.com/Lidiadm25/macos-portfolio)

