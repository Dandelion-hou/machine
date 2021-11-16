import CssBaseline from '@material-ui/core/CssBaseline';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import { theme } from './theme';
import { BrowserRouter } from 'react-router-dom';
import './fonts.css';
import './style.css';
import './variables.css';
import ReactFullpage from '@fullpage/react-fullpage';
import { Carousel } from './views/component/carousel/Carousel';
import { Charts } from './views/component/charts/Charts';
import { Tableview } from './views/component/Tableview/Tableview';
import { Footer } from './views/footer/Footer';
import { AxiosProvider} from 'react-axios';
import axios from 'axios';
import {httpOrigin} from "./config/config";
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
            main: '#261E58',
            dark: '#1A153D',
            light: '#514B79',
        },
        text: {
            primary: '#261E58',
            disabled: '#B3BFC5',
            hint: '#B3BFC5',
        },
        error: {
            main: '#DE1000',
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
        MuiSnackbarContent: {
            root: {
                backgroundColor: '#7269A4',
            },
        },
    },
});

const siriusWebTheme = createTheme(
    {
        overrides: {
            MuiAvatar: {
                colorDefault: {
                    backgroundColor: baseTheme.palette.primary.main,
                },
            },
        },
    },
    baseTheme
);

const style = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr',
    minHeight: '100vh',
};
const axiosInstance = axios.create({
    baseURL: httpOrigin,
    timeout: 2000,
    headers: { 'X-Custom-Header': 'foobar' }
});
ReactDOM.render(
    <AxiosProvider instance={axiosInstance}>
        <BrowserRouter>
            <ThemeProvider theme={siriusWebTheme}>
                <CssBaseline />
                <div style={style}>
                    <ReactFullpage
                        navigation
                        scrollingSpeed = {1000}
                        scrollHorizontally = {true}
                        sectionsColor={["#13181F", "#13181F", "#13181F"]}
                        render={() => {
                            return (
                                <>
                                    <Carousel />
                                    <Charts />
                                    <Tableview />
                                </>
                            );
                        }}
                    />
                    <Footer />
                </div>
            </ThemeProvider>
        </BrowserRouter>
    </AxiosProvider>,
    document.getElementById('root')
);
