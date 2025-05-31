// export const colors = {
//   background: {
//     DEFAULT: '#050515',
//   },

//   foreground: {
//     DEFAULT: '#ffffff',
//   },

//   primary: {
//     DEFAULT: '#db395c',
//     foreground: '#ffffff',
//   },

//   secondary: {
//     DEFAULT: '#ff7a00',
//     foreground: '#65656B',
//   },

//   disabled: {
//     DEFAULT: '#65656B',
//     foreground: '#ffffff',
//   },

//   accent: {
//     DEFAULT: '#ffcc00',
//     foreground: '#000000',
//   },

//   destructive: {
//     DEFAULT: '#ff6666',
//     foreground: '#ffffff',
//   },

//   confirmation: {
//     DEFAULT: '#66ff66',
//     foreground: '#ffffff',
//   },

//   card: {
//     DEFAULT: '#2C2B3D',
//     foreground: '#ffffff',
//     accent: '#222232',
//     border: '#272638',
//   },

//   tab: {
//     DEFAULT: '#181828',
//     foreground: '#ffffff',
//     active: '#ffffff',
//     inactive: '#65656B',
//   },

//   search: {
//     DEFAULT: '#2B2B3D',
//     foreground: '#ffffff',
//     placeholder: '#65656B',
//   },

//   social: {
//     google: {
//       blue: '#4285f4',
//       red: '#ea4335',
//       yellow: '#fbbc05',
//       green: '#34a853',
//     },

//     apple: {
//       gray: '#666666',
//     }
//   }
// }

// export const getColor = (color: keyof typeof colors, type: string = "DEFAULT") => {
//   if (!colors) return "#000000";

//   const colorKeys = Object.keys(colors);

//   if (!colorKeys.includes(color)) return "#000000";

//   const typeKeys = Object.keys(colors[color]);

//   if (!typeKeys.includes(type)) return "#000000";

//   return (colors as any)[color][type];
// }

export const colors = {
  background: {
    DEFAULT: '#050515',
  },

  foreground: {
    DEFAULT: '#ffffff',
  },

  primary: {
    DEFAULT: '#db395c',
    foreground: '#ffffff',
  },

  secondary: {
    DEFAULT: '#ff7a00',
    foreground: '#65656B',
  },

  disabled: {
    DEFAULT: '#65656B',
    foreground: '#ffffff',
  },

  accent: {
    DEFAULT: '#ffcc00',
    foreground: '#000000',
  },

  destructive: {
    DEFAULT: '#ff6666',
    foreground: '#ffffff',
  },

  confirmation: {
    DEFAULT: '#66ff66',
    foreground: '#ffffff',
  },

  card: {
    DEFAULT: '#2C2B3D',
    foreground: '#ffffff',
    accent: '#222232',
    border: '#272638',
  },

  tab: {
    DEFAULT: '#181828',
    foreground: '#ffffff',
    active: '#ffffff',
    inactive: '#65656B',
  },

  search: {
    DEFAULT: '#2B2B3D',
    foreground: '#ffffff',
    placeholder: '#65656B',
  },

  social: {
    google: {
      blue: '#4285f4',
      red: '#ea4335',
      yellow: '#fbbc05',
      green: '#34a853',
    },

    apple: {
      gray: '#666666',
    }
  }
}

export const getColor = (color: keyof typeof colors, type: string = "DEFAULT") => {
  if (!colors) return "#000000";

  const colorKeys = Object.keys(colors);

  if (!colorKeys.includes(color)) return "#000000";

  const typeKeys = Object.keys(colors[color]);

  if (!typeKeys.includes(type)) return "#000000";

  return (colors as any)[color][type];
}