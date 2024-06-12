import { defineStore } from 'pinia'
import type { Customer, Login, User } from '~/types';

export const useUserStore = defineStore('user', () => {
  const user = ref();
  const token = useCookie('MY_COOKIE', {
    maxAge: 60 * 60,
  });
  const setToken = (data?: string) => (token.value = data);
  const setUser = (data?: any) => (user.value = data);

  const signIn = async (data: Login) => {
    try{
      const res = await $fetch<User>("https://dummyjson.com/user/login", {
        method: 'POST',
        body: data
      });

      setToken(res.token)
      await fetchCustomer()
    } catch (error) {
      setToken();
      setUser();
      console.log(error);
    }
  };

  const fetchCustomer = async () => {
    if(token.value){
      try {
        const res = await $fetch<Customer>("http://dummyjson.com/users/1");
        setUser(res)
      } catch (error) {
        setUser()
        console.log(error);
      }
    }
  };

  const logout = () => {
    setToken()
    setUser()
  };

  return {user, token, logout, signIn, fetchCustomer, setUser, setToken}
})
