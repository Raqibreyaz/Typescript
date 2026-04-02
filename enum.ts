enum Direction1 {
  Up,
  Down,
  Left,
  Right,
}

enum Direction2 {
  Up = "UP",
  Down = "Down",
  Left = "Left",
  Right = "Right",
}

type Up = keyof (typeof Direction1)[Direction1.Up];

const up: Up = 52;
