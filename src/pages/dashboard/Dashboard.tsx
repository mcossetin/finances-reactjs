
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { useState } from 'react';

import Indicators from './indicators';
import Position from './position';
import StatementPage from '../statement/Statement';
import { IconButton } from '@mui/material';


function Dashboard() {

    const [showUpdate, setShowUpdate] = useState(false);


    return (
        <Box sx={{ flexGrow: 1 }}>
            {showUpdate &&
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <IconButton onClick={() => setShowUpdate(false)} >
                            <CloseIcon fontSize="large" />
                        </IconButton>

                        <StatementPage />
                    </Grid>

                </Grid>
            }

            {!showUpdate && <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={() => setShowUpdate(true)}>Atualizar</Button>
                </Grid>
                <Grid item xs={12}>
                    <Indicators label={['1a', 'a2 dddd', 'aaaa']} />
                </Grid>
                <Grid item xs={12}>
                    Rendimentos
                </Grid>
                <Grid item>
                    <Position />                   
                </Grid>
            </Grid>
            }
        </Box>
    )
}

export default Dashboard