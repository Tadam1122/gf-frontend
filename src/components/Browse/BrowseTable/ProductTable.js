import { useState, useEffect } from 'react'
import {
  Button,
  Hidden,
  Toolbar,
  Typography,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TableCell,
  TablePagination,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import ProductTableHead from './ProductTableHead'
import ProductRow from './ProductRow'
import { getHeaderCells } from './headerCells'
import { sortData } from './sortData'

const useStyles = makeStyles((theme) => ({
  table: {
    background: 'white',
    flexGrow: 1,
    height: '100%',
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  filterButton: {
    marginLeft: theme.spacing(2),
    borderRadius: '15px',
    fontSize: '.75em',
  },
  icon: {
    marginLeft: '3px',
  },
}))

function ProductTable({
  products,
  username,
  wishlists,
  category,
  rowsPerPage,
  page,
  activeFilters,
  activeRadio,
  activePrice,
  handleActiveChecked,
  handleRadioSelect,
  handleClearPrice,
  handleChangeRowsPerPage,
  handleChangePage,
}) {
  const classes = useStyles()
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')
  const [headerCells, setHeaderCells] = useState([])

  // get new header cells for different categories
  useEffect(() => {
    const newHeaderCells = getHeaderCells(category)
    setHeaderCells(newHeaderCells)
  }, [category])

  // sort
  function handleSort(property) {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage)

  return (
    <TableContainer className={classes.table}>
      <Toolbar className={classes.toolbar}>
        <Typography component='div' variant='h6'>
          {category}
        </Typography>
        <Hidden smDown>
          {activePrice.length > 0 && (
            <Button
              className={classes.filterButton}
              color='primary'
              variant='contained'
              size='small'
              disableElevation
              onClick={(_) => {
                handleClearPrice()
              }}
            >
              Price:{' '}
              {activePrice[0] &&
                activePrice[1] &&
                `$${activePrice[0]}-$${activePrice[1]}`}
              {!activePrice[0] && `Under $${activePrice[1]}`}
              {!activePrice[1] && `Over $${activePrice[0]}`}
              <HighlightOffIcon fontSize='small' className={classes.icon} />
            </Button>
          )}
          {activeRadio.map((radio) => (
            <Button
              className={classes.filterButton}
              color='primary'
              variant='contained'
              size='small'
              disableElevation
              onClick={(_) => {
                handleRadioSelect(radio.value, radio.name)
              }}
              key={radio.name}
            >
              {radio.name.replace(/([A-Z])/g, ' $1')}: {radio.value}
              <HighlightOffIcon fontSize='small' className={classes.icon} />
            </Button>
          ))}
          {activeFilters.map((filter) => {
            return filter.values.map((value) => (
              <Button
                className={classes.filterButton}
                color='primary'
                variant='contained'
                size='small'
                disableElevation
                onClick={(_) => {
                  handleActiveChecked(value, filter.name)
                }}
                key={`${filter.name} ${value}`}
              >
                {filter.name.replace(/([A-Z])/g, ' $1')}: {value}
                <HighlightOffIcon fontSize='small' className={classes.icon} />
              </Button>
            ))
          })}
        </Hidden>
      </Toolbar>
      <Table>
        <ProductTableHead
          order={order}
          orderBy={orderBy}
          handleSort={handleSort}
          headerCells={headerCells}
        />
        <TableBody>
          {sortData(products, order, orderBy)
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((product) => {
              return (
                <ProductRow
                  product={product}
                  wishlists={wishlists}
                  key={product._id}
                  headerCells={headerCells}
                  username={username}
                />
              )
            })}
          {emptyRows > 0 && (
            <TableRow style={{ height: 50 * emptyRows }}>
              <TableCell colSpan={10} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        component='div'
        rowsPerPageOptions={[5, 10, 20, 35, 50]}
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      ></TablePagination>
    </TableContainer>
  )
}

export default ProductTable
