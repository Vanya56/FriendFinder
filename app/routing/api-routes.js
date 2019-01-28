var friends = require("../data/friends.js");

module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(friends);
    });
    app.post("/api/friends", function(req, res) {
        var bestMatch = {
            name: "",
            photo: "",
            friendDifference: 1000
        };

        console.log(req.body);

        // Take the results or the survey and POST & parse it
        var userData = req.body;
        var userScores = userData.scores;

        console.log(userScores);

        // This variable will calculate the difference between the user's scores
        var totalDifference = 0;
        // Loop through all the friend possibilities in the database
        for (var i = 0; i < friends.length; i++) {
            console.log(friends[i]);
            totalDifference = 0;

            // loop through all the scores of each friend
            for (var j = 0; j < friends[i].scores[j]; j++) {
                // calculate the difference between the scores and sum them into the totalDifference
                totalDifference += Math.abs(parseInt(userScores[j]) - parseInt(friends[i].scores[j]));
                // if the sum of the diffrence is less than the difference of the current best match.
                if (totalDifference <= bestMatch.friendDifference) {
                    // Reset the best match to be the new friend.
                    bestMatch.name = friends[i].name;
                    bestMatch.photo = friends[i].photo;
                    bestMatch.friendDifference = totalDifference;
                }
            }
        }
        // Saves the user's data to the database after the check happens otherwise
        // it will always return the user as the user's best friend.
        friends.push(userData);
        res.json(bestMatch);
    });
}