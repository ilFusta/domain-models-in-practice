//IDs
export class CustomerId {
  private readonly id: string

  constructor(id: string) {
    this.id = id
  }

  Value(): string {
    return this.id
  }

  Equal(customerId: CustomerId) {
    return this.id === customerId.Value()
  }
}

export class ScreeningId {
  private readonly id: string

  constructor(id: string) {
    this.id = id
  }

  Value(): string {
    return this.id
  }

  Equal(screeningId: ScreeningId) {
    return this.id === screeningId.Value()
  }
}

export class MovieId {
  private readonly id: string

  constructor(id: string) {
    this.id = id
  }

  Value(): string {
    return this.id
  }

  Equal(movieId: MovieId) {
    return this.id === movieId.Value()
  }
}

export class SeatId {
  private readonly id: string

  constructor(row: string, col: string) {
    //TODO: implementing the romm and chek if this is a valid combination for that specific room
    this.id = row + col
  }

  Value(): string {
    return this.id
  }

  Equal(seatId: SeatId) {
    return this.id === seatId.Value()
  }
}

//Domain
export class Customer {
  private id: CustomerId
  private name: string

  constructor(id: string, name: string) {
    this.id = new CustomerId(id)
    this.name = name
  }

  Name(): string {
    return this.name
  }

  Id(): CustomerId {
    return this.id
  }
}

export class Movie {
  private id: MovieId
  private title: string

  constructor(id: string, title: String) {
    this.id = new MovieId(id)
    this.title = title
  }

  Title(): string {
    return this.title
  }

  Id(): MovieId {
    return this.id
  }
}

export class Seat {
  private id: SeatId

  constructor(row: string, col: string) {
    this.id = new SeatId(row, col)
  }

  Id(): SeatId {
    return this.id
  }
}

export class ReservedSeat {
  private id: SeatId
  private reservedBy: CustomerId

  constructor(seatId: SeatId, customerId: CustomerId) {
    this.id = seatId
    this.reservedBy = customerId
  }

  Id(): SeatId {
    return this.id
  }

  ReservedBy(): CustomerId {
    return this.reservedBy
  }
}

export class Screening {
  private id: ScreeningId
  private movie: Movie
  private playTime: Date
  private seats: Seat[]
  private reservedSeats: ReservedSeat[]

  constructor(id: string, movie: Movie, playTime: Date, allSeats: Seat[], reservedSeats: ReservedSeat[]) {
    this.id = new ScreeningId(id)
    this.movie = movie
    this.playTime = playTime
    this.seats = allSeats
    this.reservedSeats = reservedSeats
  }

  MovieTitle(): string {
    return this.movie.Title()
  }

  PlayTime(): Date {
    return this.playTime
  }

  Id(): ScreeningId {
    return this.id
  }

  AvailableSeats(): Seat[] {
    const availableSeats = this.seats.filter(
      (item: Seat) => !this.reservedSeats.some((resItem: ReservedSeat) => item.Id().Equal(resItem.Id()))
    )
    return availableSeats
  }

  Reserve(seatId: SeatId, customerID: CustomerId): string {
    if (this.reservedSeats.some((item: ReservedSeat) => item.Id().Equal(seatId))) {
      throw new Error("Seat already reserved")
    }
    if (!this.seats.some((item: Seat) => item.Id().Equal(seatId))) {
      throw new Error("Seat not valid")
    }
    this.reservedSeats.push(new ReservedSeat(seatId, customerID))
    return "Ok"
  }
}

//Repositories
export class Screenings {
  private readonly screenings: Screening[]

  constructor(screenings: Screening[]) {
    this.screenings = screenings
  }

  All() {
    return this.screenings
  }

  ById(screeningId: ScreeningId): Screening {
    const screening: Screening | undefined = this.screenings.find((item) => item.Id().Equal(screeningId))
    if (!screening) {
      throw Error("Screening Not Found")
    }
    return screening
  }

  Save(screening: Screening): string {
    return "Ok"
  }
}

export class Customers {
  private readonly customers: Customer[]

  constructor(customers: Customer[]) {
    this.customers = customers
  }

  All() {
    return this.customers
  }

  ById(customerId: CustomerId): Customer {
    const customer: Customer | undefined = this.customers.find((item) => item.Id().Equal(customerId))
    if (!customer) {
      throw Error("Customer Not Found")
    }
    return customer
  }

  Save(customer: Customer): string {
    return "Ok"
  }
}

export class Seats {
  private readonly seats: Seat[]

  constructor(seats: Seat[]) {
    this.seats = seats
  }

  All() {
    return this.seats
  }

  ById(seatId: SeatId): Seat {
    const seat: Seat | undefined = this.seats.find((item) => item.Id().Equal(seatId))
    if (!seat) {
      throw Error("Seat Not Found")
    }
    return seat
  }

  Save(seat: Seat): string {
    return "Ok"
  }
}

//Commands
export class Reserve {
  readonly screeningId: ScreeningId
  readonly customerId: CustomerId
  readonly seats: SeatId[]

  constructor(screeningId: ScreeningId, customerId: CustomerId, seats: SeatId[]) {
    this.screeningId = screeningId
    this.customerId = customerId
    this.seats = seats
  }
}

//handlers
export class ReservationHandler {
  private readonly customers: Customers
  private readonly screenings: Screenings

  constructor(customers: Customers, screenings: Screenings) {
    this.customers = customers
    this.screenings = screenings
  }

  //TODO: make it generic or create different signatures per command type (ex. CancelReservation)
  Handle(command: Reserve): string {
    const customer = this.customers.ById(command.customerId)
    const screening = this.screenings.ById(command.screeningId)
    command.seats.forEach((item) => {
      screening.Reserve(item, customer.Id())
    })
    return this.screenings.Save(screening)
  }
}
