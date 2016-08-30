import {AdSystem} from 'iab-vast-model'
import createCreative from '../factory/creative'
import createExtension from '../factory/extension'
import createImpression from '../factory/impression'
import isNonEmptyString from '../util/is-non-empty-string'

const hasValue = ($node) => ($node != null && isNonEmptyString($node._value))

export default ($ad, $impl, ad) => {
  ad.id = $ad.id
  ad.sequence = $ad.sequence
  if ($impl.adSystem != null) {
    ad.adSystem = new AdSystem()
    ad.adSystem.name = $impl.adSystem._value
    ad.adSystem.version = $impl.adSystem.version
  }
  if ($impl.impression != null) {
    ad.impressions.push(...$impl.impression
      .filter(hasValue)
      .map(createImpression))
  }
  if ($impl.error != null && hasValue($impl.error)) {
    ad.error = $impl.error._value
  }
  if ($impl.creatives != null && Array.isArray($impl.creatives.creative)) {
    $impl.creatives.creative.map(createCreative).forEach((creative) => {
      ad.creatives.add(creative)
    })
  }
  if ($impl.extensions != null && Array.isArray($impl.extensions.extension)) {
    ad.extensions.push(...$impl.extensions.extension.map(createExtension))
  }
  return ad
}
