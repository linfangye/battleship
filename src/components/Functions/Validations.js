export function checkShipPlacement(coordinate, board, ship) {
  const size = board.length

  if (ship.alignment === 'horizontal' && coordinate.colmun + ship.length > size) {
    return false
  }

  if (ship.alignment === 'vertical' && coordinate.row + ship.length > size) {
    return false
  }

  if (ship.alignment === 'horizontal') {
    for (let i = coordinate.colmun; i < coordinate.colmun + ship.length; i ++) {
      if (board[coordinate.row][i].hasShip) {
        return false
      }
    }
  }

  if (ship.alignment === 'vertical') {
    for (let i = coordinate.row; i < coordinate.row + ship.length; i ++) {
      if (board[i][coordinate.colmun].hasShip) {
        return false
      }
    }
  }

  return true
}

export default { checkShipPlacement }
