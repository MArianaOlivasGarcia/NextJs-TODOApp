import { ChangeEvent, useContext, useState } from "react"
import { Button, Box, TextField } from "@mui/material"
import SaveOutlinedIcon from '@mui/icons-material/SaveAltOutlined'
import AddIcon from '@mui/icons-material/AddCircleOutlineOutlined'
import { EntriesContext } from "../../context/entries"
import { UIContext } from "../../context/ui"

export const NewEntry = () => {


  const { addNewEntry } = useContext( EntriesContext )

  const { isAddingEntry, setIsAddingEntry} = useContext( UIContext )


  const [inputValue, setInputValue] = useState('');
  const [touched, setTouched] = useState(false);


  const onTextFieldChanged = ( event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    setInputValue( event.target.value )
  }


  const onSave = () => {
    
    if ( inputValue.length === 0 ) return;

    console.log({ inputValue });


    addNewEntry( inputValue );

    setIsAddingEntry( false )
    setTouched( false )
    setInputValue('')

  }

  return (
    <Box sx={{ marginBottom: 2, paddingX: 1 }}>


      {
        isAddingEntry
          ? (
            <>
              <TextField 
                  fullWidth
                  sx={{ marginTop: 2, marginBottom: 1 }}
                  placeholder='Nueva entrada'
                  autoFocus
                  multiline
                  label='Nueva entrada'
                  error={ inputValue.length <= 0 && touched }
                  helperText={ inputValue.length <= 0 && touched && 'Ingrese un valor' } 
                  onChange={ onTextFieldChanged }
                  onBlur={ () => setTouched( true ) }
                  />

              <Box display='flex' justifyContent='space-around'>
                  <Button
                    onClick={ () => setIsAddingEntry( false ) }
                  >Cancelar</Button>   
                  <Button
                      onClick={ onSave }
                      endIcon={ <SaveOutlinedIcon />  }
                      >Guardar</Button>   
              </Box>
            </>
          )
          : (
            <Button
              startIcon={ <AddIcon /> } 
              fullWidth
              variant="outlined"
              onClick={ () => setIsAddingEntry( true ) }
              >
                Agregar Tarea
            </Button>
          )

      }

        

       
    </Box>
  )
}
