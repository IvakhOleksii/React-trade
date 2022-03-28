import React, { useRef } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";

/**
 * @typedef {object} Modal
 * @property {boolean} open
 * @property {() => void} handleClose
 * @property {string} [title]
 * @property {import('react').CSSProperties} [contentDivStyle]
 * @property {import('react').ReactNode} [children]
 */

/**
 * @param {Modal} props
 */
function Modal(props) {
  const { open, title, handleClose, contentDivStyle, children, ...rest } =
    props;
  const ref = useRef(null);

  useOutsideClick(ref, handleClose);

  return open ? (
    <div className="bids-modal-container" {...rest}>
      <div ref={ref} className="bids-modal-content" style={contentDivStyle}>
        {title && (
          <div className="bids-modal-title bids-modal-header">
            <span>{title}</span>
            <span className="bids-modal-close" onClick={handleClose}>
              X
            </span>
          </div>
        )}
        {children}
      </div>
    </div>
  ) : null;
}

export default Modal;
