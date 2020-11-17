import { expect } from "chai"
import {
  Customer,
  Movie,
  Screening,
  Seat,
  ReservedSeat,
  Reserve,
  SeatId,
  Customers,
  CustomerId,
  Screenings,
  Seats,
  ScreeningId,
  ReservationHandler,
} from "../../src/domain"

describe("A Customer reserves specific seats at a specific screening (for simplicity, assume there exists only one screening for the time beeing). If availble, the seats should be reserved.", () => {
  //Mock Data
  const customers: Customers = new Customers([
    new Customer("customer1", "Jay"),
    new Customer("customer2", "Silent Bob"),
    new Customer("customer3", "Dante Hicks"),
  ])

  const seats: Seats = new Seats([
    new Seat("A", "1"),
    new Seat("A", "2"),
    new Seat("A", "3"),
    new Seat("B", "1"),
    new Seat("B", "2"),
    new Seat("B", "3"),
    new Seat("C", "1"),
    new Seat("C", "2"),
    new Seat("C", "3"),
  ])

  const reservedSeats: ReservedSeat[] = [
    new ReservedSeat(new SeatId("A", "3"), new CustomerId("customer1")),
    new ReservedSeat(new SeatId("C", "2"), new CustomerId("customer2")),
  ]

  const screenings: Screenings = new Screenings([
    new Screening("screening1", new Movie("movie1", "Clerks"), new Date(), seats.All(), reservedSeats),
  ])

  //Tests
  it("should reserve some available seats", async () => {
    const newseats: SeatId[] = [new SeatId("A", "1"), new SeatId("A", "2")]
    const command: Reserve = new Reserve(new ScreeningId("screening1"), new CustomerId("customer3"), newseats)

    const commandHandler: ReservationHandler = new ReservationHandler(customers, screenings)

    const result = commandHandler.Handle(command)

    expect(result).eql("Ok")
  })

  it("should throw error Seat already reserved", async () => {
    const newseats: SeatId[] = [new SeatId("A", "3")]
    const command: Reserve = new Reserve(new ScreeningId("screening1"), new CustomerId("customer3"), newseats)

    const commandHandler: ReservationHandler = new ReservationHandler(customers, screenings)

    expect(commandHandler.Handle(command)).to.throw(new Error("Seat already reserved"))
  })

  it("should throw error Seat not valid", async () => {
    const newseats: SeatId[] = [new SeatId("A", "3")]
    const command: Reserve = new Reserve(new ScreeningId("screening1"), new CustomerId("customer3"), newseats)

    const commandHandler: ReservationHandler = new ReservationHandler(customers, screenings)

    expect(commandHandler.Handle(command)).to.throw(new Error("Seat not valid"))
  })
})
