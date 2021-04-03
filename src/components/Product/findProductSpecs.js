const eGuitarSpec = [
  {
    category: 'body',
    specs: ['bodyStyle', 'bodyConfig', 'bodyWood', 'top', 'color', 'finish'],
  },
  {
    category: 'neck',
    specs: [
      'neckConstruction',
      'neckWood',
      'fretboard',
      'fretboardRadius',
      'fretNum',
      'frets',
      'inlays',
    ],
  },
  { category: 'electronics', specs: ['pickupConfig', 'bridge', 'pickguard'] },
  { category: 'general', specs: ['scaleLen', 'stringCount'] },
]

const aGuitarSpec = [
  {
    category: 'body',
    specs: ['bodyType', 'bodyWood', 'top', 'color', 'finish'],
  },
  {
    category: 'neck',
    specs: [
      'neckConstruction',
      'neckWood',
      'fretboard',
      'fretboardRadius',
      'fretNum',
      'frets',
      'inlays',
    ],
  },
  { category: 'hardware', specs: ['electronics', 'pickguard'] },
  { category: 'general', specs: ['scaleLen', 'stringCount'] },
]

const eAmpSpec = [
  {
    category: 'body',
    specs: ['bodyStyle', 'bodyConfig', 'bodyWood', 'top', 'color', 'finish'],
  },
  {
    category: 'neck',
    specs: [
      'neckConstruction',
      'neckWood',
      'fretboard',
      'fretboardRadius',
      'fretNum',
      'frets',
      'inlays',
    ],
  },
  { category: 'electronics', specs: ['pickupConfig', 'bridge', 'pickguard'] },
  { category: 'general', specs: ['scaleLen', 'stringCount'] },
]

export function getProductSpecs(category) {
  switch (category) {
    case 'Electric Guitars':
      return eGuitarSpec
    case 'Acoustic Guitars':
      return aGuitarSpec
    case 'Electric Amps':
      return eAmpSpec
    // case 'Acoustic Amps':
    //   return acousticAmpCells
    // case 'Effect Pedals':
    //   return effectPedalCells
    default:
      return eGuitarSpec
  }
}
