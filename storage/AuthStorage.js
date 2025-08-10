import {TOKEN_KEY} from '@env';
import * as SecureStore from 'expo-secure-store';

export const saveAuthToken = async (token) => {
    try{
        console.log("TOken",token);
        console.log("Storage", TOKEN_KEY);
        await SecureStore.setItemAsync(TOKEN_KEY, token);
        console.log('Token saved securely with Expo SecureStore!');
    }catch(err){
        console.error('Failed to save the token securely', err);
    }
}


export const getAuthToken = async () => {
    try{
        return await SecureStore.getItemAsync(TOKEN_KEY);
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