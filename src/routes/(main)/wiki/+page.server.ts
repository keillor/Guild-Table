import { CreateNewWiki, CreateNewWikiVerified, DeleteWikiVerified, GetWikiTitlesByUser } from '$lib/api/wiki_server';
import type { Wiki } from '$lib/models/wikipage.js';
import { error, fail, redirect } from '@sveltejs/kit';
import { ObjectId } from 'mongodb';

export const load = async ({locals: {session}, params}) => {
    const wikiPages = await GetWikiTitlesByUser(session);
    if(wikiPages) {
        return {wikiPages};
    }
    redirect(302, "/character");
}

export const actions = {
    delete: async ({request, locals: {session}}) => {
        const formData = await request.formData();
        const objectId = formData.get('objectId');
        console.log(objectId);
        if(objectId) {
            const result = await DeleteWikiVerified(session, objectId);
            console.log('result', result);
            if(result) {
                return result;
            }
        }
        return error(400, "bad request");
    },
    new: async ({request, locals: {session}}) => {
        //create a new wiki
        const formData = await request.formData();
        const wikiName = formData.get('wikiname'); 
        if(wikiName.length == 0) {
            return error(500, "Error! Wiki name must not be empty.");
        }
        let wikiInstance : Wiki = {
            campaign: '',
            owner: session?.user.id,
            text: '# Click here and start typing. \n Don\'t forget to click save when you are done! > Note: This editor supports markdown.',
            title: wikiName,
            users: []
        }
        const result = await CreateNewWikiVerified(session, wikiInstance);
        if(result) {
            return result;
        } else {
            return error(500, "Error! Wiki name must not be empty.");
        }
    }
}
