import { Button } from '@material-ui/core'

function MButton({ color, text, variant }) {
  return (
    <Button variant={variant} color={color}>
      {text}
    </Button>
  )
}

MButton.defaultProps = {
  color: 'primary',
  text: 'Submit',
  variant: 'contained',
}

export default MButton
