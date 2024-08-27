export interface ITagConfidence {
  tag: string
  confidence: number
}

export interface IGoogleTagging {
  status: string
  data: ITagConfidence[]
}

export interface ICategorization {
  google_tagging: IGoogleTagging
}

export interface IInfo {
  categorization: ICategorization
}

export interface IAssetInfo {
  id: string
  batchId: string
  asset_id: string
  public_id: string
  version: number
  version_id: string
  signature: string
  width: number
  height: number
  format: string
  resource_type: string
  created_at: string
  tags: string[]
  bytes: number
  type: string
  etag: string
  placeholder: boolean
  url: string
  secure_url: string
  folder: string
  access_mode: string
  info: IInfo
  existing: boolean
  original_filename: string
  path: string
  thumbnail_url: string
}

export interface IEventSuccess {
  event: string
  info: IAssetInfo
}
