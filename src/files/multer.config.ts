import { HttpStatus, Injectable, ParseFilePipeBuilder } from '@nestjs/common'
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express'
import fs from 'fs'
import { diskStorage } from 'multer'
import path, { join } from 'path'
import { RESPONSE_MESSAGE } from '~/constant/message'
@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  getRootPath = () => {
    return process.cwd()
  }
  ensureExists(targetDirectory: string) {
    fs.mkdir(targetDirectory, { recursive: true }, (err) => {
      if (err) {
        console.log(err)
        return
      }
    })
  }
  validateFile(file: Express.Multer.File) {
    const fileTypes = /(jpg|jpeg|png|gif)$/
    const extName = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimeType = fileTypes.test(file.mimetype)
    if (extName && mimeType) {
      return true
    } else {
      return false
    }
  }
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const isValid = this.validateFile(file)
          if (!isValid) {
            return cb(new Error(RESPONSE_MESSAGE.FILE_IS_NOT_VALID), null)
          }
          const folder = req?.headers?.folder_type ?? 'default'
          console.log(isValid)
          this.ensureExists(`public/images/${folder}`)
          cb(null, join(this.getRootPath(), `public/images/${folder}`))
        },
        filename: (req, file, cb) => {
          const extName = path.extname(file.originalname)
          const baseName = path.basename(file.originalname, extName)
          const finalName = `${baseName}-${Date.now()}${extName}`
          cb(null, finalName)
        }
      })
    }
  }
}
