/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';

// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
const countryToFlag = isoCode => {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
    : isoCode;
}

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

const CountryAutocompleteSelect = (props) => {
  const { labelProperty, className, onAutocompleteChange, onDisableClearable } = props;
  const emptyFn = () => { console.log('onChange function') };
  const onDefaultChange = onAutocompleteChange || emptyFn;
  const defaultLabelProperty = labelProperty || 'Busca y selecciona tu país';
  const defaultDisableClearable = onDisableClearable || false;
  const classes = useStyles();

  return (
    <Autocomplete
      id="country-international-code"
      options={countries}
      name="countryInternationalCode"
      className={className}
      disableClearable={defaultDisableClearable}
      classes={{
        option: classes.option,
      }}
      autoHighlight
      getOptionLabel={(option) => option.label}
      onChange={onDefaultChange}
      renderOption={(option) => (
        <React.Fragment>
          <span>{countryToFlag(option.code)}</span>
          {option.label} ({option.code}) +{option.phone}
        </React.Fragment>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={defaultLabelProperty}
          variant="outlined"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

// Entire list on https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
const countries = [
  { code: 'AG', label: 'Antigua y Barbuda', phone: '1-268' },
  { code: 'AR', label: 'Argentina', phone: '54' },
  { code: 'AS', label: 'American Samoa', phone: '1-684' },
  { code: 'AU', label: 'Australia', phone: '61', suggested: true },
  { code: 'BB', label: 'Barbados', phone: '1-246' },
  { code: 'BO', label: 'Bolivia', phone: '591' },
  { code: 'BR', label: 'Brasil', phone: '55' },
  { code: 'BS', label: 'Bahamas', phone: '1-242' },
  { code: 'BZ', label: 'Belice', phone: '501' },
  { code: 'CA', label: 'Canadá', phone: '1', suggested: true },
  { code: 'CH', label: 'Suiza', phone: '41' },
  { code: 'CL', label: 'Chile', phone: '56' },
  { code: 'CO', label: 'Colombia', phone: '57' },
  { code: 'CR', label: 'Costa Rica', phone: '506' },
  { code: 'CU', label: 'Cuba', phone: '53' },
  { code: 'CW', label: 'Curazao', phone: '599' },
  { code: 'DM', label: 'Dominica', phone: '1-767' },
  { code: 'DO', label: 'República Dominicana', phone: '1-809' },
  { code: 'EC', label: 'Ecuador', phone: '593' },
  { code: 'ES', label: 'España', phone: '34' },
  { code: 'GB', label: 'Reino Unido', phone: '44' },
  { code: 'GD', label: 'Granada', phone: '1-473' },
  { code: 'GE', label: 'Georgia', phone: '995' },
  { code: 'GI', label: 'Gibraltar', phone: '350' },
  { code: 'GT', label: 'Guatemala', phone: '502' },
  { code: 'HN', label: 'Honduras', phone: '504' },
  { code: 'IN', label: 'India', phone: '91' },
  { code: 'IT', label: 'Italia', phone: '39' },
  { code: 'JM', label: 'Jamaica', phone: '1-876' },
  { code: 'MX', label: 'México', phone: '52' },
  { code: 'NI', label: 'Nicaragua', phone: '505' },
  { code: 'NL', label: 'Países Bajos', phone: '31' },
  { code: 'PA', label: 'Panamá', phone: '507' },
  { code: 'PE', label: 'Perú', phone: '51' },
  { code: 'PR', label: 'Puerto Rico', phone: '1' },
  { code: 'PY', label: 'Paraguay', phone: '595' },
  { code: 'SV', label: 'El Salvador', phone: '503' },
  { code: 'TT', label: 'Trinidad y Tobago', phone: '1-868' },
  { code: 'US', label: 'United States', phone: '1', suggested: true },
  { code: 'UY', label: 'Uruguay', phone: '598' },
  { code: 'VE', label: 'Venezuela', phone: '58' },
];

export default CountryAutocompleteSelect;
