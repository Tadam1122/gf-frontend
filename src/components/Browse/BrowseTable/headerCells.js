const electricGuitarCells = [
  {
    id: 'image',
    numeric: false,
    disablePadding: true,
    label: '',
  },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  {
    id: 'bridgeConfig',
    numeric: false,
    disablePadding: false,
    label: 'Bridge',
  },
  {
    id: 'stringCount',
    numeric: true,
    disablePadding: false,
    label: 'Strings',
  },
  {
    id: 'pickupConfig',
    numeric: false,
    disablePadding: false,
    label: 'Pickup Layout',
  },
  {
    id: 'scaleLen',
    numeric: false,
    disablePadding: false,
    label: 'Scale',
  },
  {
    id: 'neckConstruction',
    numeric: false,
    disablePadding: false,
    label: 'Neck Construction',
  },
  {
    id: 'price',
    numeric: false,
    disablePadding: false,
    label: 'Price',
  },
]

const acousticGuitarCells = [
  {
    id: 'image',
    numeric: false,
    disablePadding: true,
    label: '',
  },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  {
    id: 'bodyType',
    numeric: false,
    disablePadding: false,
    label: 'Body',
  },
  {
    id: 'topWood',
    numeric: false,
    disablePadding: false,
    label: 'Top Wood',
  },
  {
    id: 'electronics',
    numeric: false,
    disablePadding: false,
    label: 'Electronics',
  },
  {
    id: 'stringCount',
    numeric: true,
    disablePadding: false,
    label: 'Strings',
  },
  {
    id: 'scaleLen',
    numeric: false,
    disablePadding: false,
    label: 'Scale',
  },
  {
    id: 'price',
    numeric: false,
    disablePadding: false,
    label: 'Price',
  },
]

const electricAmpCells = [
  {
    id: 'image',
    numeric: false,
    disablePadding: true,
    label: '',
  },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  {
    id: 'wattage',
    numeric: false,
    disablePadding: false,
    label: 'Watts',
  },
  {
    id: 'type',
    numeric: true,
    disablePadding: false,
    label: 'Type',
  },
  {
    id: 'tubeConf',
    numeric: true,
    disablePadding: false,
    label: 'Tubes',
  },
  {
    id: 'channels',
    numeric: false,
    disablePadding: false,
    label: 'Channels',
  },
  {
    id: 'price',
    numeric: false,
    disablePadding: false,
    label: 'Price',
  },
]

const acousticAmpCells = [
  {
    id: 'image',
    numeric: false,
    disablePadding: true,
    label: '',
  },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  {
    id: 'wattage',
    numeric: false,
    disablePadding: false,
    label: 'Watts',
  },
  {
    id: 'type',
    numeric: true,
    disablePadding: false,
    label: 'Type',
  },
  {
    id: 'tubeConf',
    numeric: true,
    disablePadding: false,
    label: 'Tubes',
  },
  {
    id: 'channels',
    numeric: false,
    disablePadding: false,
    label: 'Channels',
  },
  {
    id: 'price',
    numeric: false,
    disablePadding: false,
    label: 'Price',
  },
]

const effectPedalCells = [
  {
    id: 'image',
    numeric: false,
    disablePadding: true,
    label: '',
  },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  {
    id: 'effectType',
    numeric: false,
    disablePadding: false,
    label: 'Type',
  },
  {
    id: 'size',
    numeric: true,
    disablePadding: false,
    label: 'Size',
  },
  {
    id: 'price',
    numeric: false,
    disablePadding: false,
    label: 'Price',
  },
]

//return one of the header cells for table
export function getHeaderCells(category) {
  switch (category) {
    case 'Electric Guitars':
      return electricGuitarCells
    case 'Acoustic Guitars':
      return acousticGuitarCells
    case 'Electric Amps':
      return electricAmpCells
    case 'Acoustic Amps':
      return acousticAmpCells
    case 'Effect Pedals':
      return effectPedalCells
    default:
      return []
  }
}
