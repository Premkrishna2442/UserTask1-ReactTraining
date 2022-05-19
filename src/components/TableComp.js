import * as React from "react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import axios from "axios";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircleIcon from '@mui/icons-material/Circle';
import Avatar from '@mui/material/Avatar';
import {blue } from '@mui/material/colors';

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;
  
  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};



export default function TableComp() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setseacrhType] = useState("name");

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(
        "https://gorest.co.in/public/v2/users?access-token=ece8044b8a652c2fc64733c3872af8604f8126593e3b1b17b536754c584ac14c"
      )
      .then((res) => {
        setLoading(false);
        setUsers(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err);
      });
  }, []);
  // console.log(users.length);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (id, name, gender, email) => {
    navigate("/edit", {
      state: { ids: id, name: name, gender: gender, email: email },
    });
  };
  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleSort = () => {
    setUsers(
      users.sort((a, b) => {
        let fa = a.name.toLowerCase(),
          fb = b.name.toLowerCase();

        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      })
    );
    setRowsPerPage(7);
    // console.log(users);
  };
  return (
    <div>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <div className="searchbg">
          <div className="container">
            <div id="tool-bar">
              <button className="sort" onClick={handleSort}>
                Sort
              </button>
              <input
                className="search"
                type="text"
                placeholder="Search"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
              <Box sx={{ width: 50 }}>
                <FormControl size="small" className="drop-down">
                  <Select
                    sx={{ color: "white" }}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={searchType}
                    label="Search"
                    onChange={(e) => {
                      setseacrhType(e.target.value);
                      // console.log(searchType);
                    }}
                  >
                    <MenuItem value="name">name</MenuItem>
                    <MenuItem value="email">email</MenuItem>
                    <MenuItem value="female">female</MenuItem>
                    <MenuItem value="male">male</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
              <TableBody>
                {(rowsPerPage > 0
                  ? users.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : users
                )
                  .filter((user) => {
                    if (searchTerm === ""&&searchType!='male'&&searchType!='female') {
                      return user;
                    } else if (searchType === "name") {
                      if (searchTerm === "") {
                        return user;
                      } else if (user.name.includes(searchTerm)) {
                        return user;
                      }
                    } else if (searchType === "male") {
                      if (user.gender==="male") {
                        return user;
                      }
                    }else if (searchType === "female") {
                      if (user.gender==="female") {
                        return user;
                      }
                     
                    } else if (searchType == "email") {
                      if (searchTerm === "") {
                        return user;
                      } else if (user.email.includes(searchTerm)) {
                        return user;
                      }
                    }
                  })
                  .map((user) => (
                    <TableRow key={user.id}>
                      <TableCell component="th" scope="row">
                      <div className="table-name">
                      <Avatar sx={{ bgcolor: blue[500] ,width: 30, height: 30} }>{user.name[0]}</Avatar>
                        {user.name} 
                        {user.status==='active'?<CircleIcon color="success" fontSize="x-small"/>:
                        <CircleIcon color="error" fontSize="x-small"/>}
                        
                      </div>
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        {user.gender}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        {user.email}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        <Button>
                          <DeleteIcon onClick={() => handleDelete(user.id)} />
                        </Button>
                      </TableCell>
                      <TableCell style={{ width: 160 }} align="center">
                        <Button
                          onClick={() =>
                            handleEdit(
                              user.id,
                              user.name,
                              user.gender,
                              user.email
                            )
                          }
                        >
                          <EditIcon />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      7,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={4}
                    count={users.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}
