import { createMuiTheme, ThemeProvider }  from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';
import MainApp from './component/MainApp'


const theme = createMuiTheme({
  palette: {
    primary: { 500: '#467fcf' },
  },
})


function App() {
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainApp />
    </ThemeProvider>
  );
}

export default App;
