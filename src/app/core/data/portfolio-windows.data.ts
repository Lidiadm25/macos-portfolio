// interfaz de los items dentro de los folders
import type { FolderItem } from '../models/folder-item.model';

// FUENTE DE LA VERDAD DEL PORTFOLIO: definición de ventanas, contenido y estado inicial.

type WindowIcon = 'file' | 'folder' | 'briefcase' | 'mail' | 'trash';

// Defino las formas VÁLIDAS de windowcontent
// TODO añadir imagen
type WindowContent =
  | { type: 'about' }
  | {
      type: 'folder';
      folderNameKey: string;
      items: readonly FolderItem[];
    }
  | { type: 'contact' }
  | {
      type: 'text';
      textKey: string;
    };


  // Configuración de cada ventana del portfolio: posición, tamaño, icono y contenido, si está o no en el dock/desktop
interface PortfolioWindowConfig {
  titleKey: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  desktop?: { icon: Extract<WindowIcon, 'file' | 'folder' | 'trash'> };
  dock?: { icon: WindowIcon };
  content: WindowContent;
}

/**
 * Catálogo estático del portfolio.
 * Toda ventana debe definirse aquí: contenido, estado inicial y accesos visibles.
 */
export const PORTFOLIO_WINDOWS = {
   innovasurDetail: {
    titleKey: 'EXPERIENCE.INNOVASUR_TITLE',
    position: { x: 260, y: 150 },
    size: { width: 540, height: 360 },
    content: {
      type: 'text',
      textKey: 'EXPERIENCE.INNOVASUR_DETAIL',
    },
  },
  details: {
    titleKey: 'ESPORTS.TITLE',
    position: { x: 660, y: 150 },
    size: { width: 600, height: 560 },
    content: {
      type: 'text',
      textKey: 'ESPORTS.DETAILS',
    },
  },
  about: {
    titleKey: 'DOCK.ABOUT',
    position: { x: 80, y: 60 },
    size: { width: 520, height: 380 },
    desktop: { icon: 'file' },
    dock: { icon: 'file' },
    content: { type: 'about' },
  },
  projects: {
    titleKey: 'DOCK.PROJECTS',
    position: { x: 900, y: 90 },
    size: { width: 680, height: 440 },
    desktop: { icon: 'folder' },
    dock: { icon: 'folder' },
    content: {
      type: 'folder',
      folderNameKey: 'DOCK.PROJECTS',
      items: [
        { id: 'pizza4you', name: 'Pizza4You-API', type: 'code', size: 'Java / Spring Boot', action: () => window.open('https://github.com/Lidiadm25/Pizza4You-Backend', '_blank') },
        { id: 'lms-platform', name: 'LMS-Platform', type: 'code', size: 'NestJS / Angular', action: () => window.open('https://github.com/Lidiadm25/lms-platform', '_blank') },
        { id: 'portfolio-macos', name: 'Portfolio-macOS', type: 'code', size: 'Angular 21', action: () => window.open('https://github.com/Lidiadm25/macos-portfolio', '_blank') },
      ],
    },
  },
  experience: {
    titleKey: 'DOCK.EXPERIENCE',
    position: { x: 200, y: 120 },
    size: { width: 650, height: 400 },
    desktop: { icon: 'folder' },
    dock: { icon: 'briefcase' },
    content: {
      type: 'folder',
      folderNameKey: 'DOCK.EXPERIENCE',
      items: [
        {
          id: 'innovasur-internship',
          name: 'Fullstack Developer Internship',
          type: 'code',
          size: 'Innovasur SL · Feb 2026 / May 2026',
          
        },
        {
          id: 'esports-player',
          name: 'Professional E-sports player',
          type: 'folder',
          size: '2022 - 2024',
          
        },
      ],
    },
  },
  esports : {
    titleKey: 'EXPERIENCE.DETAIL.ESPORTS',
    position: { x: 450, y: 460 },
    size: { width: 640, height: 360 },
    content: {
      type: 'folder',
      folderNameKey: 'EXPERIENCE.DETAIL.ESPORTS',
      items: [
            {
          id: 'esports-bio',
          name: 'E-sports Bio',
          type: 'code',
          size: '2022 - 2024',
          
        },
        {
          id: 'esports-links',
          name: 'Links',
          type: 'folder',
          size: '2022 - 2024',
        }
      ],
    },
  },

   links : {
    titleKey: 'ESPORTS.LINKS',
    position: { x: 260, y: 150 },
    size: { width: 540, height: 360 },
    content: {
      type: 'folder',
      folderNameKey: 'ESPORTS.LINKS',
      items: [
            {
          id: 'esports-marca',
          name: 'Marca',
          type: 'code',
          action: () => window.open('https://www.marca.com/videojuegos/esports/2023/09/27/6513ceea46163f9fa78b4584.html', '_blank'),
          
        },
         {
          id: 'esports-canalsur',
          name: 'CanalSur',
          type: 'code',
          action: () => window.open('https://www.facebook.com/CanalSurRadioAndalucia/videos/-hablamos-con-la-jiennese-lidia-del-moral-didii-una-de-las-mejores-gamers-de-esp/1592084341647040/', '_blank'),
          
        },
           {
          id: 'esports-esportmaniacos',
          name: 'E-sportmaniacos',
          type: 'code',
          action: () => window.open('https://www.esportmaniacos.com/valorant/rebels-velvet-equipo-femenino-valorant/', '_blank'),
          
        },
      ],
    },
  },
  // trashcan : {
  //   titleKey: 'DESKTOP.TRASHCAN',
  //   position: { x: 260, y: 150 },
  //   size: { width: 460, height: 320 },
  //   desktop: { icon: 'trash' },
  //   content: { type: 'text', textKey: 'DESKTOP.TRASHCAN' },
  // },
 
  
  contact: {
    titleKey: 'DOCK.CONTACT',
    position: { x: 260, y: 150 },
    size: { width: 460, height: 320 },
    dock: { icon: 'mail' },
    content: { type: 'contact' },
  },
} as const satisfies Record<string, PortfolioWindowConfig>;
// no mutable, tiene que satisfacer la interfaz PortfolioWindowConfig si no, da error. Aporta autocompletado

// Tipos derivados de la fuente de la verdad del portfolio
export type WindowId = keyof typeof PORTFOLIO_WINDOWS;


export interface PortfolioWindow extends PortfolioWindowConfig {
  id: WindowId;
}

// objeto que actua como array que tiene el id de cada ventana y sus datos (PortfolioWindowConfig), para poder iterar sobre él y 
// generar la lista de ventanas del portfolio
export const PORTFOLIO_WINDOW_LIST: readonly PortfolioWindow[] =
  (Object.keys(PORTFOLIO_WINDOWS) as WindowId[]).map((id) => {
    const data = PORTFOLIO_WINDOWS[id];

    return {
      id,
      ...data,
    };
  });
