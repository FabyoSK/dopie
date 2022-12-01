import {Command} from '@oclif/core'

import * as cheerio from 'cheerio'
import * as fs from 'node:fs'
const fetch = require('node-fetch')

import {File} from 'megajs'

export default class Ep extends Command {
  static description = 'Download a given episode'

  static examples = [
    '$ dopie ep 1042 hd',
  ]

  static flags = {}

  static args = [
    {
      name: 'episode',
      description: 'Desire episode to download',
      required: true,
    },
    {
      name: 'quality',
      description: 'Desire quality to download',
      required: true,
    },
  ]

  async run(): Promise<void> {
    const OPEX_URL = 'https://onepieceex.net'
    const {args} = await this.parse(Ep)

    this.log(`Getting Episode ${args.episode} information... 🏴‍☠️`)
    const onePieceExPage = await this.fetchPage(`${OPEX_URL}/episodio-${args.episode}`)

    let downloadPagePath
    switch (args.quality) {
    case 'hd':
      this.log('Getting Download link for HD quality 👀')
      downloadPagePath = this.getDownloadHDLinkPage(cheerio.load(onePieceExPage))
      break
    case 'sd':
      this.log('Getting Download link for SD quality 👀')
      downloadPagePath = this.getDownloadSDLinkPage(cheerio.load(onePieceExPage))
      break
    default:
      this.logToStderr('Invalid quality ❌')
      this.exit(1)
      break
    }

    const onePieceExDownloadPage = await this.fetchPage(`${OPEX_URL}/${downloadPagePath}`)

    const $ = cheerio.load(onePieceExDownloadPage)
    const megaDownloadLink = $('noscript').text()

    await this.downloadMegaFile(megaDownloadLink)
  }

  async fetchPage(url: string): Promise<string> {
    const response = await fetch(url)
    return response.text()
  }

  getDownloadHDLinkPage($: cheerio.CheerioAPI): string | undefined {
    return $('#post > article > nav > ul > li:nth-child(3) > div > a:nth-child(3)').attr('href')
  }

  getDownloadSDLinkPage($: cheerio.CheerioAPI): string | undefined {
    return $('#post > article > nav > ul > li:nth-child(4) > div > a:nth-child(2)').attr('href')
  }

  async downloadMegaFile(url: string): Promise<void> {
    const file = File.fromURL(url)

    await file.loadAttributes()
    this.log(`Downloading ${file.name} on ${process.cwd()} 🥰`)

    let totalDownloaded = 0

    const stream = file.download({})
    stream.pipe(fs.createWriteStream(file.name || ''))
    stream.on('data', data => {
      totalDownloaded += data.length
      this.log(`Downloading ${this.formatBytes(totalDownloaded)} of ${this.formatBytes(Number(file.size))} mb (${(totalDownloaded / Number(file.size) * 100).toFixed(2)}%) ⌛️`)
    })
    stream.on('end', () => this.log(`Downloaded successful ${file.name} 🫡`))
    stream.on('error', error => this.logToStderr(error.message))
  }

  formatBytes(bytes: number, decimals = 2): string {
    if (!Number(bytes)) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${Number.parseFloat((bytes / (k ** i)).toFixed(dm))} ${sizes[i]}`
  }
}
