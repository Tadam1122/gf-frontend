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
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
  },
}))

function ProductTable({ products, category }) {
  const classes = useStyles()
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('name')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  function handleSort(_, property) {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  function handleChangePage(_, newPage) {
    setPage(newPage)
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage)

  return (
    <div className={classes.table}>
      <Toolbar>
        <Typography component='div' variant='h6' className={classes.title}>
          {category}
        </Typography>
      </Toolbar>
      <TableContainer>
        <Table color='white'>
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
                <TableCell colSpan={7} />
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          component='div'
          rowsPerPageOptions={[5, 15, 30, , 45]}
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        ></TablePagination>
      </TableContainer>
    </div>
  )
}

export default ProductTable
