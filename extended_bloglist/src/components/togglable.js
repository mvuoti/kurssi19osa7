// eslint-disable-next-line no-unused-vars
const React = require('react');
const {useState, forwardRef, useImperativeHandle} = require('react');

const linebreak = <br/>;

const Togglable = forwardRef(
    ({children, buttonTextWhenClosed, buttonTextWhenOpen}, ref) => {
      const [isOpen, setIsOpen] = useState(false);

      const doToggle = () => setIsOpen(!isOpen);
      const doShow = () => setIsOpen(true);
      const doHide = () => setIsOpen(false);

      useImperativeHandle(ref, () => ({
        doToggle, doShow, doHide,
      }));

      const buttonLabel = isOpen ? buttonTextWhenOpen : buttonTextWhenClosed;
      const button = <button onClick={doToggle}>{buttonLabel}</button>;
      const childContainerStyle = {display: isOpen ? 'block' : 'none'};
      const togglableContent =
        <div style={childContainerStyle}>{children}{linebreak}</div>;
      return <div>{togglableContent}{button}</div>;
    });

export default Togglable;
