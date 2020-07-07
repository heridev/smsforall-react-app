import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles({
  root: {
    padding: 24
  }
});

const Overview = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 className="py-16">Overview</h1>
      <p>
        <b>The smsparatodos.com API</b> allows you to manage your text messages(SMS) using any programming languages and we include a few examples for:
      </p>
      <br />
      <ul className="list-disc pl-20">
        <li>PHP</li>
        <li>JAVA</li>
        <li>C#</li>
        <li>C</li>
        <li>Python</li>
        <li>Ruby</li>
        <li>Javascript</li>
        <li>NodeJS</li>
      </ul>
      <br />
      <blockquote>
        <p>
					But the options are endlesss.
        </p>
      </blockquote>
    </div>
  );
};

export default React.memo(Overview);
