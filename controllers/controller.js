const shortid = require('shortid')
const Url = require('../models/Url')
const isValidUrl = require('../utils/util')

// original url route implementation
module.exports.routeOriginal = async (req, res) => {
  try {
    const url = await Url.findOne({ urlId: req.params.urlId })
    if (url) {
      url.clicks++
      url.save()
      return res.redirect(url.origUrl)
    } else res.status(404).json('Not found')
  } catch (err) {
    console.log(err)
    res.status(500).json('Server Error')
  }
}

// original to short url conversion implementation
module.exports.convertOriginalToShort = async (req, res) => {
  const { origUrl } = req.body
  const base = process.env.BASE

  const urlId = shortid.generate()
  if (isValidUrl(origUrl)) {
    try {
      let url = await Url.findOne({ origUrl })
      if (url) {
        res.json(url)
      } else {
        const shortUrl = `${base}/${urlId}`
        url = new Url({
          origUrl,
          shortUrl,
          urlId,
          date: new Date()
        })
        await url.save()
        res.json(url)
      }
    } catch (err) {
      console.log(err)
      res.status(500).json('Server Error')
    }
  } else {
    res.status(400).json('Invalid Original Url')
  }
}

// short to original url implementaion
module.exports.convertShortToOriginal = async (req, res) => {
  const { shortUrl } = req.body
  try {
    res.json(await Url.findOne({ shortUrl }))
  } catch (err) {
    console.log(err)
    res.status(500).json('Server Error')
  }
}
