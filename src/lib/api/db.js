import { MONGO_URL } from '$env/static/private';
import { MongoClient } from 'mongodb';
export const client = new MongoClient(MONGO_URL);