import CouchDB from "./database/nano.js"

const app = async () => {
    console.time("couchdb-connection");
    const dblist = await CouchDB.db.list()
    if (dblist.includes('cars')) {
        await CouchDB.db.destroy('cars')
    }
    await CouchDB.db.create('cars')
    const cars = CouchDB.use('cars')
    console.timeEnd("couchdb-connection");
    console.time("cars-list");
    const carsList = Array()
    for (let i = 0; i < 100000; i = i + 1) {
        carsList.push({
            "name": "BMW", "type": "Sedan",
            "deleted_at": null,
            "created_at": Date.now(),
            "updated_at": null
        })
    }
    console.timeEnd("cars-list");
    console.time("couchdb-create-bulk-cars");
    console.log('cars: ', carsList.length)
    const response = await cars.bulk({ docs: carsList })
    console.timeEnd("couchdb-create-bulk-cars");
    return response
}

app()