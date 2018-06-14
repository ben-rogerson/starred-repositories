const rp = require('request-promise')
const cheerio = require('cheerio')

const CHECK_INTERVAL = 10000

const triggerBuild = () => {

  const options = {
    uri: `https://api.netlify.com/build_hooks/5b21957b0733d53a232b842a`,
    method: 'POST',
    body: '',
  }

  rp(options)
    .then(() => {
      console.log('fired off build url')
    })
    .catch(err => {
      console.log(err)
    })

}

exports.handler = async () => {

  let number = 0

  const options = {
    uri: `https://github.com/ben-rogerson?tab=stars`,
    transform: body => cheerio.load(body)
  }

  setInterval(() => {

    rp(options)
      .then($ => {

        const startNumber = $('.UnderlineNav-item.selected .Counter').text().trim()
        console.log(startNumber)

        // If starred number is different, trigger a build
        if (number != 0 && number != startNumber) triggerBuild()

        number = startNumber

      })
      .catch(err => {
        console.log(
          (err.statusCode === 429) ? 'error - github abuse' : err
        )
      })

  }, CHECK_INTERVAL)

}