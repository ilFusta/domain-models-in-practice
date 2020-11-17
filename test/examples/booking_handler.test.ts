/*
import { expect } from "chai"
import { ReserveSeat, ReserveSeatHandler, Row, Col, Reservations } from "../../src/seat"

describe("A Customer reserves specific seats at a specific screening (for simplicity, assume there exists only one screening for the time beeing). If availble, the seats should be reserved.", () => {
  it("should reserve a available seat", async () => {
    const command = new ReserveSeat("customer1", "screen1", Row.A, Col.ONE)
    const repository = new Reservations()
    const commandHandler = new ReserveSeatHandler(repository)

    const res = commandHandler.handleCommand(command)

    expect(res).eql("OK")
  })
})
*/
