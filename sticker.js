const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')

async function createSticker(input, output) {
  return new Promise((resolve, reject) => {
    ffmpeg(input)
      .outputOptions([
        '-vcodec libwebp',
        '-vf scale=512:512:force_original_aspect_ratio=decrease',
        '-loop 0',
        '-preset default'
      ])
      .save(output)
      .on('end', resolve)
      .on('error', reject)
  })
}

module.exports = { createSticker }
