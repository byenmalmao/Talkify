import { create } from 'zustand';

 export const useThemeStore = create((set) => ({ 
    theme:localStorage.getItem('talkify-theme') || 'coffee',
    setTheme: (theme) => {
        localStorage.setItem("talkify-theme", theme);
        set({theme});
       },
        
}))