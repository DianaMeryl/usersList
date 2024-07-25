import React from 'react';
import { useState, useEffect } from 'react';
import { memo } from 'react';
import useUserData from '../hooks/useUserData';
import usePagination from '../hooks/usePagination';
import useSearch from '../hooks/useSearch';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Link from '@mui/material/Link';
import { Container, Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
[`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
},
[`&.${tableCellClasses.body}`]: {
    fontSize: 14,
},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
'&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
},
// hide last border
'&:last-child td, &:last-child th': {
    border: 0,
},
}));

const UserList = memo(function UserList({itemsPerPage, startFrom }){

const { users } = useUserData();

const { slicedData, pagination, prevPage, nextPage, changePage, setFilteredData, setSearching, filteredData } = usePagination({ itemsPerPage, users, startFrom });
const {search, setSearch, submitEvent, isVisible, BackBtnHandler, sortHandler, sortByKey, order, } = useSearch(users, setSearching,  setFilteredData, filteredData);

const columns = [
    { label: 'Name', sortKey: 'name' },
    { label: 'Emai', sortKey: 'email' },
    { label: 'City', sortKey: 'address.city' },
];

return (
    <>
        <Box 
            component="form"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'right',
                marginBottom: '20px',
                padding:'20px',
            }}
            noValidate
            autoComplete="off"
        >
        <TextField
            id="filled-search"
            label="Search..."
            type="search"
            variant="filled"
            value={search} 
            onChange={(e) => (setSearch(e.target.value))} 
        />
        <Button variant="contained" color="success" onClick={submitEvent} size="medium">Search</Button>
    </Box>
    <Container>
    <Grid container justifyContent="center">
    <Grid item>
    <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
        <Table sx={{ minWidth: 900 }} aria-label="customized table">
            <TableHead>
            <TableRow>
            {columns.map((col, index) => (
            <StyledTableCell align="left"
                key={index}
                onClick={() => sortHandler(col.sortKey, sortByKey === col.sortKey ? order === 'asc' ? 'desc' : 'asc' : 'asc')}
                >
                {col.label}
                {sortByKey === col.sortKey &&
                <span className="icon">
                    {order === 'asc'
                    ? (<KeyboardArrowDownIcon/>)
                    : (<KeyboardArrowUpIcon/>)
                    }
                </span>
                }
            </StyledTableCell>
            ))}
            </TableRow>
            </TableHead>
            <TableBody>
            {slicedData.map(item => (
                <StyledTableRow key={item.id}>
                <StyledTableCell align="left"> <Link href={`/user/${item.id}`}>{item.name}</Link></StyledTableCell>
                <StyledTableCell align="left">{item.email}</StyledTableCell>
                <StyledTableCell align="left">{item.address.city}</StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
    </TableContainer>
    <nav className='pagination'>
        <Link href="/#" onClick={prevPage} sx={{textDecoration:"none", fontSize: 18, '&:hover': { color: 'primary.dark' } }}>Previous</Link>
        <List style={{display:"flex",}}>
        {pagination.map(page => {
                if(!page.ellipsis) {
                return <ListItem key={page.id}>
                    <a style={{ color: page.current ? 'red' : 'pink' }} 
                    href="/#"
                    onClick={(e) => changePage(page.id, e)}
                    >
                    {page.id}
                    </a>
                </ListItem>
                }else {
                return <ListItem key={page.id}><span>&hellip;</span></ListItem>
                }
            })}
        </List>
        <Link href="/#" onClick={nextPage} sx={{textDecoration:"none", fontSize: 18, '&:hover': { color: 'primary.dark' } }}>Next</Link>
    </nav>
    <Button variant="outlined" color="secondary" onClick={BackBtnHandler} size="medium"  style={{ display: isVisible ? 'block' : 'none', margin:"0 auto" }} >Back</Button>
    </Grid>
    </Grid>
    </Container>
    </>
);
})

export default UserList;
