/*
export enum Row {
  A,
  B,
  C,
  D,
}

export enum Col {
  ONE,
  TWO,
  THREE,
  FOUR,
}

// Value Object
export class Seat {
  private readonly row: Row
  private readonly col: Col

  constructor(row: Row, col: Col) {
    this.row = row
    this.col = col
  }

  toString() {
    return `${this.row}-${this.col}`
  }
}
export class CustomerId {
  private readonly id: string

  constructor(id: string) {
    this.id = id
  }
}
export class ScreenId {
  private readonly id: string

  constructor(id: string) {
    this.id = id
  }
}
// Command
export class ReserveSeat {
  readonly customerId: string
  readonly screenId: string
  readonly row: Row
  readonly col: Col

  constructor(customerId: string, screenId: string, row: Row, col: Col) {
    this.customerId = customerId
    this.screenId = screenId
    this.row = row
    this.col = col
  }
}

// Command Handler
export class ReserveSeatHandler {
  private reservations: Reservations
  constructor(reservations: Reservations) {
    this.reservations = reservations
  }

  handleCommand(reserveSeat: ReserveSeat) {
    const customerId = new CustomerId(reserveSeat.customerId)
    const screenId = new ScreenId(reserveSeat.screenId)
    const seat = new Seat(reserveSeat.row, reserveSeat.col)
    const reservation = new Reservation(customerId, screenId, seat)

    this.reservations.save(reservation)

    return "OK"
  }
}

// Aggregate
export class Reservation {
  readonly customerId: CustomerId
  readonly screenId: ScreenId
  readonly seat: Seat

  constructor(customerId: CustomerId, screenId: ScreenId, seat: Seat) {
    this.customerId = customerId
    this.screenId = screenId
    this.seat = seat
  }
}

// Repository
export class Reservations {
  save(reservation: Reservation) {
    return true
  }
}
*/