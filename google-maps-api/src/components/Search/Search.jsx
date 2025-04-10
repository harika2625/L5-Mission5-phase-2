import { useState } from 'react'
import { TextField, IconButton, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { Autocomplete } from '@react-google-maps/api'

function Search({ onPlaceSelected }) {

    // state hook to store autocomplete object Google may send through
  const [autocomplete, setAutocomplete] = useState(null)
  const onLoad = (autoC) => setAutocomplete(autoC)

  // when widget returns valid place for matchable address, capture and pass to parent
  const onPlaceChange = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace()
      if (place.geometry) {
        onPlaceSelected(place)
      }
    }
  }

  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        position: 'absolute',
        top: 10,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1
      }}
    >
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChange}>
        <TextField
          fullWidth
          placeholder="Enter an address to find Z stations nearby."
          variant="standard"
          sx={{ 
            ml: 1, 
            flex: 1,
            '& .MuiInput-underline:before': { borderBottom: 'none' },
            '& .MuiInput-underline:after': { borderBottom: 'none' },
            '& .MuiInput-underline:hover:not(.Mui-disabled):before': { borderBottom: 'none' }
          }}
        />
      </Autocomplete>
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default Search