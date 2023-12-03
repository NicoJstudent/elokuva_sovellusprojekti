const express = require("express");
const router = express.Router();
router.use(express.json());


const review = [{
    id: 1,
    title: "node is awesome",
    time_posted: new Date().toISOString()
},
{
    id: 2,
    title: "i love cats",
    time_posted: new Date().toISOString()
},
{
    id: 3,
    name: "learning to program",
    time_posted: new Date().toISOString()
}];

router.get("/", (req, res) => {
    res.json(review);
});

router.get("/:id", (req, res) => {
    const results = review.filter(review => review.id == req.params.id);
    res.json(results);
});
router.post("/", (req, res) => {
    const {id, name, age} = req.body;
    review.push({id, name, age});
    res.json({success: true, message: "added successfully"});
});
router.put("/", (req, res) => {
    const { id, new_name } = req.body;
    review[id-1].name = new_name;
    res.json({success: true, message: "updated"});
});
router.delete("/", (req, res) => {
    const { id } = req.body;
    review.splice(id-1, id);
    res.json({success: true, message: "deleted"});
});
module.exports = router;