import express from "express";
import {db, connectToDb} from './db.js'

// let articlesInfo = [
//     {
//         name: "learn-react",
//         upvotes: 0,
//         comments: [],
//     },
//     {
//         name: "learn-node",
//         upvotes: 0,
//         comments: [],
//     },
//     {
//         name: "mongodb",
//         upvotes: 0,
//         comments: [],
//     },
// ];

const app = express();
app.use(express.json());

//display
app.get("/api/articles/:name", async (req, res) => {
    const { name } = req.params;

    const article = await db.collection("articles").findOne({ name });
    if (article) {
        res.json(article);
    } else {
        res.sendStatus(404);
    }
});

//upvote
app.put("/api/articles/:name/upvote", async (req, res) => {
    const { name } = req.params;

    await db.collection("articles").updateOne(
        { name },
        {
            $inc: { upvotes: 1 },
        }
    );
    const article = await db.collection("articles").findOne({ name });

    if (article) {
        res.json(article);
    } else {
        res.send("That article doesn't exist");
    }
});

//downwote
app.put("/api/articles/:name/downvote", async (req,res)=> {
    const {name} = req.params;

    await db.collection("articles").updateOne(
        { name },
        {
            $inc: { upvotes: -1 },
        }
    );
    const article = await db.collection("articles").findOne({ name });

    if (article) {
        res.json(article);
    } else {
        res.send("That article doesn't exist");
    }
})

//comment
app.post("/api/articles/:name/comments", async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;

    await db.collection("articles").updateOne(
        { name },
        {
            $push: { comments: { postedBy, text } },
        }
    );
    const article = await db.collection("articles").findOne({ name });

    if (article) {
        res.send(article.comments);
    } else {
        res.send("that article doesn't exist");
    }
});

connectToDb(()=> {
    console.log("connected to db")
    app.listen(8000, () => {
        console.log("server is listening on port 8000");
    });
})
