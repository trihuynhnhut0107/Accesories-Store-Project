import { defineStore } from "pinia";

export const useUserStore = defineStore("user", function () {
  const user = ref();
  const token = useCookie("my_token", {
    maxAge: 60 * 30,
  });

  const setToken = (data?: number) => (token.value = data);

  const setUser = (data?: any) => (user.value = data);

  const signIn = async (data: any) => {
    try {
      const response = await $fetch("http://localhost:3001/stafflogin", {
        method: "POST",
        body: JSON.stringify(data),
      });
      setToken(response.id);
      await fetchStaff();
    } catch (error) {
      setToken();
      setUser();
      console.log(error);
    }
  };
  const signUp = async (data: any) => {
    try {
      const response = await $fetch("http://localhost:3001/staffsignup", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.access == false) {
        alert("Tài khoản đã tồn tại!");
        return false;
      }
      setToken(response.id.MaNhanVien);
      await fetchStaff();
    } catch (error) {
      setToken();
      setUser();
      console.log(error);
    }
  };
  const fetchStaff = async () => {
    if (token.value) {
      try {
        const response = await $fetch(
          `http://localhost:3001/user/${token.value}`
        );
        setUser(response);
      } catch (error) {}
    }
  };
  const logOut = () => {
    setToken();
    setUser();
  };

  return {
    user,
    token,
    logOut,
    signIn,
    signUp,
    fetchStaff,
    setToken,
    setUser,
  };
});
