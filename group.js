const express = require("express");
const router = express.Router();
router.use(express.json());

const group = [{
    id: 1,
    groupID: "scary_movie",
},
{
    id: 2,
    groupID: "comedy",
},
{
    id: 3,
    groupID: "action",
}];

router.get("/", (req, res) => {
    res.json(group);
});
router.get("/:id", (req, res) => {
    const results = group.filter(group => group.id == req.params.id);
    res.json(results);
});
router.post("/group", (req, res) => {
    const {id, groupID} = req.body;
    group.push({id, groupID});
    res.json({success: true, message: "added successfully"});
});
router.put("/group", (req, res) => {
    const { id, new_name } = req.body;
    group[id-1].groupID = new_groupID;
    res.json({success: true, message: "updated"});
});
router.delete("/group", (req, res) => {
    const { id } = req.body;
    group.splice(id-1, id);
    res.json({success: true, message: "deleted"}); 
});

module.exports = router;
