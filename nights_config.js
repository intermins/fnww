let nights = {'Night 1': [15, 10, 10, 15, 8, 45, 25, 35, 6, 2],
              'Night 2': [15, 8, 8, 10, 6, 25, 15, 25, 6, 2],
              'Night 3': [20, 6, 6, 7, 5, 20, 13, 15, 6, 1],
              'Night 4': [20, 5, 5, 6, 5, 20, 18, 12, 6, 0],
              'Night 5': [25, 4, 5, 6, 5, 20, 15, 12, 6, -1],
              'HARD NIGHT': [30, 2, 4, 5, 5, 15, 10, 10, 5, -1]}

let nights_keys = Object.keys(nights);

// flash-count, wednesday-move-chance, thing-move-chance, wednesday-wait-time, thing-wait-time, dead-soul-chance,
// dead-soul-wait-time, phoneguy-move-chance, phoneguy-wait-time, phoneguy-wait