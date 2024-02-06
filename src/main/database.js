
import CouchDb from 'node-couchdb';

class Database{
    constructor({user,pass}){
        this.DB_URI = "http://127.0.0.1"
        this.DB_PORT = 5984
        this.DATABASE = new CouchDb({
            auth:{
                user,pass
            }
        })
        
    }

    async existDb(dbName){
        let tmp = await this.listDb();
        return tmp.includes(dbName.toLowerCase())
    }

    // db operations
    async listDb(){
        return await this.DATABASE.listDatabases(res=>res)
    }


    async createDb(dbName){
        if(await this.existDb(dbName.toLowerCase())) throw new Error(`database with name ${dbName.toLowerCase()} already exist`);
        return await this.DATABASE.createDatabase(dbName.toLowerCase())
    }

    async dropDb(dbName){
        if(!await this.existDb(dbName.toLowerCase())) throw new Error(`database with name ${dbName.toLowerCase()} does not exist`);
        return await this.DATABASE.dropDatabase(dbName.toLowerCase())
    }

    async clearDb(){
        try{
            for(let db of await this.listDb()){
                if(!db.startsWith("_")) await this.dropDb(db)
            }
            return {status:"success"};
        }catch(err){
            return {status:"error",message:err.message};
        };
    
    }
       
    async insertItem(dbName,obj){
        if(!await this.existDb(dbName.toLowerCase())) throw new Error(`database with name ${dbName.toLowerCase()} does not exist`);

        const ID = await this.DATABASE.uniqid().then(ids => ids[0]);
        return await this.DATABASE.insert(dbName.toLowerCase(), {...obj,_id:ID}).then(response => response,err=>err).catch(err=>err)    
    }

    async deleteItem(dbName,id,rev){
        return await this.DATABASE.del(dbName,id,rev);
    }

    async findAll(dbName,view="_design/_design/_view/tutti"){
        const res = await this.DATABASE.get(dbName,view)
        return res.data.rows;
    }

    async findByEmployeeId(dbName,employee_id){
        const data = await this.findAll(dbName);
        return data.find(x=>x.key.employee_id == employee_id);
    }

   

    async update(dbName,newObject){
        return await this.DATABASE.update(dbName,newObject);
    }

 
}

export default Database;
