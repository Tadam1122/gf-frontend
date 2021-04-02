const productHeaderCells = [
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
export function getHeaderCells() {
  return productHeaderCells
}
