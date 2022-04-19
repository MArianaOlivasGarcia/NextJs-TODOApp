import { ChangeEvent, FC, useContext, useMemo, useState } from "react";
import { GetServerSideProps } from 'next'
import { Button, capitalize, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField } from "@mui/material";
import { Layout } from "../../components/layouts";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { Entry, EntryStatus } from "../../interfaces";
import { dbEntries } from "../../database";
import { EntriesContext } from "../../context/entries";
import { dateFunctions } from "../../utils";



const validStatus: EntryStatus[] = ['pending', 'in-progress', 'finished']



interface Props {
    entry: Entry
}

const EntryPage: FC<Props> = ( { entry } ) => {

    console.log(entry)

    const { updateEntry } = useContext( EntriesContext )

    const [inputValue, setInputValue] = useState( entry.description );
    const [status, setStatus] = useState<EntryStatus>( entry.status );
    const [isTouched, setIsTouched] = useState(false);

    const onInputChanged = ( event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setInputValue( event.target.value )
    }

    const onStatusChanged = ( event: ChangeEvent<HTMLInputElement> ) => {   
        setStatus( event.target.value as EntryStatus )
    }   


    const saveEntry = () => {
        console.log({ inputValue, status });

        if ( inputValue.trim().length === 0 ) return ;

        const data: Entry = { 
            ...entry, 
            description: inputValue, 
            status 
        }

        updateEntry( data )
    }


    const isInvalid = useMemo(() => inputValue.length <= 0 && isTouched , [inputValue, isTouched]);

  return (
    <Layout title={ inputValue.substring(0,20) + '...' }>

        <Grid container justifyContent='center' sx={{ marginTop: 2 }}>

            <Grid item xs={12} sm={8} md={6}>

                <Card>
                    <CardHeader 
                        title={ `Entrada:` }
                        subheader={  dateFunctions.getFormatDistanceToNow( entry.createdAt ) } />

                    <CardContent>
                        <TextField  
                            sx={{  marginBottom: 5 }}
                            fullWidth
                            placeholder="Escribe aquí..."
                            multiline
                            label="Nueva tarea"
                            autoFocus
                            value={ inputValue }
                            onChange={ onInputChanged }
                            helperText={ isInvalid && 'Este campo es requerido' }
                            onBlur={ () => setIsTouched(true) }
                            error={ isInvalid }
                        />


                        <FormControl>
                            <FormLabel>Status:</FormLabel>
                            <RadioGroup 
                                row
                                value={ status } 
                                onChange={ onStatusChanged } > 
                                {
                                    validStatus.map( status => (
                                        <FormControlLabel 
                                            key={ status }
                                            label={ capitalize( status ) }
                                            value={ status }
                                            control={ <Radio />}
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>
                    </CardContent>

                    <CardActions>
                        <Button
                            startIcon={ <SaveOutlinedIcon /> }
                            variant="contained"
                            fullWidth
                            onClick={ saveEntry } 
                            disabled={ inputValue.length <= 0  }>
                            Guardar
                        </Button>
                    </CardActions>
                </Card>

            </Grid>

        </Grid>



        <IconButton sx={{
            position: 'fixed',
            bottom: 20,
            right: 20,
            backgroundColor: 'error.dark'
        }}>
            <DeleteOutlinedIcon />
        </IconButton>

    </Layout>
  )
}


///// CUANDO SE HACE EL REQUEST A LA PAGE
// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ( context ) => {


    const { id } = context.params as { id: string };

    const entry = await dbEntries.getEntryById( id );

    if ( !entry ) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }



    return {
        props: {
            entry
        }
    }
}


export default EntryPage;