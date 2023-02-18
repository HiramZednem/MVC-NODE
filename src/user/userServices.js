var userModel = require('./userModel');
var key = 'somekey234567884456753456';
var encryptor = require('simple-encryptor')(key);

module.exports.createUserDBService = (userDetails) => {
   return new Promise(function myFn(resolve, reject) {
      userModel.findOne({ email:userDetails.email }, function(err,user){
            if(err){
               reject(false)
            }else if(user){
               reject(false);
            }else{
               var userModelData = new userModel();
               userModelData.firstname = userDetails.firstname;
               userModelData.lastname = userDetails.lastname;
               userModelData.email = userDetails.email;
               var encrypted = encryptor.encrypt(userDetails.password);
               userModelData.password = encrypted;

               userModelData.save(function resultHandle(error, result) {
                   if (error) {
                       reject(false);
                   } else {
                       resolve(true);
                   }
               });
           }

            });
         });
      }

module.exports.loginuserDBService = (userDetails)=>  {
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOne({ email: userDetails.email},function getresult(errorvalue, result) {
         if(errorvalue) {
            reject({status: false, msg: "Datos Invalidos"});
         }
         else {
            if(result !=undefined &&  result !=null) {
               var decrypted = encryptor.decrypt(result.password);

               if(decrypted== userDetails.password) {
                  resolve({status: true,msg: "Usuario Validado"});
               }
               else {
                  reject({status: false,msg: "Falla en validacion de usuario"});
               }
            }
            else {
               reject({status: false,msg: "Detalles de usuario invalido"});
            }
         }
      });
   });
}

module.exports.searchUser = ( userDetails )=> {
   return new Promise( 
      ( resolve, reject ) => {
         userModel.findOne(  { firstname: userDetails.firstname} , (errorvalue, result)=>{
            if(errorvalue) {
               reject({status: false, msg: "Datos Invalidos"});
            } else {
               if(result !=undefined &&  result !=null) {
                  if(result.firstname == userDetails.firstname) {
                     resolve({status: true,msg: `Usuario ${userDetails.firstname} encontrado`});
                  }
                  else {
                     reject({status: false,msg: "Usuario no encontrado"});
                  }
               }
               else {
                  reject({status: false,msg: "Usuario no existente"});
               }
            }
         });
   })   
}

module.exports.updateUser = (userDetails)=>{
   return new Promise(function myFn(resolve, reject)  {
      userModel.findOneAndUpdate(
         {email: userDetails.email},
         {$set:{
            password: encryptor.encrypt(userDetails.password),
            firstname: userDetails.firstname,
            lastname: userDetails.lastname
            }
         },
         {new: true},
         function getresult(errorvalue, result) {
         if(errorvalue) {
            reject({status: false, msg: "Datos Invalidos"});
         }
         else {
            if(result !=undefined &&  result !=null) {
               

               if(result.email = userDetails.email) {
                  resolve({status: true,msg: `Usuario con correo ${ userDetails.email } actualizado`});
               }
            }
            else {
               reject({status: false,msg: `Usuario con correo ${userDetails.email} no existente`});
            }
         }
      });
   });
}


module.exports.deleteUser = ( userDetails ) =>{
   return new Promise( 
      ( resolve, reject ) => {
         userModel.findOneAndDelete(  { firstname: userDetails.firstname } , (errorvalue, result)=>{
            if(errorvalue) {
               reject({status: false, msg: "Datos Invalidos"});
            } else {
               if(result !=undefined &&  result !=null) {
                  if(result.firstname == userDetails.firstname) {
                     resolve({status: true,msg: `Usuario ${userDetails.firstname} eliminado`});
                  }
                  else {
                     reject({status: false,msg: "Usuario no encontrado"});
                  }
               }
               else {
                  reject({status: false,msg: "Usuario no existente"});
               }
            }
         });
   })   
}

