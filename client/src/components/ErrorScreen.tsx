import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

// Statics
import './ErrorScreen.css';
import errorLogo from '../assets/error.svg';

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

interface Props {
  errMsg: string | null;
  status?: number;
}

const ErrorScreen: React.FC<Props> = ({ errMsg, status }) => {
  const [open, setOpen] = React.useState(true);
  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="error">
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        // autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="error">
          {errMsg}
        </Alert>
      </Snackbar>

      <img src={errorLogo} alt="ERROR" />
    </div>
  );
};

export default ErrorScreen;
