import { createClient } from '@supabase/supabase-js';
import { client } from './db';
import { ObjectId } from 'mongodb';
import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { PRIVATE_SUPABASE_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';

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


        // campaign object: remove from invite, add to users.
        const campaigns = client.db('campaign').collection('campaign_data');
        const invitedCampaign = await campaigns.updateOne({ _id: new ObjectId(campaignId)}, { $pull: { invites: userId }, $addToSet: {users: userId} });
        if (invitedCampaign.modifiedCount === 0) {
            console.error('Failed to update campaign record.');
            return false;
        }

        return true;
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

        const campaigns = client.db('campaign').collection('campaign_data');
        const invitedCampaign = await campaigns.updateOne({ _id: new ObjectId(campaignId)}, { $pull: { invites: userId } });
        if (invitedCampaign.modifiedCount === 0) {
            console.error('Failed to update campaign record.');
            return false;
        }

        return result.modifiedCount > 0;
    } catch (e) {
        console.error('Error resolving invite:', e);
        return false;
    }
}

export async function getAllInvitesByUserID(userId) {
    try {
        const database = client.db('users');
        const users = database.collection('standard_users');
        const result = await users.findOne({userId});
        return {...result, _id: result?._id.toString()}
    }catch (e) {
        console.error('Error resolving invite:', e);
        return false;
    }
}