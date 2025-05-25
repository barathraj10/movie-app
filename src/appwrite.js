import {Client, Query,ID,Databases} from 'appwrite'

const project_id=import.meta.env.VITE_APPWRITE_PROJECT_ID;
const database_id=import.meta.env.VITE_APPWRITE_DATABASE;
const collection_id=import.meta.env.VITE_APPWRITE_COLLECTION_ID;

const client=new Client()
 .setEndpoint('https://cloud.appwrite.io/v1')
 .setProject(project_id)

 const database=new Databases(client);



export const updateCount=async (searchTerm, movie)=>{
    try{
        const result= await database.listDocuments(database_id, collection_id, [Query.equal('searchTerm',searchTerm)]);
        if(result.documents.lenght>0){
            const doc=result.documents[0];

            await database.updateCount(database_id,collection_id,doc.$id,{count:doc.count+1});
        }
        else{
            await database.createDocument(database_id,collection_id,ID.unique(),{
                searchTerm,
                count:1,
                movie_id:movie.id,
                poster_url:`https://tmdb.org/t/p/w500${movie.poser_path}`
            });
        }
    }
    catch(error){
        console.log(error);
    }
}