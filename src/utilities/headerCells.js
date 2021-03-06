const electricGuitarCells = [
  {
    id: 'image',
    numeric: false,
    disablePadding: true,
    label: '',
  },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  {
    id: 'bridge',
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
    id: 'pickupConfiguration',
    numeric: false,
    disablePadding: false,
    label: 'Pickup Layout',
  },
  {
    id: 'scaleLength',
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
    id: 'scaleLength',
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
    id: 'watts',
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
    id: 'watts',
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

const productCells = [
  {
    id: 'image',
    numeric: false,
    disablePadding: true,
    label: '',
  },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },

  {
    id: 'price',
    numeric: false,
    disablePadding: false,
    label: 'Price',
  },
]

const searchCells = [
  {
    id: 'image',
    numeric: false,
    disablePadding: true,
    label: '',
  },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  {
    id: 'price',
    numeric: false,
    disablePadding: false,
    label: 'Price',
  },
]

const wishlistCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'totalPrice',
    numeric: false,
    disablePadding: false,
    label: 'Total Price',
  },
]

const priceCells = [
  {
    id: 'website',
    numeric: false,
    disablePadding: true,
    label: 'Merchant',
  },
  { id: 'price', numeric: false, disablePadding: false, label: 'Price' },
  {
    id: 'inStock',
    numeric: false,
    disablePadding: false,
    label: 'In Stock',
  },
  {
    id: '1',
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
    case 'Products':
      return productCells
    case 'Wishlist':
      return wishlistCells
    case 'Price':
      return priceCells
    default:
      return searchCells
  }
}
