import mongoose from 'mongoose';
import data from '../Models/data.js';
// {
// 	"level": "error",
// 	"message": "Failed to connect to DB",
//     "resourceId": "server-1234",
// 	"timestamp": "2023-09-15T08:00:00Z",
// 	"traceId": "abc-xyz-123",
//     "spanId": "span-456",
//     "commit": "5e5342f",
//     "metadata": {
//         "parentResourceId": "server-0987"
//     }
// }


export const GetData = async(req,res)=>{
    let query = req.query
    var newquery = {}
    
    for(var i in query){
        if(query[i].length >0){
          var temp = { $regex : query[i] };
          if(i === "metadata"){
             var search = i + ".parentResourceId";
             newquery[search] = temp;
          }else{ 
           
            newquery[i] = temp;
          }
        }

    }
    
    var another = await data.find(newquery);
    // const prettyResult = JSON.stringify(another, null, 2);
    // console.log({prettyResult});
    try{
       res.render('data',{another});
        // return res.json(prettyResult);
    }
    catch(error){
         res.render('data',{message:error.message});
    }
}

export const SaveData = async(req,res)=>{
   var newData = new data({
	"level": "error",
	"message": "Failed to connect to DB",
    "resourceId": "server-1234",
	"timestamp": "2023-09-15T08:00:00Z",
	"traceId": "abc-xyz-123",
    "spanId": "span-456",
    "commit": "5e5342f",
    "metadata": {
        "parentResourceId": "server-0987"
         }
      });
    var Data = newData.save();
      return res.status(200).json({status:"Saved "});
  
}

export const HomePage = async(req,res)=>{
  try{
     res.render('home',{});
  }catch(err){
    res.status(500).send(err.message);
  }
}