/* eslint-disable no-unreachable */
/* eslint-disable no-useless-catch */
/* eslint-disable no-empty */
import{Client, Account, ID} from "appwrite"
import Config from "../config/Config";

export class AuthService {
    client = new Client()
    account;

    constructor() {
        this.client
        .setEndpoint(Config.appwriteURL)
        .setProject(Config.appwriteProjectId);

        this.account = new Account(this.client)
    }

    async createAccount({Email,Password, Name}){
        try {
          const userAccount =   await this.account.create(ID.unique() ,Email,Password,Name)
          if (userAccount) {
            return this.login
          } else {
            return userAccount
          }
        } catch (error) {
            throw error;
        }

    }

    async login({Email, Password}){
       return await this.account.createEmailSession(Email, Password)

    }

    async getCurrentUser(){
        try {
            return await this.account.get()
            
        } catch (error) {
            throw error
        }
        return null;
    }

    async logOut(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            
        }
    }
}

const authService = new AuthService();

export default authService