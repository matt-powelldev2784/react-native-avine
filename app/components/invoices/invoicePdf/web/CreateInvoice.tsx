import React from 'react'

export const CreateInvoice = () => {
  const styles = {
    page: {
      marginLeft: '5rem',
      marginRight: '5rem',
    },
    introText: {
      textAlign: 'center',
    },
    columnLayout: {
      display: 'flex',
      justifyContent: 'space-between',
      margin: '3rem 0 5rem 0',
      gap: '2rem',
    },
    column: {
      display: 'flex',
      flexDirection: 'column',
    },
    spacer2: {
      height: '2rem',
    },
    fullWidth: {
      width: '100%',
    },
    marginb0: {
      marginBottom: 0,
    },
  }
  return (
    <>
      <div style={styles.page}>
        <h1>Test</h1>
      </div>
    </>
  )
}
