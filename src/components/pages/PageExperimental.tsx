import { User } from '../User';
import { useState, useRef, useEffect } from 'react';
import { useAppSelector } from '../../hooks/reduxHooks';
import TextField from '@mui/material/TextField';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper'
import MenuList from '@mui/material/MenuList';
import Popper from '@mui/material/Popper';
import Grow from '@mui/material/Grow';
import { ClickAwayListener } from '@mui/material';

export function PageExperimental() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleInputKeyDown(event: React.KeyboardEvent) {
    console.log(event.key)
    if (event.key === 'ArrowDown') {
      menuRef.current?.focus()
    }
  }
  function handleInputKeyUp(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      anchorRef.current?.blur();
    }

  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  /*
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);
  */

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <TextField
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={handleInputKeyDown}
          //onKeyUp={handleInputKeyUp}
        />
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem

                    ref={menuRef}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                   // style={{'outline': 'none !important'}}
                  //  onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleClose} >Profile</MenuItem>
                    <MenuItem onClick={handleClose} >My account</MenuItem>
                    <MenuItem onClick={handleClose} >Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}
