import { client } from './db';
import { ObjectId } from 'mongodb';

/**
 * Invites a user by creating a record in the `standard_users` collection.
 * @param {string} userId - The UUID of the invited user.
 * @param {string} campaignId - The ID of the campaign the user is invited to.
 */
export async function inviteUser(userId, campaignId) {
    try {
        const database = client.db('users');
        const users = database.collection('standard_users');

        const existingUser = await users.findOne({ userId });

        if (existingUser) {
            const result = await users.updateOne(
                { userId },
                { $addToSet: { invites: campaignId } }
            );
            return result.modifiedCount > 0;
        } else {
            const result = await users.insertOne({
                userId,
                invites: [campaignId],
                playerCampaigns: []
            });
            return result.insertedId != null;
        }
    } catch (e) {
        console.error('Error inviting user:', e);
        return false;
    }
}

/**
 * Resolves an invite by removing it and adding the campaign to `playerCampaigns`.
 * @param {string} userId - The UUID of the user resolving the invite.
 * @param {string} campaignId - The ID of the campaign being resolved.
 */
export async function acceptInvite(userId, campaignId) {
    try {
        const database = client.db('users');
        const users = database.collection('standard_users');

        const result = await users.updateOne(
            { userId },
            {
                $pull: { invites: campaignId },
                $addToSet: { playerCampaigns: campaignId } 
            }
        );

        return result.modifiedCount > 0;
    } catch (e) {
        console.error('Error resolving invite:', e);
        return false;
    }
}

/**
 * Resolves an invite by removing it and adding the campaign to `playerCampaigns`.
 * @param {string} userId - The UUID of the user resolving the invite.
 * @param {string} campaignId - The ID of the campaign being resolved.
 */
export async function rejectInvite(userId, campaignId) {
    try {
        const database = client.db('users');
        const users = database.collection('standard_users');

        const result = await users.updateOne(
            { userId },
            {
                $pull: { invites: campaignId }
            }
        );

        return result.modifiedCount > 0;
    } catch (e) {
        console.error('Error resolving invite:', e);
        return false;
    }
}