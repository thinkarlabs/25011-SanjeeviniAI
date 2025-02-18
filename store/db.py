from fastapi import  HTTPException, status
from pymongo import MongoClient
from dotenv import load_dotenv
import os,uuid,json
import dns.resolver

dns.resolver.default_resolver=dns.resolver.Resolver(configure=False)
dns.resolver.default_resolver.nameservers=['8.8.8.8'] 

load_dotenv()
#dbconn = MongoClient()
dbconn = MongoClient(os.getenv("CONNECTION_STRING"))
print ('Initialized connection to MongoDB..')

#dbconn['app04_DB'].Topics.create_index("$**")
#dbconn['app04_DB'].conversations.create_index("$**")

class rubix_collecton:
    def __init__(self, db,cname):
        self.db = db
        self.cname = cname

    #def __init__(self, db):
    #    self.db = db

    def coll(self, cname):
        self.cname = cname

    #CREATE
    def create(self, data):
        _coll = self.db[self.cname]
        #data['_id'] = str(uuid.uuid4())
        if ('_id' not in data): data["_id"] = str(uuid.uuid4())
        new = _coll.insert_one(data)
        created = _coll.find_one({"_id": new.inserted_id})
        return created

    #LIST 
    def find_list(self,qry):
        _coll = self.db[self.cname]
        items = list(_coll.find(qry))
        return items
        
    #DELETE
    def delete(self,id: str):
        _coll = self.db[self.cname]
        deleted = _coll.delete_one({"_id": id})
        return deleted.deleted_count
        
        if deleted.deleted_count != 1:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"item with ID {id} not found")
        #    response.status_code = status.HTTP_204_NO_CONTENT
        #    return response

        #raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"item with ID {id} not found")
        
    #FIND
    def find_item(self,id: str):
        _coll = self.db[self.cname]
        item = _coll.find_one({"_id": id})

        print ('FINDING ITEM....',id,item)

        if item is not None:
            return item

        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"item with ID {id} not found")

    #UPDATE
    def update(self,id: str,data):
        _coll = self.db[self.cname]
        updated = _coll.update_one({"_id": id}, {"$set": data})

        #if updated.modified_count == 0:
        #    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"item with ID {id} not found")

        if (existing := _coll.find_one({"_id": id})) is not None:
            return existing

        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"item with ID {id} not found")
       

    #UPDATE
    # def update_for(self,id:str,match,data):
        # match = {"_id": id,"track.modid":mod_id,"track.mod.topic_id":top_id}
        # data = {"track.mod.topic.status":"Complete"}
        #
        # _coll = self.db[self.cname]
        # updated = _coll.update_one(match, {"$set": data})
        # updated = _coll.update_one(match, data, array_filters=array_filters)
        #if updated.modified_count == 0:
        #    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"item with ID {id} not found")

        # if (existing := _coll.find_one({"_id": id})) is not None:
            # return existing

        # raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"item with ID {id} not found")

    #PUSH
    #POP

# new function added
    def update_one(self, match, update, array_filters=None):
        _coll = self.db[self.cname]
        updated = _coll.update_one(match, update, array_filters=array_filters)
        return updated
