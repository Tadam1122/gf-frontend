import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Typography, Zoom } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

function Success() {
  const success = useSelector((state) => state.successRed.success)

  //state variable for zoom component to display message
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    function checkSuccess() {
      if (success) {
        setShowMessage(true)
        setTimeout(() => {
          setShowMessage(false)
        }, 2000)
      }
    }
    checkSuccess()
  }, [success])

  return (
    <Zoom in={showMessage}>
      <Alert severity='success'>
        <Typography variant='subtitle2'>{success}</Typography>
      </Alert>
    </Zoom>
  )
}

export default Success
