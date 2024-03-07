/* eslint-disable no-unused-vars */
import{Client, Account, ID, Databases, Storage, Query} from "appwrite"
import Config from "../config/Config";

export class Services {
    client = new Client()
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(Config.appwriteURL)
        .setProject(Config.appwriteProjectId);

        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                Config.appwriteDatabaseId,
                Config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log('error',error)
        }
    }

    async updatePost( slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                Config.appwriteDatabaseId,
                Config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                    
                }
            )
        } catch (error) {
            console.log('error',error)
        }
    }

    async deletePost (slug){
        try {
            await this.databases.deleteDocument(
                Config.appwriteDatabaseId,
                Config.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log('error',error)
            return false
        }

    }

    async getPost(slug){
        try {
           return await this.databases.getDocument(
                Config.appwriteDatabaseId,
                Config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log('error',error)
            return false
        }
    }

    // file upload method (storage)

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                Config.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log('error',error)
            return false
            
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                Config.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log('error',error)
            return false
            
        }
    }

    getFilePreview(fileId){
       return this.bucket.getFilePreview(
        Config.appwriteBucketId,
            fileId
        )
    }

}

const service = new Services();
export default service

