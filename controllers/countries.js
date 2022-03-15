const axios = require('axios')

class CountryController {
  static async all (req, res) {
    try {
      const resp = await axios({
        method: 'GET',
        url:
          'https://gist.githubusercontent.com/herysepty/ba286b815417363bfbcc472a5197edd0/raw/aed8ce8f5154208f9fe7f7b04195e05de5f81fda/coutries.json'
      })

      const { data } = resp

      const countries = data.map(country => {
        return {
          name: country.name,
          region: country.region,
          timezones: country.timezones
        }
      })

      res.status(200).json({
        data: countries,
        message: 'Success',
        status: true
      })
    } catch (err) {
      res.status(500).json({
        message: 'Internal Server Error',
        status: false
      })
    }
  }
}

module.exports = CountryController
