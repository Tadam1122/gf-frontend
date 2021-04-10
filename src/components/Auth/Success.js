import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Zoom } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { clearSuccess } from '../../actions/successActions'

function Success() {
  const success = useSelector((state) => state.successRed.success)
  const dispatch = useDispatch()

  //state variable for zoom component to display message
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    function checkSuccess() {
      if (success) {
        setShowMessage(true)
        setTimeout(() => {
          setShowMessage(false)
          dispatch(clearSuccess())
        }, 1000)
      }
    }
    checkSuccess()
  }, [success, dispatch])

  return (
    <Zoom in={showMessage}>
      <Alert severity='success'>
        <Typography variant='subtitle2'>{success}</Typography>
      </Alert>
    </Zoom>
  )
}

export default Success
