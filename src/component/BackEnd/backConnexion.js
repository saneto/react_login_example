import  * as conf from '../../const/params';
import axios from "axios";

export default class BackConnexion{
    constructor(){
        this.authListener = {}
    }

    dosignWithEmailAndPassword = (data, uri) =>{
        data.email = "feige@gmail.com";
        data.password = "password";
        
        return new Promise((resolve, reject) => { resolve(axios.post(
           "http://localhost:8081/login",
            {
                "email": data.email,
                "password" : data.password
            }).then(response=> {

                if(response.status === 200){
                    console.log(response.data)
                    data = {
                        token : response.data
                    }
                     localStorage.setItem('authUser',  JSON.stringify(data)  )
                }else{
                    ///reject( console.log(response.data));
                }
            }).catch(error =>{
                reject( console.log(error));
            })) });
    }

    onlogOut = data =>{
        axios.post(
            conf["url"]+conf["path"]['logout'],
            {
                data : data
            }.then(response=> {
                if(response.status === 200){
                    localStorage.setItem('authUser', null)
                }else{
                    return null;
                }
            }).catch(error =>{
                console.log(error);
            })
        )
    }

    callPost = (data, uri) =>{
        axios.post(
            conf["url"]+conf["path"][uri],
            {
                Data : data
            }.then(response=> {
                if(response.status === 200){
                    return data;
                }else{
                    return null;
                }
            }).catch(error =>{
                console.log(error);
                return error;
            })
        )
    }



}