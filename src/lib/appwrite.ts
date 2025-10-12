import { Client, Databases, Query, type QueryTypesList, ID } from 'appwrite';
import { environmentVariables } from './env';
import type { Movie } from './types';

export const client = new Client();

client
  .setEndpoint(environmentVariables.APPWRITE_ENDPOINT)
  .setProject(environmentVariables.PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (searchTerm: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(environmentVariables.DATABASE_ID, environmentVariables.TABLE_ID, [
      Query.equal("searchTerm", searchTerm)
    ])

    if (result.documents.length > 0) {
      const doc = result.documents[0];

      await database.updateDocument(environmentVariables.DATABASE_ID, environmentVariables.TABLE_ID, doc.$id, {
        count: doc.count + 1,
      })

    } else {
      await database.createDocument(environmentVariables.DATABASE_ID, environmentVariables.TABLE_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      })
    }
  } catch (error) {

  }
}

export const getTrendingMovies = async () => {
  try {
    const result = await database.listDocuments(environmentVariables.DATABASE_ID, environmentVariables.TABLE_ID, [
      Query.limit(5),
      Query.orderDesc("count")
    ])

    return result.documents;
  } catch (error) {
    console.error(error);
  }
}

