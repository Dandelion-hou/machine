
import { Link, makeStyles, Typography } from '@material-ui/core';

const useFooterStyles = makeStyles((theme) => ({
  footer: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing(2),
    '& > *': {
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
    },
  },
}));

export const Footer = () => {
  const classes = useFooterStyles();
  return (
    <footer className={classes.footer}>
      <Typography variant="caption">&copy; {new Date().getFullYear()} Obeo. Powered by </Typography>
      <Link variant="caption" href="https://www.eclipse.org/sirius" rel="noopener noreferrer" target="_blank">
        自定义
      </Link>
    </footer>
  );
};
