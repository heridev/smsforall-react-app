import _ from '@lodash';
import { useCallback, useState } from 'react';

function useForm(initialState, onSubmit) {
  const [form, setForm] = useState(initialState);

  const handleChange = useCallback(event => {
    event.persist();
    const eventValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setForm(_form =>
      _.setIn(
        { ..._form },
        event.target.name,
        eventValue
      )
    );
  }, []);

  const handleChangeAutocomplete = useCallback((nameField, value) => {
    setForm(_form =>
      _.setIn(
        { ..._form },
        nameField,
        value
      )
    );
  }, []);

  const resetForm = useCallback(() => {
    if (!_.isEqual(initialState, form)) {
      setForm(initialState);
    }
  }, [form, initialState]);

  const setInForm = useCallback((name, value) => {
    setForm(_form => _.setIn(_form, name, value));
  }, []);

  const handleSubmit = useCallback(
    event => {
      if (event) {
        event.preventDefault();
      }
      if (onSubmit) {
        onSubmit();
      }
    },
    [onSubmit]
  );

  return {
    form,
    handleChange,
    handleChangeAutocomplete,
    handleSubmit,
    resetForm,
    setForm,
    setInForm
  };
}

export default useForm;
