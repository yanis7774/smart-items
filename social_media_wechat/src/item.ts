export type Props = {
  url: string
  name?: string
  bnw: boolean
}

let siteName = 'wechat'
let siteURL = 'wechat.com'
let defaulthover = 'Wechat Group'

let stringsToReplace: string[] = [
  //   'http://',
  //   'https://',
  //   'http:',
  //   'https:',
  //   'www.',
  //   siteURL,
  //   '/',
]

export default class SMedia_Link implements IScript<Props> {
  init() {}

  spawn(host: Entity, props: Props, channel: IChannel) {
    const link = new Entity()
    link.setParent(host)

    if (props.bnw) {
      link.addComponent(new GLTFShape('models/wechat_bnw.glb'))
    } else {
      link.addComponent(new GLTFShape('models/wechat.glb'))
    }

    let url = parseURL(props.url)

    let locationString = props.name ? props.name : defaulthover

    link.addComponent(
      new OnPointerDown(
        async function () {
          openExternalURL(url)
        },
        {
          button: ActionButton.PRIMARY,
          hoverText: locationString,
        }
      )
    )
  }
}

export function parseURL(url: string) {
  let newURL = url.trim()

  for (let str of stringsToReplace) {
    if (newURL.substr(0, str.length) == str) {
      newURL = newURL.substring(str.length).trim()
    }
  }

  //let finalURL = 'https://www.' + siteURL + '/' + newURL
  let finalURL = newURL

  return finalURL
}
