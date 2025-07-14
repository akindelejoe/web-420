db.students.find().pretty()

db.students.insertOne({
  firstName: "Joe",
  lastName: "Akindele",
  studentId: "jA99",
  houseId: "h1009"
})

db.students.find({ lastName: "Akindele" }).pretty()

db.students.updateOne(
  { lastName: "Akindele" },
  { $set: { houseId: "h1007" } }
)

db.students.find({ lastName: "Akindele" }).pretty()

db.students.deleteOne({ lastName: "Akindele" })

db.students.find({ lastName: "Akindele" }).pretty()

db.students.aggregate([
  {
    $group: {
      _id: "$houseId",
      students: {
        $push: {
          firstName: "$firstName",
          lastName: "$lastName"
        }
      }
    }
  }
])

db.students.find({ houseId: "h1007" }).pretty()

db.students.aggregate([
  {
    $lookup: {
      from: "houses",
      localField: "houseId",
      foreignField: "houseId",
      as: "houseInfo"
    }
  },
  { $unwind: "$houseInfo" },
  { $match: { "houseInfo.mascot": "Eagle" } }
])
