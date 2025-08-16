import {TOKEN_KEY} from '@env';
import * as SecureStore from 'expo-secure-store';

export const saveAuthToken = async (token) => {
    try{
        const sessionString = JSON.stringify(token);
        await SecureStore.setItemAsync(TOKEN_KEY, sessionString);
        console.log('Token saved securely with Expo SecureStore!');
    }catch(err){
        console.error('Failed to save the token securely', err);
    }
}


export const getAuthToken = async () => {
    try{
        const sessionString = await SecureStore.getItemAsync(TOKEN_KEY);
        if (sessionString) {
          return JSON.parse(sessionString);
        }
         return null;
    }catch(err){
        console.error('Failed to get the token securely', err);
    }
}

export const deleteAuthToken = async () => {
    try{
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        console.log('Token deleted securely with Expo SecureStore!');
    }catch(err){
        console.error('Failed to delete the token securely', err);
    }
}

