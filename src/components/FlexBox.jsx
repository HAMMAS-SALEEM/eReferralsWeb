import React from 'react'
import { Box } from '@mui/material'
import PropTypes from 'prop-types'

const FlexBox = ({ children, ...props }) => (
  <Box component="div" display="flex" {...props}>
    {children}
  </Box>
)

FlexBox.propTypes = {
  children: PropTypes.node,
}

export default FlexBox

// import React from 'react'
// import { Box } from '@mui/material'
// import PropTypes from 'prop-types'

// // eslint-disable-next-line react/display-name
// const FlexBox = React.forwardRef(({ children, ...props }, ref) => (
//   <Box component="div" display="flex" ref={ref} {...props}>
//     {children}
//   </Box>
// ))

// FlexBox.propTypes = {
//   children: PropTypes.node,
// }

// export default FlexBox
