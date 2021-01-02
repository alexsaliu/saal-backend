// Require database connection
const db = require('./db.js').dbConnection;

let link, name, admin, privateGroup, vote, member;

const insertQuery = {
    text: `INSERT INTO group_members(group_link, member_name, admin, privateGroup) VALUES($1, $2, $3, $4) RETURNING *`,
    values: [link, name, admin, privateGroup],
}

const getGroupInfo = async (req, res) => {
    const link = req.params.group;
    const selectQuery = {
        text: `SELECT member_name, availability, vote, admin FROM group_members WHERE group_link = $1 `,
        values: [link],
    }

    try {
        const groupInfo = await db.query(selectQuery);
        console.log(groupInfo);
        res.status(200).send(groupInfo.rows);
    }
    catch (err) {
        console.log(err);
        res.status(404).send({"success": "error"});
    }
}

    const updateQuery = {
        text: `UPDATE group_members SET vote = $1 WHERE group_link = $2 AND member_name = $3 RETURNING vote`,
        values: [vote, link, name],
    }

    const deleteQuery = {
        text: `DELETE FROM group_members WHERE group_link = $1 AND member_name = $2`,
        values: [link, member],
    }

module.exports = {
    getGroupInfo
}
