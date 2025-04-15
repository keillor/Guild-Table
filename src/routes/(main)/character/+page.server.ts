import { client } from '$lib/api/db.js';
import {
	deleteCharacterVerify,
	getAllUserCharacters,
	getSingleCharacterVerified
} from '$lib/api/mongoapi_server.js';
import { error } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

const validateWithRegex = (value: string) => {
	const regex = new RegExp(/^[a-fA-F0-9]{24}$/);

	if (value !== '' && typeof value === 'string') {
		const result = value.match(regex);
		return result !== null && result !== undefined && result.length > 0;
	}
	return false;
};

export const load = async ({ locals: { session } }) => {
	const userId = session!?.user.id;
	const result = await getAllUserCharacters(userId);
	return { characters: result };
};

export const actions = {
	delete: async ({ request, locals: { session } }) => {
		const formData = await request.formData();
		const characterId = formData.get('id');
		const deletedCount = await deleteCharacterVerify(session, characterId);
		if (deletedCount) {
			console.log('deleted', characterId);
			return true;
		} else {
			console.log('delete failed', characterId);
			return error(500, 'Whoops! Looks like something went wrong.');
		}
	},
	uploadAvatar: async ({ request, locals: { session, supabase } }) => {
		const maxAvatarSize = 5000000;
		const formData = await request.formData();
		const characterId = formData.get('characterId');
		const avatar = formData.get('avatar');
		console.log(formData);
		const character = await getSingleCharacterVerified(session, characterId);
		if (!character) {
			return error(403, 'Authorization error.');
		}
		if (avatar == null || !avatar || !(avatar instanceof File)) {
			return error(400, 'Image is required');
		}
		if (avatar.size > maxAvatarSize) {
			return error(400, 'Your image is too big. It must be 5 MB or less.');
		}
		const { data, error } = await supabase.storage
			.from('character-avatars')
			.upload(`${characterId}`, avatar, { upsert: true, cacheControl: '0' });
		if (error) {
			console.error('Upload error:', error);
			throw error(500, 'Failed to upload avatar.');
		}

		const database = client.db('character');
		const characters = database.collection('standard_characters');

		const updateResult = await characters.updateOne(
			{ _id: new ObjectId(characterId) },
			{ $set: { avatar: true } } // Set the avatar attribute to true
		);

		if (updateResult.modifiedCount === 0) {
			console.log(updateResult)
			console.error('Failed to update character avatar attribute.');
			throw error(500, 'Failed to update character avatar attribute.');
		}

		character._id = character._id.toString();
		character.avatar = data.fullPath;
		return { success: true, character};
	}
};
