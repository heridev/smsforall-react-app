import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useState } from 'react';

const TextMessageListToolbar = props => {
  const selectedMailIds = [];
  const mails = [];
  const labels = [];
  const folders = [];

  const [menu, setMenu] = useState({
    selectMenu: null,
    foldersMenu: null,
    labelsMenu: null
  });

  function handleMenuOpen(event, _menu) {
    setMenu({
      ..._menu,
      [_menu]: event.currentTarget
    });
  }

  function handleMenuClose(event, _menu) {
    setMenu({
      ..._menu,
      [_menu]: null
    });
  }

  function handleCheckChange(event) {
    return event.target.checked
      ? () => {
          alert('select all messages');
        }
      : () => {
          alert('Deselect all messages');
        };
  }

  return (
    <div className="flex flex-1 items-center sm:px-8">
      <Checkbox
        onChange={handleCheckChange}
        checked={selectedMailIds.length === Object.keys(mails).length && selectedMailIds.length > 0}
        indeterminate={selectedMailIds.length !== Object.keys(mails).length && selectedMailIds.length > 0}
      />

      <IconButton
        className=""
        size="small"
        aria-label="More"
        aria-owns={menu.select ? 'select-menu' : null}
        aria-haspopup="true"
        onClick={ev => handleMenuOpen(ev, 'select')}
      >
        <Icon>arrow_drop_down</Icon>
      </IconButton>

      <Menu
        id="select-menu"
        anchorEl={menu.select}
        open={Boolean(menu.select)}
        onClose={ev => handleMenuClose(ev, 'select')}
      >
        <MenuItem
          onClick={ev => {
            console.log('menu item onClick');
            handleMenuClose(ev, 'select');
          }}
        >
          All
        </MenuItem>
        <MenuItem
          onClick={ev => {
            console.log('menu item onClick');
            handleMenuClose(ev, 'select');
          }}
        >
          None
        </MenuItem>
        <MenuItem
          onClick={ev => {
            console.log('menu item onClick');
            handleMenuClose(ev, 'select');
          }}
        >
          Read
        </MenuItem>
        <MenuItem
          onClick={ev => {
            console.log('menu item onClick');
            handleMenuClose(ev, 'select');
          }}
        >
          Unread
        </MenuItem>
        <MenuItem
          onClick={ev => {
            console.log('menu item onClick');
            handleMenuClose(ev, 'select');
          }}
        >
          Starred
        </MenuItem>
        <MenuItem
          onClick={ev => {
            console.log('menu item onClick');
            handleMenuClose(ev, 'select');
          }}
        >
          Unstarred
        </MenuItem>
        <MenuItem
          onClick={ev => {
            console.log('menu item onClick');
            handleMenuClose(ev, 'select');
          }}
        >
          Important
        </MenuItem>
        <MenuItem
          onClick={ev => {
            console.log('menu item onClick');
            handleMenuClose(ev, 'select');
          }}
        >
          Unimportant
        </MenuItem>
      </Menu>

      {selectedMailIds.length > 0 && (
        <>
          <div className="border-r-1 h-48 w-1 mx-12 my-0" />

          <IconButton onClick={ev => console.log('IconButton log')} aria-label="Delete">
            <Icon>delete</Icon>
          </IconButton>

          <IconButton
            aria-label="More"
            aria-owns={menu.folders ? 'folders-menu' : null}
            aria-haspopup="true"
            onClick={ev => handleMenuOpen(ev, 'folders')}
          >
            <Icon>folder</Icon>
          </IconButton>

          <Menu
            id="folders-menu"
            anchorEl={menu.folders}
            open={Boolean(menu.folders)}
            onClose={ev => handleMenuClose(ev, 'folders')}
          >
            {folders.length > 0 &&
              folders.map(folder => (
                <MenuItem
                  onClick={ev => {
                    console.log('MenuItem log');
                    handleMenuClose(ev, 'folders');
                  }}
                  key={folder.id}
                >
                  {folder.title}
                </MenuItem>
              ))}
          </Menu>

          <IconButton
            aria-label="More"
            aria-owns={menu.labels ? 'labels-menu' : null}
            aria-haspopup="true"
            onClick={ev => handleMenuOpen(ev, 'labels')}
          >
            <Icon>label</Icon>
          </IconButton>

          <Menu
            id="folders-menu"
            anchorEl={menu.labels}
            open={Boolean(menu.labels)}
            onClose={ev => handleMenuClose(ev, 'labels')}
          >
            {labels.length > 0 &&
              labels.map(label => (
                <MenuItem
                  onClick={ev => {
                    console.log('labels MenuItem log');
                    handleMenuClose(ev, 'labels');
                  }}
                  key={label.id}
                >
                  {label.title}
                </MenuItem>
              ))}
          </Menu>
        </>
      )}
    </div>
  );
};

export default TextMessageListToolbar;
