import pool from '../../app.js';

export const getUserRole = async (code) => {
    const client = await pool.connect();

    try {
        const query = 'SELECT role FROM users WHERE code = $1';
        const values = [code];

        const result = await client.query(query, values);

        if (result.rows.length > 0) {
            return result.rows[0].role;
        } else {
            return 'Unknown';
        }
    } catch (error) {
        console.error('Error occurred while fetching user role:', error);
        throw error;
    } finally {
        client.release();
    }
};