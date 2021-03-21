import { useState } from 'react'
import {
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
import ProductTableHead from './ProductTableHead'
import ProductRow from './ProductRow'
import { getLowestNumber } from '../../../utilities/priceUtil'

function sortData(data, order, prop) {
  if (prop === 'price') {
    if (order === 'asc') {
      return data.sort((a, b) =>
        getLowestNumber(a.prices) > getLowestNumber(b.prices) ? 1 : -1
      )
    }
    return data.sort((a, b) =>
      getLowestNumber(a.prices) < getLowestNumber(b.prices) ? 1 : -1
    )
  }
  if (prop === 'name') {
    if (order === 'asc') {
      return data.sort((a, b) =>
        `${a.brand} ${a.model}` > `${b.brand} ${b.model}` ? 1 : -1
      )
    }
    return data.sort((a, b) =>
      `${a.brand} ${a.model}` < `${b.brand} ${b.model}` ? 1 : -1
    )
  }
  if (order === 'asc') {
    return data.sort((a, b) => (a[prop] > b[prop] ? 1 : -1))
  }
  return data.sort((a, b) => (a[prop] < b[prop] ? 1 : -1))
}

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
}))

function ProductTable({
  products,
  category,
  rowsPerPage,
  page,
  handleChangeRowsPerPage,
  handleChangePage,
}) {
  const classes = useStyles()
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')

  function handleSort(_, property) {
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
      </Toolbar>
      <Table>
        <ProductTableHead
          category={category}
          order={order}
          orderBy={orderBy}
          handleSort={handleSort}
        />
        <TableBody>
          {sortData(products, order, orderBy)
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((product) => {
              return <ProductRow product={product} key={product._id} />
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
