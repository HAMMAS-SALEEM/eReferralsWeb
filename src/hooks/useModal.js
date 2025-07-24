import React from 'react'

export default function useModal(defaultValue = false) {
  const [open, setOpen] = React.useState(defaultValue)

  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  return {
    isOpen: open,
    open: openModal,
    close: closeModal,
  }
}
