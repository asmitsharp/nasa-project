const launches = new Map()

let latestFlightNumber = 100

const launch = {
  flightNumber: 100,
  mission: "Kepler",
  rocket: "Explorer",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  upcoming: true,
  sucess: true,
}

launches.set(launch.flightNumber, launch)

function existLaunchWithId(launchId) {
  return launches.has(launchId)
}

function getAllLaunches() {
  return Array.from(launches.values())
}

function addNewLaunch(launch) {
  latestFlightNumber += 1
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      customer: ["PVT", "NASA"],
      upcoming: true,
      sucess: true,
      flightNumber: latestFlightNumber,
    })
  )
}

function abortLaunchById(launchId) {
  const aborted = launches.get(launchId)
  aborted.upcoming = false
  aborted.sucess = false
  return aborted
}

module.exports = {
  getAllLaunches,
  addNewLaunch,
  existLaunchWithId,
  abortLaunchById,
}
