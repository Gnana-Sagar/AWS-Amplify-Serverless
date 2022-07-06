import './App.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, {useEffect} from 'react';
import {ThemeProvider} from "@emotion/react";
import {createTheme} from "@mui/material";
import {Route, Routes} from 'react-router-dom';
import HomePage from './components/HomePage'
import ViewProperty from './components/ViewProperty/ViewProperty';
import PropertyGrid from './components/PropertyGrids/PropertyGrid';
import {Auth} from 'aws-amplify';
import UserModel from './components/signin/UserModel';
import track from 'react-tracking';

// 03045e,023e8a,0077b6,00b4d8,caf0f8

const theme = createTheme({
    typography: {
        fontFamily: `'Poppins', sans-serif;`
    },
    palette: {
        primary: {
            main: '#042846',
            contrastText: "#fff"
        },
        secondary: {
            main: '#00C5BA',
        },
        success: {
            main: '#589636'
        },
        error: {
            main: '#e94944'
        },
        warning: {
            main: '#FFB900'
        },
        info: {
            main: '#073e65'
        }
    },
    components: {
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fcfbfd',
                    fontWeight: 'bold',
                }
            }
        },
        MuiTableBody: {
            styleOverrides: {
                root: {
                    // backgroundColor: '#7FD1AE',
                    justifyContent: 'center'

                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: {
                    textAlign: 'center',
                    fontWeight: 'bolder',
                    // border: '1px solid #ededed'
                }
            }
        }
    }
});

function App() {

    const isUserLoggined = () => {
        Auth.currentAuthenticatedUser().then((res) => {
            UserModel.email = res.attributes.email;
            UserModel.name = res.attributes.name;
            UserModel.isUserLoggined = true;
        }, (err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        isUserLoggined();
    })

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <Routes>
                    <Route exact path="/" element={<HomePage />} />
                    <Route exact path="/grid" element={<PropertyGrid />} />
                    <Route exact path="/grid/:search" element={<PropertyGrid />} />
                    <Route path="/view/:id" element={<ViewProperty />} />
                </Routes>
            </ThemeProvider>
        </React.Fragment>
    );
}


const TrackApp = track(
    {app:'user'},
    {
        dispatch: (data) => {
            console.log(data);
        }
    }
)(App);
 export default  TrackApp;