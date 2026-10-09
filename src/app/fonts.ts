import { Geist, Geist_Mono } from 'next/font/google';
import { THEME_KEY } from '@/lib/site';

// Fonts are self-hosted at build time (no requests to Google at runtime)
export const sans = Geist({ subsets: ['latin'], variable: '--font-sans', display: 'swap' });
export const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' });

export const fontVars = `${sans.variable} ${mono.variable}`;

// Applies the saved theme before first paint to avoid a flash, and flags that JS runs
// (scroll reveals only hide content when html[data-js] is set)
export const THEME_SCRIPT = `document.documentElement.dataset.js='1';try{var t=localStorage.getItem('${THEME_KEY}');if(t==='dark'||t==='light')document.documentElement.dataset.theme=t}catch(e){}`;
