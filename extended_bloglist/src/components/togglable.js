// eslint-disable-next-line no-unused-vars
import React from 'react';
import {useState, forwardRef, useImperativeHandle} from 'react';
import {Button, Icon} from 'semantic-ui-react';

const linebreak = <br/>;

const Togglable = forwardRef(
  ({
    children,
    buttonTextWhenClosed, buttonTextWhenOpen,
    iconNameWhenOpen, iconNameWhenClosed,
    toggleDataCy,
  }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const doToggle = () => setIsOpen(!isOpen);
    const doShow = () => setIsOpen(true);
    const doHide = () => setIsOpen(false);

    useImperativeHandle(ref, () => ({
      doToggle, doShow, doHide,
    }));

    const buttonLabel = isOpen ? buttonTextWhenOpen : buttonTextWhenClosed;
    const iconName = isOpen ? iconNameWhenOpen : iconNameWhenClosed;
    const icon = iconName ? <Icon name={iconName} /> : <></>;
    const button = <Button data-cy={toggleDataCy} onClick={doToggle}>{icon}{buttonLabel}</Button>;
    const childContainerStyle = {display: isOpen ? 'block' : 'none'};
    const togglableContent =
      <div style={childContainerStyle}>{children}{linebreak}</div>;
    return <div>{togglableContent}{button}</div>;
  });

export default Togglable;
