
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Position from './position';
import { Container } from '@mui/system';


function Dashboard() {

    return (
        <Container>
            <Box >
                <Grid item>
                    <Position />
                </Grid>
            </Box>
        </Container>
    )
}

export default Dashboard