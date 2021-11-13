const { client } = require ("../client");

const createReview = async ({title, content, stars, productId, userId}) => {
    try {
        const { rows: [review] } = await client.query(`
            INSERT INTO reviews(title, content, stars, "productId", "userId")
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;
        `, [title, content, stars, productId, userId]);
        return review;        
    } catch (error) {
        console.error(error);
    };
};

const updateReview = async ({id, title, content, stars, productId, userId}) => {
    try {
        const { rows: [review] } = await client.query (`
            UPDATE reviews
            SET title = $1, content = $2, stars = $3, "productId" = $4, "userId" = $5
            WHERE id = $6
            RETURNING *;
        `,[title, content, stars, productId, userId, id]);
        return review;
    } catch (error) {
        console.error (error);
    };
};

const destroyReview = async (id) => {
    try {
        const {rows: [review] } = await client.query(`
            DELETE FROM reviews
            WHERE id=$1
            RETURNING *;
        `, [id]);
        return review;
    } catch (error) {
        throw error;
    }
  }

const getReviewById = async (id) => {
    try {
        const {rows: [review] } = await client.query(`
            SELECT *
            FROM reviews
            WHERE id=$1
            RETURNING *;
        `, [id]);
        return review;
    } catch (error) {
        throw error;
    }
  }

const getReviewsByProduct = async (id) => {
    try {
        const { rows: [review] } = await client.query(`
            SELECT *
            FROM reviews
            WHERE "productId"=$1
            RETURNING *;
        `, [id]);
        return review;
    } catch (error) {
        throw error;
    }
  }

const getAllReviews = async () => {
    try {
        const {rows: [reviews] } = await client.query(`
            SELECT *
            FROM reviews
            RETURNING *;
        `);
        return reviews;
    } catch (error) {
        throw error;
    }
  }

module.exports = {
    createReview,
    updateReview,
    destroyReview,
    getReviewById,
    getReviewsByProduct,
    getAllReviews
};