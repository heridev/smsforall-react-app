import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const createData = (fieldName, required, description) => {
  return { fieldName, required, description };
};

const rows = [
  createData('mobile_hub_id', 'true', 'This is the unique identifier that identifies your SMS device that will send the message and it needs to be activated and to have a valid SMS plan to send text messages, you can find this information by accessing your device details within the SMS devices menu'),
  createData('sms_number', 'true', 'It is the international number, including the international code + the local phone number (including local area code)'),
  createData('sms_type', 'true', 'There are two possible values for this field: <b>standard_delivery</b> and <b>urgent_delivery</b>, we give more priority to urgent delivery SMS, so if you need to ensure that this message is delivered as soon as possible just like a one time token, set the urgent_delivery type for that request.'),
  createData('sms_content', 'true', 'It is the content message that has a limit of 160 characters, in the case you send a longer message, we will take only the first 160 characters from your request.'),
  createData('sms_customer_reference_id', 'false', 'You can use this value to associate your messages to our system, so you can track and access in the future any specific text message details, the maximum length is 128 characters')
];

const BodyParamsTable = () => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Parameter</TableCell>
            <TableCell>Required</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell>
                {row.fieldName}
              </TableCell>
              <TableCell>{row.required}</TableCell>
              <TableCell  dangerouslySetInnerHTML={{__html: row.description}}></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default React.memo(BodyParamsTable);
