import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)

//Implement the fileStogare logic
const s3BucketName = process.env.ATTACHMENT_S3_BUCKET
const urlExpiretion = process.env.SIGNED_URL_EXPIRATION

export class AttachmentUtils{
    constructor(
        private readonly s3 = new XAWS.s3({
            signatureVersion:'v4'})
        }),
        
        private readonly bucketName= s3BucketName
    ){}
    
    
    getAttachmentUrl(todoId: string){
        return `https://${this.bucketName}.s3.amazon.com/${todoId}/`
    }
    
    get
    
}