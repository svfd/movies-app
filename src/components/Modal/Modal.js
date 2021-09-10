import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Overlay from '../Overlay';
import CrossButton from '../CrossButton';

import './Modal.less';

const Modal = ({ title, message, onModalClose }) => {
	return (
		<Fragment>
			<Overlay></Overlay>
			<div className="modal">
				<div className="modal-content">
					<CrossButton className="modal-close" cb={onModalClose} />
					<h2 className="modal-title">{title}</h2>
					<p className="modal-message">{message}</p>
				</div>
			</div>
		</Fragment>			
	);
};

Modal.propTypes = {
	title: PropTypes.string.isRequired,
	message: PropTypes.string.isRequired,
	onModalClose: PropTypes.func.isRequired
};

export default Modal;