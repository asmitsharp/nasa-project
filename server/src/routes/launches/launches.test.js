const request = require("supertest")
const app = require("../../app")
const { mongoConnect, mongoDisconnect } = require("../../services/mongo")

describe("Launches API", () => {
  beforeAll(async () => {
    await mongoConnect()
  })

  afterAll(async () => {
    await mongoDisconnect()
  })

  describe("Test /GET launches", () => {
    test("should respond with sucess status code of 200", async () => {
      const response = await request(app)
        .get("/launches")
        .expect(200)
        .expect("Content-Type", /json/)
    })
  })

  describe("Test /POST launches", () => {
    const completeLaunchData = {
      mission: "Oneweb",
      rocket: "PSLV-C59",
      target: "Kepler-62 f",
      launchDate: "January 4, 2028",
    }

    const completeLaunchDataInvalidDate = {
      mission: "Oneweb",
      rocket: "PSLV-C59",
      target: "Kepler-62 f",
      launchDate: "Invalid",
    }

    const launchDataWithoutDate = {
      mission: "Oneweb",
      rocket: "PSLV-C59",
      target: "Kepler-62 f",
    }

    test("should respond with 201 created", async () => {
      const response = await request(app)
        .post("/launches")
        .send(completeLaunchData)
        .expect("Content-Type", /json/)
        .expect(201)

      const requestDate = new Date(completeLaunchData.launchDate).valueOf()
      const responseDate = new Date(response.body.launchDate).valueOf()

      expect(responseDate).toBe(requestDate)

      expect(response.body).toMatchObject(launchDataWithoutDate)
    })

    test("should catch missing required properties", async () => {
      const response = await request(app)
        .post("/launches")
        .send(launchDataWithoutDate)
        .expect("Content-Type", /json/)
        .expect(400)

      expect(response.body).toStrictEqual({
        error: "Missing required launch property",
      })
    })

    test("should catch invalid dates", async () => {
      const response = await request(app)
        .post("/launches")
        .send(completeLaunchDataInvalidDate)
        .expect("Content-Type", /json/)
        .expect(400)

      expect(response.body).toStrictEqual({
        error: "Invalid Launch Date",
      })
    })
  })
})
