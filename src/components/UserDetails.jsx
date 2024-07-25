import React from 'react';
import useUserData from '../hooks/useUserData';
import { styled } from '@mui/material/styles';
import {Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';


const CenteredContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh', 
});

function UserDetails(){

const { id }= useParams();
const { users } = useUserData();


const findedUser = users.find(user => user.id === parseInt(id));

if (!findedUser) {
    return <div>Користувача не знайдено</div>;
}
return (
    <CenteredContainer>
        <Card sx={{ width: 700}}>
        <CardContent sx={{  textAlign: 'center',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%',}}>
        <Typography gutterBottom variant="h5" component="div">
        {findedUser.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
                Email: {findedUser.email} <br/>
                City: {findedUser.address.city}<br/>
                Street: {findedUser.address.street}<br/>
                Suite: {findedUser.address.suite}<br/>
        </Typography>
        </CardContent>
        <CardActions sx={{justifyContent: 'flex-end',}}>
        <Link to="/user">
            <Button size="small">Back</Button>
        </Link>

        </CardActions>
    </Card>
    </CenteredContainer>

);
}

export default UserDetails;

