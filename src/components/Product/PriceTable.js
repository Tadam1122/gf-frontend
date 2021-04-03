import {
  Typography,
  Toolbar,
  Table,
  TableBody,
  TableContainer,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PriceTableHead from './PriceTableHead'
import PriceTableRow from './PriceTableRow'

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

function PriceTable({ product }) {
  const classes = useStyles()
  return (
    <TableContainer className={classes.table}>
      <Toolbar className={classes.toolbar}>
        <Typography variant='h4'>
          {product.brand} {product.model}
        </Typography>
      </Toolbar>
      <Table>
        <PriceTableHead />
        <TableBody>
          {product.prices.map((store) => {
            return <PriceTableRow store={store} key={store.url} />
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default PriceTable
