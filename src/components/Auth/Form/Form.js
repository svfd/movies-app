import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Form.less';

const Form = ({ onSubmitForm, errorMessage, isShowSecondPassword, ...props }) => {

	const [ email, setEmail ] = useState('');
	const [ firstPassword, setFirstPassword ] = useState('');
	const [ secondPassword, setSecondPassword ] = useState('');

	const { currentType, currentText, newType, setType } = props;

	const _onSubmitForm = (evt) => {
		evt.preventDefault();

		onSubmitForm(email, firstPassword, secondPassword);
	};

	return (
		<section className="auth">
			<div className="container">
				<form className="auth-form" onSubmit={_onSubmitForm}>
					<h3 className="auth-form-title">{currentType}</h3>
					<p className="auth-form-field-wrap">
						<input className="auth-form-field auth-form-field-email" type="email" placeholder="email" onChange={(evt) => setEmail(evt.target.value)} value={email} required />
					</p>
					<p className="auth-form-field-wrap">
						<input className="auth-form-field auth-form-field-password" type="password" placeholder="password" onChange={(evt) => setFirstPassword(evt.target.value)} value={firstPassword} required />
					</p>
					{isShowSecondPassword &&
						<p className="auth-form-field-wrap">
							<input className="auth-form-field auth-form-field-password" type="password" placeholder="repeat password" onChange={(evt) => setSecondPassword(evt.target.value)} value={secondPassword} required />
						</p>
					}
					<button className="auth-form-submit-button">
						Submit
					</button>
					<p className="auth-form-notice">{currentText}
						<button className="auth-form-change"
										onClick={() => setType(newType)}
										type="button"
										data-testid="change-form-type"
						>
							{newType}
						</button>
					</p>
					{errorMessage &&
						<span className="auth-form-error">{errorMessage}</span>
					}
				</form>
			</div>
		</section>
	);
};

Form.propTypes = {
	onSubmitForm: PropTypes.func.isRequired,
	errorMessage: PropTypes.string,
	isShowSecondPassword: PropTypes.bool.isRequired,
	currentType: PropTypes.string.isRequired,
	currentText: PropTypes.string.isRequired,
	newType: PropTypes.string.isRequired,
	setType: PropTypes.func.isRequired
};

export default Form;