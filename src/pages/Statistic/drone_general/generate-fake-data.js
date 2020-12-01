import faker from 'faker'
import randomColor from 'randomcolor'
import moment from 'moment'

const droneList = ['Drone 1','Drone 2','Drone 3','Drone 4','Drone 5','Drone 6','Drone 7']
export default function (groupCount = 5, itemCount = 25, daysInPast = 30) {
  let randomSeed = Math.floor(Math.random() * 1000)
  let groups = []
  // List drones name
  for (let i = 0; i < groupCount; i++) {
    groups.push({
      id: `${i + 1}`,
      title: droneList[i],
      rightTitle: faker.name.lastName(),
      bgColor: randomColor({ luminosity: 'light', seed: randomSeed + i })
    })
  }

  let items = []
  // List drones missions
  for (let i = 0; i < itemCount; i++) {
    const startDate = faker.date.recent(daysInPast).valueOf() + (daysInPast * 0.3) * 86400 * 1000
    const startValue = Math.floor(moment(startDate).valueOf() / 10000000) * 10000000
    const endValue = moment(startDate + faker.random.number({ min: 2, max: 20 }) * 15 * 60 * 1000).valueOf()

    items.push({
      id: i + '',
      group: faker.random.number({ min: 1, max: groups.length }) + '',
      title: 'GRUUUu',
      start: startValue,
      end: endValue,
      className: (moment(startDate).day() === 6 || moment(startDate).day() === 0) ? 'item-weekend' : '',
    })
  }

  items = items.sort((a, b) => b - a)

  return { groups, items }
}
