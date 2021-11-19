import CssBaseline from '@material-ui/core/CssBaseline';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import { theme } from './theme';
import { BrowserRouter } from 'react-router-dom';
import {Main} from "./views/main/Main";
import './fonts.css';
import './style.css';
import './variables.css';
const baseTheme = createTheme({
    ...theme,
    palette: {
        type: 'light',
        primary: {
            main: '#ffffff',
            dark: '#851254',
            light: '#CB4793',
        },
        secondary: {
            main: '#44E7D5',
            dark: '#1A153D',
            light: '#514B79',
        },
        text: {
            primary: '#261E58',
            disabled: '#B3BFC5',
            hint: '#B3BFC5',
        },
        error: {
            main: '#fff',
            dark: '#9B0B00',
            light: '#E43F33',
        },
        divider: '#B3BFC5',
    },
    props: {
        MuiAppBar: {
            color: 'secondary',
        },
    },
    overrides: {
        MuiAvatar: {
            colorDefault: {
                backgroundColor: 'red',
            },
        },
    },
});


const style = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr',
    minHeight: '100vh',
};
ReactDOM.render(
        <BrowserRouter>
            <ThemeProvider theme={baseTheme}>
                <CssBaseline />
                <div style={style}>
                    <Main />
                </div>
            </ThemeProvider>
        </BrowserRouter>,
    document.getElementById('root')
);
