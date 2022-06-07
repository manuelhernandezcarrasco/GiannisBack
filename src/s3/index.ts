import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import {v4 as uuid} from 'uuid';
import { InternalServerError } from '../error';

const s3 = new aws.S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
})

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET,
        acl: 'public-read',
        metadata: (req, file, cb) => {
            cb(null, {fieldName: file.fieldname});
        },
        key: (req, file, cb) => {
            cb(null, uuid())
        }
    })
}).single('image')

const uploadImage = (req,res,next) => {
    try {
        upload(req,res, error => {
            if(error) {
                console.log(error);
            }
            res.locals.image = req.file.location;
            next()
        })
    } catch (e){
        console.log(e);
        throw new InternalServerError()
    }
}

export { uploadImage }