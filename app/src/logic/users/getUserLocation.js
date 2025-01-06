import { errors } from 'common'

const { SystemError } = errors

export default function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new SystemError('Geolocation is not supported by your browser.'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new SystemError('User denied the request for Geolocation.'))
            break
          case error.POSITION_UNAVAILABLE:
            reject(new SystemError('Location information is unavailable.'))
            break
          case error.TIMEOUT:
            reject(new SystemError('The request to get user location timed out.'))
            break
          default:
            reject(new SystemError('An unknown error occurred.'))
            break
        }
      }
    )
  })
}
