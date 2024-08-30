interface CreatedOrUploadedBy {
  access_key: string
  custom_id: string
  external_id: string
}

interface LastUpdated {
  updated_at: string
  public_id_updated_at: string
}

export interface CloudinaryResources {
  asset_id: string
  public_id: string
  folder: string
  filename: string
  format: string
  version: number
  resource_type: string
  type: string
  created_at: string
  uploaded_at: string
  bytes: number
  backup_bytes: number
  width: number
  height: number
  aspect_ratio: number
  pixels: number
  url: string
  secure_url: string
  status: string
  access_mode: string
  access_control: null | string
  etag: string
  created_by: CreatedOrUploadedBy
  uploaded_by: CreatedOrUploadedBy
  last_updated: LastUpdated
}
