Guidelines, usage of components, tricks in general
==================================================


### ButtonSubmitWithLoaderSpinner
```
src/app/common/ButtonSubmitWithLoaderSpinner.js
```

There is a button you can use to submit a form or an action and it will show a loading spinner while making the request, so it is pretty cool.

The way to use it is basically like this:

You import the stateless/functional component:
```
import ButtonSubmitWithLoaderSpinner from 'app/common/ButtonSubmitWithLoaderSpinner';
```

In order to make it disable you need to declara your own logic in your component, for eg:
```
  const disableCheckerFn = () => {
    return !isFormValid() || props.isLoadingSpinnerVisible;
  };
```

You also need to listen for the site loadin spinner attribute, it can be done with something like this:
```
import { connect } from 'react-redux';

const mapDispatchToProps = dispatch => {
  return {
     ...yourlogic..
  };
};

const mapStateToProps = state => {
  return {
    isLoadingSpinnerVisible: state.fuse.site.is_loading_spinner_visible
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
```

And finally just including it in the right place in your component:
```
<ButtonSubmitWithLoaderSpinner disableCheckerFn={disableCheckerFn} />
```

### American country search and select, dropdown component
```
src/app/common/CountryAutocompleteSelect.js
```

In case you want to show the country for any specific number and allow users to select them, you can take a look at that one and re-use it everywhere

## This is a great example about showing a loading spinner in a component while making a request to the API

```
import { showLoadingSpinner } from 'app/store/actions/fuse/site.actions';

import FuseLoading from '@fuse/core/FuseLoading';


  useEffect(() => {
    dispatch(showLoadingSpinner());
    dispatch(getSmsMobileHubCollection());
  }, [dispatch]);

  if (props.isLoadingSpinnerVisible) return <FuseLoading />;
```
