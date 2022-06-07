import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
import  {v4 as uuid} from 'uuid'

// const s3 = new S3Client({
//     region:' sa-east-1',
    
// })

const uploadImage = (req,res,next) => {
    res.locals.imageID = uuid()
    const upload = multer({
        storage: multerS3({
            s3: new aws.S3({
                accessKeyId: process.env.S3_ACCESS_KEY_ID,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
            }),
            bucket: process.env.S3_BUCKET,
            acl: 'public-read',
            metadata: (req, file, cb) => {
                console.log("metadata")
                cb(null, {fieldName: file.fieldname});
            },
            key: (req, file, cb) => {
                console.log("key")
                cb(null, res.locals.imageID)
            }
        })
    })

    upload.single('image')
    next()
}


export { uploadImage }