export const photography = {
  courtyard: { width: 1600, height: 900 },
  'listening-room': { width: 1600, height: 1067 },
  'clay-atelier': { width: 1600, height: 1067 },
  'tidal-pavilion': { width: 1600, height: 1067 },
} as const;
export type Photograph = keyof typeof photography;
