  function neighbour(td, offsetX, offsetY) {
    const column = td.cellIndex;
    const row = td.parentElement.rowIndex;
    return document.querySelector(`[data-column="${column + offsetX}"][data-row="${row + offsetY}"]`);
  }

  function incrementNeighbour(td, offsetX, offsetY) {
    const n = neighbour(td, offsetX, offsetY);
    if (n && n.classList.contains('has-mine')) {
      return 1;
    }

    return 0;
  }

  function open(tile) {
    let mines = 0;

    for (let i = -1; i <= 1; i += 1) {
      for (let j = -1; j <= 1; j += 1) {
        if (i !== 0 || j !== 0) {
          mines += incrementNeighbour(tile, i, j);
        }
      }
    }

    if (mines === 0) {
      tile.classList.add('opened');
    } else {
      tile.classList.add(`mine-neighbour-${mines}`);
    }
    tile.classList.remove('unopened');

    if (mines === 0) {
      for (let i = -1; i <= 1; i += 1) {
        for (let j = -1; j <= 1; j += 1) {
          if (i !== 0 || j !== 0) {
            const n = neighbour(tile, i, j);
            if (n && n.classList.contains('unopened')) {
              open(n);
            }
          }
        }
      }
    }

    return mines;
  }

  function openOnClick(event) {
    const tile = event.currentTarget;
    if (tile.classList.contains('has-mine')) {
      document.querySelectorAll('.has-mine').forEach((cell) => {
        cell.classList.remove('has-mine', 'unopened');
        cell.classList.add('mine');
      });
      alert("You lost!");
    } else {
      open(tile);
    }
  }

  function flagOnClick(event) {
    event.preventDefault(); // Do not open context menu!
    const tile = event.currentTarget;
    if (tile.classList.contains('unopened')) {
      tile.classList.add('flagged');
    }
  }
