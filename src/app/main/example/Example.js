import DemoContent from '@fuse/core/DemoContent';
import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const useStyles = makeStyles(theme => ({
	layoutRoot: {}
}));

const ExamplePage = props => {
	const classes = useStyles(props);
	const { t } = useTranslation('examplePage');
  const [count, mifunctionseteadorcount] = useState(34);

	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			header={
				<div className="p-24">
					<h4>{t('TITLE')}</h4>
				</div>
			}
			contentToolbar={
				<div className="px-24">
					<h4>Content Toolbar</h4>
				</div>
			}
			content={
        <div className="p-24">
          <button onClick={() => mifunctionseteadorcount(count + 26)}>
            Click me
          </button>
          <h4>counter - {count}</h4>
          <br />
          <DemoContent />
        </div>
			}
		/>
	);
}

export default ExamplePage;
