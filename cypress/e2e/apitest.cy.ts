/// <reference types="cypress"/>
 
var rememberBookingId;
var rememberParkingSlot;

describe("API POST-Booking", () => {
  it('Adds Booking', () => {
    cy.request('POST', 'http://localhost:8080/v1/booking', 
    {
      "userId": "1",
      "startDate": "2023-01-29T16:18:21.961080119Z",
      "endDate": "2023-01-29T17:18:21.961080119Z"
    })
    .then(
    (response) => {
      // response.body is automatically serialized into JSON
      //expect(response.body).to.have.property('userId', '3') // true
      expect(response.body).to.include.keys("bookingId")
      expect(response.body).to.include.keys("parkingSlotName")
      rememberBookingId = response.body.bookingId
      rememberParkingSlot = response.body.parkingSlotName
    })
  });


describe("API GET-Booking", () => {
  it("Validate manually added booking", () => {
    const userCredentials = "userId=1"
    cy.request("GET", "http://localhost:8080/v1/booking?"+userCredentials)
    .then(response => {
      cy.log(response.body)
      expect(response.status).to.eq(200)
      expect(response.body).to.have.keys("bookingsByUser")
      expect(response.body.bookingsByUser).length.to.be.greaterThan(0)
      expect(response.body.bookingsByUser[0]).to.include.keys("parkingSlotName")
      expect(response.body.bookingsByUser[0]).to.include.keys("startDate")
      expect(response.body.bookingsByUser[0]).to.include.keys("endDate")
      expect(response.body.bookingsByUser[0].parkingSlotName).to.eq(rememberParkingSlot)
    })
  })
})

})

describe("API DELETE-Booking", () => {
  it('deletes Booking', () => {
    cy.request({
      method: 'DELETE',
      url: 'http://localhost:8080/v1/booking/'+rememberBookingId,
  })
  });
})