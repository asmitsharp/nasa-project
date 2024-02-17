const {
  getAllLaunches,
  addNewLaunch,
  existLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model")

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches())
}

async function httpAddNewLaunches(req, res) {
  const launch = req.body
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Missing required launch property",
    })
  }
  launch.launchDate = new Date(launch.launchDate)
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid Launch Date",
    })
  }
  addNewLaunch(launch)
  return res.status(201).json(launch)
}

async function httpAbortLaunch(req, res) {
  const launchId = Number(req.params.id)

  if (!existLaunchWithId(launchId)) {
    return res.status(404).json({
      error: "Launch Not Found",
    })
  }

  const aborted = abortLaunchById(launchId)
  return res.status(200).json(aborted)
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunches,
  httpAbortLaunch,
}
